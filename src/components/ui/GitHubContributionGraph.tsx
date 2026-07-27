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

/** Format as YYYY-MM-DD in local time (avoid UTC shift from toISOString). */
function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

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
    const dateStr = toLocalDateString(currentDate);
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
        date: toLocalDateString(currentDate),
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
      date: toLocalDateString(new Date(d)),
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

function getTooltipText(count: number, dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const countStr = count === 0 ? 'No' : count.toString();
  const contribWord = count === 1 ? 'contribution' : 'contributions';
  return `${countStr} ${contribWord} on ${weekday}, ${monthName} ${day}, ${year}`;
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
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Calendar Area */}
      <div className="flex-1 min-w-0">
        <div className="overflow-x-auto hide-scrollbar pb-2">
          <div className="inline-block min-w-max pb-1">
            {/* Month labels row — positioned like GitHub */}
            <div
              className="relative mb-2 h-4 text-[10px] text-muted-foreground/80 font-mono select-none"
              style={{ width: 30 + data.weeks.length * WEEK_WIDTH }}
            >
              {monthLabels.map(({ month, weekIndex }) => (
                <span
                  key={month}
                  className="absolute top-0"
                  style={{ left: 30 + weekIndex * WEEK_WIDTH }}
                >
                  {month}
                </span>
              ))}
            </div>

            <div className="flex">
              {/* Day labels — Mon, Wed, Fri mathematically aligned */}
              <div
                className="flex flex-col text-[10px] text-muted-foreground/80 pr-2 select-none justify-between py-[1px] w-[30px] shrink-0 font-mono"
                style={{
                  height: 7 * (SQUARE_SIZE + SQUARE_GAP) - SQUARE_GAP,
                }}
              >
                <span className="h-[10px] leading-[10px]" />
                <span className="h-[10px] leading-[10px] flex items-center">Mon</span>
                <span />
                <span className="h-[10px] leading-[10px] flex items-center">Wed</span>
                <span />
                <span className="h-[10px] leading-[10px] flex items-center">Fri</span>
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
                      const isHovered = hovered?.day.date === day.date;
                      return (
                        <div
                          key={`${wi}-${di}`}
                          className="rounded-[2px] cursor-pointer transition-all duration-100"
                          style={{
                            width: SQUARE_SIZE,
                            height: SQUARE_SIZE,
                            backgroundColor: `var(--contrib-${level})`,
                            outline: isHovered
                              ? '1.5px solid hsl(var(--foreground))'
                              : '1px solid var(--cell-outline)',
                            outlineOffset: isHovered ? '1px' : '-1px',
                            zIndex: isHovered ? 10 : 1,
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
                          aria-label={`${day.date}: ${day.count} contributions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Learn more link + Legend */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground/80 font-mono select-none">
          <a
            href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-graphs-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary hover:underline transition-colors"
          >
            Learn how we count contributions
          </a>
          
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="flex gap-[2px]">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="rounded-[2px]"
                  style={{
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                    backgroundColor: `var(--contrib-${level})`,
                    outline: '1px solid var(--cell-outline)',
                    outlineOffset: '-1px',
                  }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Year Sidebar/Selector */}
      <div className="flex md:flex-col gap-1 shrink-0 md:border-l border-slate-200 dark:border-border/60 md:pl-6 max-h-[200px] overflow-y-auto hide-scrollbar">
        {years.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setSelectedYear(y)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all text-left whitespace-nowrap ${
              selectedYear === y
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-foreground'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Tooltip — exactly replicating github.com */}
      {hovered && tooltipPos && (
        <div
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 8,
          }}
        >
          <div className="relative rounded bg-slate-950 px-2.5 py-1.5 text-[11px] text-white shadow-lg whitespace-nowrap font-medium border border-slate-800/80">
            {getTooltipText(hovered.day.count, hovered.day.date)}
            {/* Caret pointing down */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-950" />
          </div>
        </div>
      )}
    </div>
  );
});
