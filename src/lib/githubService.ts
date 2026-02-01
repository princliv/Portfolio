interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
  commit_count?: number;
}

interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  followers: number;
  following: number;
  contributions: number;
  currentStreak: number;
  longestStreak: number;
}

// Type exports for components
export type Repository = GitHubRepo;
export type LanguageData = { name: string; count: number; color: string };
export type { GitHubStats, GitHubUser, GitHubRepo, GitHubContributionDay };

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const USERNAME = 'princliv';

if (!GITHUB_TOKEN) {
  console.warn('GitHub token not found in environment variables');
}

const headers = {
  'Authorization': `token ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
};

class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

const handleGitHubResponse = async (response: Response) => {
  if (response.status === 403) {
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');
    const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown';
    throw new RateLimitError(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
  }
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const githubService = {
  async getUser(): Promise<GitHubUser> {
    try {
      const response = await fetch(`https://api.github.com/users/${USERNAME}`, { headers });
      return await handleGitHubResponse(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  async getRepos(): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
        { headers }
      );
      const repos = await handleGitHubResponse(response);
      const filteredRepos = repos.filter((repo: GitHubRepo) => !repo.fork);
      
      // Fetch commit count for each repository
      const reposWithCommits = await Promise.all(
        filteredRepos.map(async (repo: GitHubRepo) => {
          try {
            const commitResponse = await fetch(
              `https://api.github.com/repos/${USERNAME}/${repo.name}/commits?per_page=1`,
              { headers }
            );
            
            if (commitResponse.ok) {
              const commits = await handleGitHubResponse(commitResponse);
              // Get the total commit count from the Link header or use the length as fallback
              const linkHeader = commitResponse.headers.get('Link');
              let commitCount = commits.length;
              
              if (linkHeader) {
                const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                if (match) {
                  commitCount = parseInt(match[1]);
                }
              }
              
              return { ...repo, commit_count: commitCount };
            }
            
            return { ...repo, commit_count: 0 };
          } catch (error) {
            console.warn(`Failed to fetch commits for ${repo.name}:`, error);
            return { ...repo, commit_count: 0 };
          }
        })
      );
      
      return reposWithCommits;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  },

  async getContributionData(year: number = new Date().getFullYear()): Promise<{ totalContributions: number; contributions: GitHubContributionDay[] }> {
    try {
      // GitHub GraphQL API for contribution data
      const query = `
        query {
          user(login: "${USERNAME}") {
            contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await handleGitHubResponse(response);
      const calendar = data.data.user.contributionsCollection.contributionCalendar;
      
      const contributions: GitHubContributionDay[] = [];
      calendar.weeks.forEach((week: any) => {
        contributions.push(...week.contributionDays);
      });

      return {
        totalContributions: calendar.totalContributions,
        contributions
      };
    } catch (error) {
      console.error('Error fetching contribution data:', error);
      throw error;
    }
  },

  async getTotalContributions(): Promise<number> {
    try {
      // Fetch contribution data for the last several years to get total contributions
      const currentYear = new Date().getFullYear();
      const years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
      
      let totalContributions = 0;
      
      for (const year of years) {
        try {
          const data = await this.getContributionData(year);
          totalContributions += data.totalContributions;
        } catch (error) {
          console.warn(`Failed to fetch contributions for year ${year}:`, error);
          // Continue with other years if one fails
        }
      }
      
      return totalContributions;
    } catch (error) {
      console.error('Error fetching total contributions:', error);
      throw error;
    }
  },

  async getStats(): Promise<GitHubStats> {
    try {
      const [user, repos, totalContributions] = await Promise.all([
        this.getUser(),
        this.getRepos(),
        this.getTotalContributions()
      ]);

      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

      // Get current year contributions for streak calculation
      const currentYearData = await this.getContributionData();
      const { contributions } = currentYearData;

      // Calculate streak from contribution data
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Calculate current streak (consecutive days with contributions ending today or yesterday)
      for (let i = contributions.length - 1; i >= 0; i--) {
        const contributionDate = new Date(contributions[i].date);
        contributionDate.setHours(0, 0, 0, 0);
        
        if (contributions[i].contributionCount > 0) {
          if (currentStreak === 0) {
            const daysDiff = Math.floor((today.getTime() - contributionDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff <= 1) { // Either today or yesterday
              currentStreak = 1;
            } else {
              break; // Gap found, end current streak
            }
          } else {
            currentStreak++;
          }
        } else if (currentStreak > 0) {
          break; // Break streak
        }
      }

      // Calculate longest streak
      contributions.forEach((day) => {
        if (day.contributionCount > 0) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      });

      return {
        totalStars,
        totalForks,
        totalRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        contributions: totalContributions,
        currentStreak,
        longestStreak,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  getTopRepos(repos: GitHubRepo[], limit: number = 6): GitHubRepo[] {
    return repos
      .sort((a, b) => (b.commit_count || 0) - (a.commit_count || 0))
      .slice(0, limit)
      .map(repo => ({
        ...repo,
        description: repo.description || 'No description available'
      }));
  },

  getLanguageStats(repos: GitHubRepo[]): { name: string; count: number; color: string }[] {
    const languageCount: { [key: string]: number } = {};
    
    repos.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    const languageColors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'React': '#61dafb',
      'CSS': '#563d7c',
      'HTML': '#e34c26',
      'Java': '#b07219',
      'C++': '#f34b7d',
      'C': '#555555',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'Vue': '#41b883',
      'Angular': '#dd0031',
      'Swift': '#ffac45',
      'Kotlin': '#f18e33',
    };

    return Object.entries(languageCount)
      .map(([name, count]) => ({
        name,
        count,
        color: languageColors[name] || '#586069'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
};
