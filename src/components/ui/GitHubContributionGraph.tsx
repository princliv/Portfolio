import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { githubService } from '@/lib/githubService';

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 for contribution intensity
}

interface ContributionData {
  year: number;
  totalContributions: number;
  weeks: ContributionDay[][];
}

const processContributionData = (contributions: any[], year: number): ContributionData => {
  const weeks: ContributionDay[][] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  let totalContributions = 0;
  
  // Start from the first Sunday of the year or Jan 1st
  let currentDate = new Date(startDate);
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  let currentWeek: ContributionDay[] = [];
  
  while (currentDate <= endDate) {
    const contributionData = contributions.find(c => c.date === currentDate.toISOString().split('T')[0]);
    const contributionCount = contributionData?.contributionCount || 0;
    const level = contributionCount === 0 ? 0 : Math.min(4, Math.ceil(contributionCount / 2));
    
    currentWeek.push({
      date: currentDate.toISOString().split('T')[0],
      count: contributionCount,
      level
    });
    
    totalContributions += contributionCount;
    
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Add the last week if it has days
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: currentDate.toISOString().split('T')[0],
        count: 0,
        level: 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(currentWeek);
  }
  
  return { year, totalContributions, weeks };
};

const generateMockContributionData = (year: number): ContributionData => {
  const weeks: ContributionDay[][] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  let totalContributions = 0;
  
  // Start from the first Sunday of the year or Jan 1st
  let currentDate = new Date(startDate);
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  let currentWeek: ContributionDay[] = [];
  
  while (currentDate <= endDate) {
    const contributionCount = Math.floor(Math.random() * 10);
    const level = contributionCount === 0 ? 0 : Math.min(4, Math.ceil(contributionCount / 2));
    
    currentWeek.push({
      date: currentDate.toISOString().split('T')[0],
      count: contributionCount,
      level
    });
    
    totalContributions += contributionCount;
    
    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Add the last week if it has days
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({
        date: currentDate.toISOString().split('T')[0],
        count: 0,
        level: 0
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(currentWeek);
  }
  
  return { year, totalContributions, weeks };
};

const ContributionTooltip = ({ day, visible }: { day: ContributionDay; visible: boolean }) => {
  if (!visible || day.count === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute z-50 px-3 py-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
      style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-8px)' }}
    >
      <div className="font-semibold">{day.count} contributions</div>
      <div className="text-gray-300">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
    </motion.div>
  );
};

export const GitHubContributionGraph = memo(function GitHubContributionGraph() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [contributionData, setContributionData] = useState<ContributionData | null>(null);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  useEffect(() => {
    const fetchContributionData = async () => {
      try {
        const data = await githubService.getContributionData(selectedYear);
        const processedData = processContributionData(data.contributions, selectedYear);
        setContributionData({
          year: selectedYear,
          totalContributions: data.totalContributions,
          weeks: processedData.weeks
        });
      } catch (error) {
        console.error('Error fetching contribution data:', error);
        // Fallback to mock data if API fails
        const mockData = generateMockContributionData(selectedYear);
        setContributionData(mockData);
      }
    };

    fetchContributionData();
  }, [selectedYear]);

  if (!contributionData) {
    return (
      <div className="glass p-6 rounded-xl">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-52 gap-1">
            {Array.from({ length: 364 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-sm"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getContributionColor = (level: number) => {
    const colors = [
      'bg-gray-100 dark:bg-gray-800', // level 0 - no contributions
      'bg-green-100 dark:bg-green-900', // level 1
      'bg-green-300 dark:bg-green-700', // level 2
      'bg-green-500 dark:bg-green-500', // level 3
      'bg-green-700 dark:bg-green-300', // level 4 - most contributions
    ];
    return colors[level] || colors[0];
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Contribution Activity</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {contributionData.totalContributions} contributions in {selectedYear}
        </div>
      </div>

      {/* Year Selector */}
      <div className="flex gap-2 mb-6">
        {years.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedYear(year)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              selectedYear === year
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
            }`}
          >
            {year}
          </motion.button>
        ))}
      </div>

      {/* Contribution Graph */}
      <div className="relative">
        {/* Month labels */}
        <div className="flex gap-1 mb-2 ml-8">
          {months.map((month, index) => (
            <div key={month} className="text-xs text-muted-foreground" style={{ width: '4.5rem' }}>
              {month}
            </div>
          ))}
        </div>

        {/* Weekday labels and contribution grid */}
        <div className="flex gap-1">
          {/* Weekday labels */}
          <div className="flex flex-col gap-1 mr-2">
            {weekdays.map((day, index) => (
              <div key={day} className="text-xs text-muted-foreground h-3 flex items-center justify-end pr-1">
                {index % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-1 overflow-x-auto">
            {contributionData.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 ${getContributionColor(day.level)}`}
                    onMouseEnter={(e) => {
                      setHoveredDay(day);
                      const rect = e.currentTarget.getBoundingClientRect();
                      setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <ContributionTooltip day={hoveredDay} visible={true} />
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
        <div className="text-xs text-muted-foreground">
          Powered by GitHub
        </div>
      </div>
    </div>
  );
});
