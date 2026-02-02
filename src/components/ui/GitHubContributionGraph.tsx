import { memo, useState, useEffect, useMemo } from 'react';
import { githubService } from '@/lib/githubService';

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionData {
  year: number;
  totalContributions: number;
  weeks: ContributionDay[][];
  startDate: Date; // first Sunday used for the grid
}

const SQUARE_SIZE = 10;
const SQUARE_GAP = 2;
const WEEK_WIDTH = SQUARE_SIZE + SQUARE_GAP;

/** Contribution colors use CSS variables --contrib-0 to --contrib-4 (light/dark in index.css) */

function processContributionData(contributions: { date: string; contributionCount: number }[], year: number): ContributionData {
  const weeks: ContributionDay[][] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  let totalContributions = 0;

  let currentDate = new Date(startDate);
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  const gridStartDate = new Date(currentDate);
  let currentWeek: ContributionDay[] = [];

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const c = contributions.find((x) => x.date === dateStr);
    const count = c?.contributionCount ?? 0;
    totalContributions += count;
    currentWeek.push({ date: dateStr, count });
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: currentDate.toISOString().split('T')[0],
        count: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(currentWeek);
  }

  return { year, totalContributions, weeks, startDate: gridStartDate };
}

function generateMockContributionData(year: number): ContributionData {
  const contributions: { date: string; contributionCount: number }[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    contributions.push({
      date: d.toISOString().split('T')[0],
      contributionCount: Math.floor(Math.random() * 15),
    });
  }
  return processContributionData(contributions, year);
}

/** Compute contribution level 0–4 from count, relative to max (GitHub-style) */
function getLevel(count: number, maxCount: number): number {
  if (count <= 0) return 0;
  if (maxCount <= 0) return 0;
  if (maxCount === 1) return 1;
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

/** Month label position: first week index where that month appears */
function getMonthLabelPositions(year: number, startDate: Date): { month: string; weekIndex: number }[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const result: { month: string; weekIndex: number }[] = [];
  const startMs = startDate.getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  for (let m = 0; m < 12; m++) {
    const firstDay = new Date(year, m, 1);
    const daysFromStart = (firstDay.getTime() - startMs) / (24 * 60 * 60 * 1000);
    const weekIndex = Math.max(0, Math.floor(daysFromStart / 7));
    result.push({ month: months[m], weekIndex });
  }
  return result;
}

function formatTooltipDate(dateStr: string): string {
  const d = new Date(dateStr + 'Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function contributionText(count: number): string {
  if (count === 0) return 'No contributions';
  if (count === 1) return '1 contribution';
  return `${count} contributions`;
}

export const GitHubContributionGraph = memo(function GitHubContributionGraph() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState<ContributionData | null>(null);
  const [hovered, setHovered] = useState<{ day: ContributionDay; level: number; rect: DOMRect } | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const api = await githubService.getContributionData(selectedYear);
        const processed = processContributionData(api.contributions, selectedYear);
        if (!cancelled) setData(processed);
      } catch {
        if (!cancelled) setData(generateMockContributionData(selectedYear));
      }
    })();
    return () => { cancelled = true; };
  }, [selectedYear]);

  const { maxCount, monthLabels } = useMemo(() => {
    if (!data) return { maxCount: 0, monthLabels: [] as { month: string; weekIndex: number }[] };
    let max = 0;
    for (const week of data.weeks) {
      for (const day of week) {
        if (day.count > max) max = day.count;
      }
    }
    const monthLabels = getMonthLabelPositions(data.year, data.startDate);
    return { maxCount: max, monthLabels };
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Year selector — GitHub style: minimal */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setSelectedYear(y)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                selectedYear === y
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Graph: GitHub layout — months on top, days on left, grid of squares */}
      <div className="inline-block">
        {/* Month labels row — positioned like GitHub */}
        <div
          className="relative mb-1 h-4 text-xs text-muted-foreground"
          style={{ width: 28 + data.weeks.length * WEEK_WIDTH }}
        >
          {monthLabels.map(({ month, weekIndex }) => (
            <span
              key={month}
              className="absolute top-0"
              style={{ left: 28 + weekIndex * WEEK_WIDTH }}
            >
              {month}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Day labels — Mon, Wed, Fri only like GitHub; 7 rows aligned with squares */}
          <div
            className="grid pr-1 text-xs text-muted-foreground"
            style={{
              width: 26,
              gridTemplateRows: 'repeat(7, 1fr)',
              height: 7 * (SQUARE_SIZE + SQUARE_GAP) - SQUARE_GAP,
            }}
          >
            <span />
            <span className="flex items-center">Mon</span>
            <span />
            <span className="flex items-center">Wed</span>
            <span />
            <span className="flex items-center">Fri</span>
            <span />
          </div>

          {/* Squares grid — each column is a week (7 rows: Sun–Sat) */}
          <div className="flex" style={{ gap: SQUARE_GAP }}>
            {data.weeks.map((week, wi) => (
              <div
                key={wi}
                className="flex flex-col"
                style={{ gap: SQUARE_GAP }}
              >
                {week.map((day, di) => {
                  const level = getLevel(day.count, maxCount);
                  return (
                    <div
                      key={`${wi}-${di}`}
                      className="rounded-sm cursor-pointer transition-opacity hover:opacity-90"
                      style={{
                        width: SQUARE_SIZE,
                        height: SQUARE_SIZE,
                        backgroundColor: `var(--contrib-${level})`,
                        outline: hovered?.day.date === day.date ? '2px solid' : undefined,
                        outlineColor: hovered?.day.date === day.date ? 'hsl(var(--foreground))' : undefined,
                        outlineOffset: 1,
                      }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHovered({ day, level, rect });
                        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                      }}
                      onMouseLeave={() => {
                        setHovered(null);
                        setTooltipPos(null);
                      }}
                      role="img"
                      aria-label={`${day.date}: ${contributionText(day.count)}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip — GitHub style: above cell, "X contributions" / "No contributions" + date */}
        {hovered && tooltipPos && (
          <div
            className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 8,
            }}
          >
            <div className="rounded border border-border bg-popover px-3 py-2 text-center shadow-md">
              <p className="text-sm font-semibold text-foreground whitespace-nowrap">
                {contributionText(hovered.day.count)}
              </p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTooltipDate(hovered.day.date)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Legend — GitHub: "Less" [5 squares] "More" */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="text-xs text-muted-foreground">Less</span>
        <div className="flex" style={{ gap: SQUARE_GAP }}>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="rounded-sm"
              style={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                backgroundColor: `var(--contrib-${level})`,
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">More</span>
      </div>
    </div>
  );
});
