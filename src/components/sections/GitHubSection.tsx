import { useState, useEffect } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Zap, Code2, TrendingUp, Users, Activity, Trophy, Flame, Target, Sparkles, GitCommit } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { GitHubContributionGraph } from '@/components/ui/GitHubContributionGraph';
import { githubService, type GitHubStats, type Repository, type LanguageData } from '@/lib/githubService';

export const GitHubSection = function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats>({
    totalStars: 0,
    totalForks: 0,
    totalRepos: 0,
    followers: 0,
    following: 0,
    contributions: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  const [topRepos, setTopRepos] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [githubStats, repos] = await Promise.all([
          githubService.getStats(),
          githubService.getRepos()
        ]);

        const topRepositories = githubService.getTopRepos(repos, 6);
        const languageStats = githubService.getLanguageStats(repos);

        setStats(githubStats);
        setTopRepos(topRepositories);
        setLanguages(languageStats);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        if (error instanceof Error && error.message.includes('rate limit')) {
          setError('GitHub API rate limit exceeded. Please try again later.');
        } else {
          setError('Failed to load GitHub data. Using mock data instead.');
          const mockStats: GitHubStats = {
            totalStars: 127,
            totalForks: 89,
            totalRepos: 45,
            followers: 234,
            following: 67,
            contributions: 1250,
            currentStreak: 15,
            longestStreak: 45,
          };

          const mockRepos: Repository[] = [
            {
              id: 1,
              name: "portfolio-website",
              description: "A modern, responsive portfolio website built with React and TypeScript",
              stargazers_count: 42,
              forks_count: 12,
              language: "TypeScript",
              html_url: "https://github.com/princliv/portfolio-website",
              updated_at: "2024-01-15",
              topics: [],
              fork: false
            },
            {
              id: 2,
              name: "ai-chatbot",
              description: "An intelligent chatbot powered by machine learning algorithms",
              stargazers_count: 38,
              forks_count: 8,
              language: "Python",
              html_url: "https://github.com/princliv/ai-chatbot",
              updated_at: "2024-01-10",
              topics: [],
              fork: false
            },
            {
              id: 3,
              name: "react-components",
              description: "A collection of reusable React components with modern design",
              stargazers_count: 25,
              forks_count: 6,
              language: "JavaScript",
              html_url: "https://github.com/princliv/react-components",
              updated_at: "2024-01-08",
              topics: [],
              fork: false
            }
          ];

          const mockLanguages: LanguageData[] = [
            { name: "TypeScript", count: 45, color: "#3178c6" },
            { name: "JavaScript", count: 30, color: "#f1e05a" },
            { name: "Python", count: 20, color: "#3572A5" },
            { name: "React", count: 15, color: "#61dafb" },
            { name: "CSS", count: 10, color: "#563d7c" },
          ];

          setStats(mockStats);
          setTopRepos(mockRepos);
          setLanguages(mockLanguages);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color = "primary", delay = 0 }: any) => (
    <div 
      className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ backgroundImage: `linear-gradient(135deg, ${color === 'primary' ? '#3b82f6' : color === 'secondary' ? '#8b5cf6' : '#10b981'}20 0%, transparent 100%)` }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color === 'primary' ? 'from-blue-500 to-blue-600' : color === 'secondary' ? 'from-purple-500 to-purple-600' : 'from-green-500 to-green-600'} shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          {value.toLocaleString()}
        </div>
      </div>
    </div>
  );

  const RepoCard = ({ repo, index }: { repo: Repository; index: number }) => (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                {repo.name}
              </h3>
            </div>
            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
              {repo.description || 'No description available'}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800/50 border border-green-500/20">
                <GitCommit className="w-3 h-3 text-green-500" />
                {repo.commit_count || 0} commits
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800/50">
                <Star className="w-3 h-3 text-yellow-500" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800/50">
                <Code2 className="w-3 h-3 text-blue-500" />
                {repo.language || 'Unknown'}
              </span>
            </div>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 p-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors group-hover:bg-primary/20"
          >
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center" id="github">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
              <Github className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <p className="text-lg text-slate-400">Loading GitHub data...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative z-20 pt-20 md:pt-12 lg:pt-20 pb-20 md:pb-12 lg:pb-20 rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] bg-background/95 backdrop-blur-xl border-t border-border/40 shadow-2xl"
      id="github"
    >
      <div className="relative z-10 container-custom">
        {/* Hero Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <div className="flex-1 mb-8 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 mb-6">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-xs font-medium text-primary uppercase tracking-widest">GITHUB SECTION</span>
              <Sparkles className="w-3 h-3 text-purple-400" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-semibold leading-none tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                A curated view
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                of my GitHub work
              </span>
            </h1>
            
            <p className="body-large text-muted-foreground max-w-3xl leading-relaxed mb-8">
              Clean widgets for statistics, recent repositories, and contribution activity — 
              styled like a minimal Awwwards case study instead of a raw GitHub feed.
            </p>
            
            <MagneticButton className="btn-primary">
              <a 
                href="https://github.com/princliv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Github className="w-5 h-5" />
                Open GitHub profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </MagneticButton>
          </div>

          {/* Most Used Languages Widget */}
          <div className="lg:text-right">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 max-w-sm">
              <div className="text-left mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Most Used Languages</h3>
                <p className="text-sm text-slate-400">Programming languages I work with most</p>
              </div>
              
              {/* Language Legend */}
              <div className="space-y-2">
                {languages.slice(0, 4).map(lang => {
                  const total = languages.reduce((sum, l) => sum + l.count, 0);
                  const percentage = total > 0 ? (lang.count / total) * 100 : 0;
                  return (
                    <div key={lang.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-sm text-white">
                          {lang.name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout - Stats and Streak */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <StatCard icon={Star} label="Stars" value={stats.totalStars} color="primary" />
            <StatCard icon={GitFork} label="Forks" value={stats.totalForks} color="secondary" />
            <StatCard icon={Users} label="Followers" value={stats.followers} color="primary" />
            <StatCard icon={Activity} label="Contributions" value={stats.contributions} color="secondary" />
          </div>

          {/* Right Column - Streak Stats */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-3xl border border-orange-500/20 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Current Streak</h3>
                  <p className="text-slate-400">Keep the fire burning! 🔥</p>
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {stats.currentStreak} days
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl border border-blue-500/20 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Longest Streak</h3>
                  <p className="text-slate-400">Personal best record</p>
                </div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stats.longestStreak} days
              </div>
            </div>
          </div>
        </div>

        {/* Total Contributions Banner */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-slate-700/50 backdrop-blur-xl">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold text-white">
              {stats.contributions.toLocaleString()}
            </span>
            <span className="text-slate-400 text-lg">total contributions</span>
          </div>
        </div>

        {/* GitHub Contribution Graph */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8">
            <GitHubContributionGraph />
          </div>
        </div>

        {/* Top Repositories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Top Repositories
              </span>
            </h2>
            <p className="body-large text-muted-foreground">My most starred and forked projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRepos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        </div>

        </div>

      {/* Cosmic floating orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 cosmic-orb opacity-30" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 left-10 w-48 h-48 cosmic-orb opacity-20" style={{ animationDelay: '2s' }} />
    </section>
  );
};
