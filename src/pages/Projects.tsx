import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Github, ExternalLink, Star, GitFork, Loader2, AlertCircle } from 'lucide-react';
import { githubService, type Repository } from '@/lib/githubService';

const SIMPLE_ICONS_CDN = 'https://cdn.simpleicons.org';

const PROJECT_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
];

const TECH_TO_ICON_SLUG: Record<string, string> = {
  typescript: 'typescript',
  javascript: 'javascript',
  python: 'python',
  html: 'html5',
  css: 'css3',
  vue: 'vuedotjs',
  'vue.js': 'vuedotjs',
  react: 'react',
  'next.js': 'nextdotjs',
  nextjs: 'nextdotjs',
  'node.js': 'nodedotjs',
  nodejs: 'nodedotjs',
  tailwind: 'tailwindcss',
  'tailwind css': 'tailwindcss',
  docker: 'docker',
  postgresql: 'postgresql',
  redis: 'redis',
  graphql: 'graphql',
  rust: 'rust',
  go: 'go',
  golang: 'go',
  java: 'openjdk',
  'c++': 'cplusplus',
  cpp: 'cplusplus',
  csharp: 'csharp',
  'c#': 'csharp',
  ruby: 'ruby',
  php: 'php',
  swift: 'swift',
  kotlin: 'kotlin',
  svelte: 'svelte',
  angular: 'angular',
  express: 'express',
  mongodb: 'mongodb',
  aws: 'amazonaws',
  vercel: 'vercel',
  git: 'git',
  figma: 'figma',
  redux: 'redux',
  jest: 'jest',
  webpack: 'webpack',
  vite: 'vite',
  prisma: 'prisma',
  trpc: 'trpc',
  threejs: 'threedotjs',
  'three.js': 'threedotjs',
  tensorflow: 'tensorflow',
  pytorch: 'pytorch',
  flask: 'flask',
  django: 'django',
  fastapi: 'fastapi',
  scala: 'scala',
  elixir: 'elixir',
  haskell: 'haskell',
  lua: 'lua',
  shell: 'gnubash',
  markdown: 'markdown',
  json: 'json',
  yaml: 'yaml',
};

function getTechIconSlug(tag: string): string | null {
  const key = tag.toLowerCase().trim().replace(/\s+/g, ' ');
  return TECH_TO_ICON_SLUG[key] ?? TECH_TO_ICON_SLUG[key.replace(/\./g, '')] ?? null;
}

function getTechIconUrl(slug: string): string {
  return `${SIMPLE_ICONS_CDN}/${slug}`;
}

type ProjectCard = {
  id: number;
  repoName: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  image: string;
  techIconSlugs: string[];
  github: string;
  live: string | null;
  year: string;
  stars: number;
  forks: number;
};

function repoToProject(repo: Repository, index: number): ProjectCard {
  const year = repo.updated_at ? new Date(repo.updated_at).getFullYear().toString() : '—';
  const tags = [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 5) as string[];
  const description = repo.description || 'No description available.';
  const techIconSlugs = tags
    .map((t) => getTechIconSlug(t))
    .filter((s): s is string => s != null);
  const uniqueSlugs = Array.from(new Set(techIconSlugs));
  return {
    id: repo.id,
    repoName: repo.name,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    description: description.length > 120 ? description.slice(0, 120) + '…' : description,
    longDescription: description,
    tags,
    category: repo.language || 'Other',
    image: PROJECT_IMAGES[index % PROJECT_IMAGES.length],
    techIconSlugs: uniqueSlugs,
    github: repo.html_url,
    live: repo.homepage && repo.homepage.trim() !== '' ? repo.homepage : null,
    year,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  };
}

function ProjectCardImage({
  image,
  techIconSlugs,
  title,
}: {
  image: string;
  techIconSlugs: string[];
  title: string;
}) {
  const slugs = techIconSlugs.slice(0, 6);
  return (
    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/20 to-transparent" />
      {slugs.length > 0 && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/90 backdrop-blur-sm border border-border/50">
            {slugs.map((slug) => (
              <img
                key={slug}
                src={getTechIconUrl(slug)}
                alt=""
                width={24}
                height={24}
                className="object-contain opacity-90"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectModalImage({
  image,
  techIconSlugs,
  title,
}: {
  image: string;
  techIconSlugs: string[];
  title: string;
}) {
  const slugs = techIconSlugs.slice(0, 8);
  return (
    <div className="relative aspect-video overflow-hidden rounded-t-3xl">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
      {slugs.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background/90 backdrop-blur-sm border border-border/50">
            {slugs.map((slug) => (
              <img
                key={slug}
                src={getTechIconUrl(slug)}
                alt=""
                width={32}
                height={32}
                className="object-contain opacity-90"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectDetailBody({
  project,
  readmeHtml,
  readmeLoading,
  readmeError,
}: {
  project: ProjectCard;
  readmeHtml: string;
  readmeLoading: boolean;
  readmeError: string | null;
}) {
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-2"
        >
          <Github className="w-4 h-4" />
          View on GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 border-t border-border pt-4">
        <h3 className="text-sm font-semibold mb-2">README</h3>
        {readmeLoading && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading README…</span>
          </div>
        )}
        {readmeError && !readmeLoading && (
          <div className="flex items-start gap-2 text-sm text-destructive py-4">
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <span>{readmeError}</span>
          </div>
        )}
        {!readmeLoading && !readmeError && readmeHtml && (
          <div
            className="prose-sm max-w-none text-sm leading-relaxed [&_*]:text-foreground [&_a]:text-primary [&_code]:bg-muted [&_pre]:bg-muted/60"
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        )}
        {!readmeLoading && !readmeError && !readmeHtml && (
          <p className="text-sm text-muted-foreground py-4">
            No README available for this repository yet.
          </p>
        )}
      </div>
    </>
  );
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [readmeHtml, setReadmeHtml] = useState<string>('');
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    githubService
      .getRepos()
      .then((repos) => {
        if (!cancelled) {
          setProjects(repos.map((repo, i) => repoToProject(repo, i)));
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Failed to load repositories.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const openProject = (project: ProjectCard) => {
    setSelectedProject(project);
    setReadmeHtml('');
    setReadmeError(null);
    setReadmeLoading(true);

    githubService
      .getRepoReadme(project.repoName)
      .then((html) => {
        setReadmeHtml(html);
      })
      .catch((err) => {
        setReadmeError(err?.message || 'Failed to load README.');
      })
      .finally(() => {
        setReadmeLoading(false);
      });
  };

  const categorySet = Array.from(new Set(projects.map((p) => p.category)));
  const categories = [
    'All',
    ...categorySet.sort((a, b) => {
      if (a === 'Other') return 1;
      if (b === 'Other') return -1;
      return a.localeCompare(b);
    }),
  ];
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Projects"
            title="Featured Work"
            description="A curated selection of projects showcasing my expertise across different domains and technologies."
          />

          {!loading && !error && categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-custom">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" aria-hidden />
              <p className="text-muted-foreground">Loading repositories from GitHub…</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 gap-4 rounded-2xl bg-muted/30 border border-border"
            >
              <AlertCircle className="w-12 h-12 text-destructive" aria-hidden />
              <p className="text-muted-foreground text-center max-w-md">{error}</p>
              <p className="text-sm text-muted-foreground">
                Ensure <code className="px-1.5 py-0.5 rounded bg-muted">VITE_GITHUB_TOKEN</code> is set in your <code className="px-1.5 py-0.5 rounded bg-muted">.env</code> if you use a private or high rate limit.
              </p>
            </motion.div>
          )}

          {!loading && !error && (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openProject(project)}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-card animated-border">
                      <div className="relative">
                        <ProjectCardImage
                          image={project.image}
                          techIconSlugs={project.techIconSlugs}
                          title={project.title}
                        />
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                          <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                            {project.year}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs">
                            <Star className="w-3.5 h-3.5" />
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs">
                            <GitFork className="w-3.5 h-3.5" />
                            {project.forks}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                          {project.category}
                        </span>
                        <h3 className="heading-4 text-xl mt-2 mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No repositories match the selected filter.
            </p>
          )}
        </div>
      </section>

      {/* Project details: modal on small screens, sheet from the right on larger */}
      {isMobile ? (
        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProject(null);
              setReadmeHtml('');
              setReadmeError(null);
              setReadmeLoading(false);
            }
          }}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="line-clamp-2 pr-2">{selectedProject.title}</span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted">
                        <Star className="w-3.5 h-3.5" /> {selectedProject.stars}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted">
                        <GitFork className="w-3.5 h-3.5" /> {selectedProject.forks}
                      </span>
                    </span>
                  </DialogTitle>
                  <DialogDescription className="line-clamp-3">
                    {selectedProject.longDescription || selectedProject.description}
                  </DialogDescription>
                </DialogHeader>
                <ProjectDetailBody
                  project={selectedProject}
                  readmeHtml={readmeHtml}
                  readmeLoading={readmeLoading}
                  readmeError={readmeError}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet
          open={!!selectedProject}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProject(null);
              setReadmeHtml('');
              setReadmeError(null);
              setReadmeLoading(false);
            }
          }}
        >
          <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
            {selectedProject && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between gap-3">
                    <span className="line-clamp-2">{selectedProject.title}</span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground whitespace-nowrap">
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted">
                        <Star className="w-3.5 h-3.5" /> {selectedProject.stars}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted">
                        <GitFork className="w-3.5 h-3.5" /> {selectedProject.forks}
                      </span>
                    </span>
                  </SheetTitle>
                  <SheetDescription className="line-clamp-3">
                    {selectedProject.longDescription || selectedProject.description}
                  </SheetDescription>
                </SheetHeader>
                <ProjectDetailBody
                  project={selectedProject}
                  readmeHtml={readmeHtml}
                  readmeLoading={readmeLoading}
                  readmeError={readmeError}
                />
              </>
            )}
          </SheetContent>
        </Sheet>
      )}
    </Layout>
  );
};

export default Projects;
