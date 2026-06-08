import { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Users,
  Activity,
  Trophy,
  Flame,
  GitCommit,
} from 'lucide-react';
import { GitHubContributionGraph } from '@/components/ui/GitHubContributionGraph';
import { githubService, type GitHubStats, type Repository, type LanguageData } from '@/lib/githubService';

const PROFILE_IMAGE = '/assets/profile.webp';
const viewport = { once: true, amount: 0.12 } as const;
const ease = [0.22, 1, 0.36, 1] as const;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: i * 0.06 },
  }),
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease, delay: i * 0.06 },
  }),
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease, delay: i * 0.06 },
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } catch {
      return undefined;
    }
  }, []);
  return reduced;
}

function CountUp({ end, className }: { end: number; className?: string }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (end <= 0) {
      setValue(end);
      return;
    }
    const duration = 900; // ms
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end]);

  return <span className={className}>{value.toLocaleString()}</span>;
}

function RepoCard({ repo, index }: { repo: Repository; index: number }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeInUp}
      custom={index}
      whileHover={{ scale: 1.02, y: -6, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-card animated-border border border-slate-200/80 dark:border-border/60 p-6 shadow-md dark:shadow-[0_4px_24px_-8px_hsla(0,0%,0%,0.4)] hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-[0_12px_48px_-12px_hsla(192,91%,50%,0.2)] transition-all duration-500"
    >
      {/* Ambient depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-purple-500/[0.05] dark:from-primary/[0.07] dark:via-transparent dark:to-purple-500/[0.06] pointer-events-none" />
      {/* Hover glow wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-purple-500/0 group-hover:from-primary/[0.08] group-hover:to-purple-500/[0.05] transition-all duration-500 pointer-events-none" />
      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="shrink-0 p-2.5 rounded-xl bg-primary/10 dark:bg-primary/15 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_-4px_hsla(192,91%,50%,0.5)]">
              <Github className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 dark:text-muted-foreground/60 mb-0.5">
                repo.{String(index + 1).padStart(2, '0')}
              </p>
              <h4 className="text-lg font-semibold font-['Space_Grotesk'] tracking-tight text-slate-900 dark:text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                {repo.name}
              </h4>
            </div>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-2.5 rounded-xl bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-sm hover:bg-slate-200 dark:hover:bg-white/[0.08] transition-all duration-300 group-hover:bg-primary/15 dark:group-hover:bg-primary/20 border border-slate-200/80 dark:border-white/[0.08] group-hover:border-primary/30 group-hover:shadow-[0_0_16px_-4px_hsla(192,91%,50%,0.4)]"
            aria-label={`Open ${repo.name} on GitHub`}
          >
            <ExternalLink className="w-4 h-4 text-slate-500 dark:text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </a>
        </div>

        <p className="text-sm text-slate-650 dark:text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
          {repo.description || 'No description available'}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-muted-foreground">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/70 dark:border-white/[0.07]">
            <GitCommit className="w-3 h-3 text-emerald-500" />
            <span className="font-medium text-slate-700 dark:text-foreground/80">{repo.commit_count ?? 0}</span>
            <span className="text-slate-400 dark:text-muted-foreground/70">commits</span>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/70 dark:border-white/[0.07]">
            <Star className="w-3 h-3 text-amber-500" />
            <span className="font-medium text-slate-700 dark:text-foreground/80">{repo.stargazers_count}</span>
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-white/[0.04] backdrop-blur-sm border border-slate-200/70 dark:border-white/[0.07]">
            <Code2 className="w-3 h-3 text-primary" />
            <span className="font-medium text-slate-700 dark:text-foreground/80">{repo.language || 'Unknown'}</span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function GitHubSection() {
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
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [githubStats, repos] = await Promise.all([
          githubService.getStats(),
          githubService.getRepos(),
        ]);
        setStats(githubStats);
        setTopRepos(githubService.getTopRepos(repos, 6));
        setLanguages(githubService.getLanguageStats(repos));
      } catch {
        // fallback sample data
        setStats({
          totalStars: 127,
          totalForks: 89,
          totalRepos: 45,
          followers: 234,
          following: 67,
          contributions: 1250,
          currentStreak: 15,
          longestStreak: 45,
        });
        setTopRepos([
          {
            id: 1,
            name: 'portfolio-website',
            description: 'A modern, responsive portfolio built with React and TypeScript',
            stargazers_count: 42,
            forks_count: 12,
            language: 'TypeScript',
            html_url: 'https://github.com/princliv/portfolio-website',
            updated_at: '2024-01-15',
            topics: [],
            fork: false,
          },
          {
            id: 2,
            name: 'ai-chatbot',
            description: 'An intelligent chatbot powered by machine learning',
            stargazers_count: 38,
            forks_count: 8,
            language: 'Python',
            html_url: 'https://github.com/princliv/ai-chatbot',
            updated_at: '2024-01-10',
            topics: [],
            fork: false,
          },
          {
            id: 3,
            name: 'react-components',
            description: 'Reusable React components with modern design',
            stargazers_count: 25,
            forks_count: 6,
            language: 'JavaScript',
            html_url: 'https://github.com/princliv/react-components',
            updated_at: '2024-01-08',
            topics: [],
            fork: false,
          },
        ]);
        setLanguages([
          { name: 'TypeScript', count: 45, color: '#3178c6' },
          { name: 'JavaScript', count: 30, color: '#f1e05a' },
          { name: 'Python', count: 20, color: '#3572A5' },
          { name: 'React', count: 15, color: '#61dafb' },
          { name: 'CSS', count: 10, color: '#563d7c' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <section id="github" className="min-h-[80vh] flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
            <Github className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">Loading GitHub...</p>
        </motion.div>
      </section>
    );
  }

  const totalLang = languages.reduce((s, l) => s + l.count, 0);

  return (
    <section id="github" className="scroll-snap-section relative z-20 bg-[#f5f5f7] dark:bg-background overflow-hidden border-t border-slate-200 dark:border-border/50">
      {/* Hero */}
      <div className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col lg:flex-row">
        <motion.div
          className="relative w-full lg:w-[48%] min-h-[50vh] lg:min-h-full order-1 overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.9, ease }}
        >
          <motion.img
            src={PROFILE_IMAGE}
            alt="Profile"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ scale: 1.02 }}
            whileInView={reduced ? {} : { y: [-8, 8, -8] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f7] via-[#f5f5f7]/60 to-transparent lg:via-[#f5f5f7]/40 lg:to-transparent dark:from-background dark:via-background/60 dark:to-transparent lg:dark:via-background/40 lg:dark:to-transparent" />
        </motion.div>

        <div className="relative w-full lg:w-[52%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-28 order-2">
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            On GitHub
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-slate-900 dark:text-foreground mb-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Build in the open.
            <br />
            <span className="text-primary">Code, commits, craft.</span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-605 dark:text-muted-foreground max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Repositories, contribution activity, and the stack I ship with — all in one place, no clutter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a
              href="https://github.com/princliv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Github className="w-4 h-4" />
              View profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <motion.div className="border-y border-slate-200 dark:border-border/50 bg-slate-200/20 dark:bg-muted/30" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
        <div className="container-custom py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { Icon: Star, label: 'Stars', value: stats.totalStars },
              { Icon: GitFork, label: 'Forks', value: stats.totalForks },
              { Icon: Users, label: 'Followers', value: stats.followers },
              { Icon: Activity, label: 'Contributions', value: stats.contributions },
            ].map(({ Icon, label, value }, i) => (
              <motion.div key={label} variants={fadeInUp} custom={i} className="flex items-center gap-4">
                <div className="rounded-xl bg-white dark:bg-background border border-slate-200 dark:border-border p-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-foreground tabular-nums">
                    <CountUp end={value} />
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-muted-foreground uppercase tracking-wider">{label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Streak + Languages */}
      <motion.div className="container-custom py-12 md:py-16" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-4">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-muted-foreground">Current streak</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-foreground tabular-nums"><CountUp end={stats.currentStreak} /> days</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-muted-foreground">Longest streak</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-foreground tabular-nums"><CountUp end={stats.longestStreak} /> days</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="rounded-2xl border border-slate-200 dark:border-border bg-white/70 dark:bg-card/50 p-6">
            <p className="text-sm font-semibold text-slate-800 dark:text-foreground mb-4">Most used languages</p>
            <div className="flex flex-wrap gap-3">
              {languages.slice(0, 5).map((lang, i) => {
                const pct = totalLang > 0 ? (lang.count / totalLang) * 100 : 0;
                return (
                  <motion.div key={lang.name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.5, delay: i * 0.06 }} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-muted/80 border border-slate-200 dark:border-border">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: lang.color }} />
                    <span className="text-sm font-medium text-slate-800 dark:text-foreground">{lang.name}</span>
                    <span className="text-xs text-slate-500 dark:text-muted-foreground tabular-nums">{pct.toFixed(0)}%</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Contribution graph */}
      <motion.section className="container-custom pb-16 md:pb-24" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewport} transition={{ duration: 0.6, ease }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-foreground">Activity</h3>
            <p className="text-slate-500 dark:text-muted-foreground mt-1">{stats.contributions.toLocaleString()} contributions in the last year</p>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.995 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewport} transition={{ duration: 0.6 }} className="rounded-2xl border border-slate-200 dark:border-border bg-white/70 dark:bg-card/50 p-6 md:p-8 overflow-x-auto">
          <GitHubContributionGraph />
        </motion.div>
      </motion.section>

      {/* Top repos */}
      <motion.section className="container-custom pb-24 md:pb-32" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
        <motion.div className="mb-12" variants={fadeInUp}>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-foreground">Top repositories</h3>
          <p className="text-slate-550 dark:text-muted-foreground mt-1">Most starred and forked projects</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRepos.map((repo, idx) => (
            <RepoCard key={repo.id} repo={repo} index={idx} />
          ))}
        </div>
      </motion.section>

      {/* Ambient */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
    </section>
  );
}
