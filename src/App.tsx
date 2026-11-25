import { FormEvent, useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Download,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Send,
  X,
} from 'lucide-react';
import {
  CONTACT_EMAIL,
  EDUCATION_STREAM,
  PROFILE_IMAGE,
  PROJECTS,
  ProjectCertificate,
  SKILL_GROUPS,
  SOCIAL_LINKS,
  SimpleProject,
} from './data/portfolioData';

type ProjectFilter = 'All' | SimpleProject['category'];

const PROJECT_FILTERS: ProjectFilter[] = [
  'All',
  'Finance & AI',
  'UI/UX Design',
  'Web Development',
  'Python & C++',
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = prefersReducedMotion ? scrollYProgress : smoothProgress;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [selectedProject, setSelectedProject] = useState<SimpleProject | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<ProjectCertificate | null>(null);
  const [portraitError, setPortraitError] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);

  const visibleProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  useEffect(() => {
    if (!selectedProject && !activeCertificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeCertificate) {
          setActiveCertificate(null);
        } else {
          setSelectedProject(null);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject, activeCertificate]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim() || 'Not provided'}\n\n${message.trim()}`
    );
    setDraftOpened(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#111827]">
      {/* Slim Animated Scroll Progress Bar */}
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[3px] bg-slate-200/40"
        aria-hidden="true"
      >
        <motion.div
          style={{ scaleX }}
          className="h-full w-full origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500"
        />
      </div>

      {/* 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#FAFAFB]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            Gauri Yete
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#about"
              className="transition-colors hover:text-slate-950 whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#education"
              className="transition-colors hover:text-slate-950 whitespace-nowrap shrink-0"
            >
              Education
            </a>
            <a
              href="#skills"
              className="transition-colors hover:text-slate-950 whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="transition-colors hover:text-slate-950 whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-slate-950 whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get in Touch
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-700"
              >
                About
              </a>
              <a
                href="#education"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-700"
              >
                Education
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-700"
              >
                Skills
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-slate-700"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Get in Touch
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-blue-600">
                B.Tech Computer Engineering · UI/UX Designer & Developer
              </p>

              <h1
                className="font-display mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-[54px] lg:leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                Hi, I'm Gauri Yete.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                I design clear, human-centered digital interfaces and build reliable software.
                Currently pursuing my B.Tech in Computer Engineering while practicing UI/UX design,
                web development, Python, and C++.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  View Projects
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Contact Me
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-600">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                  >
                    {social.id === 'github' ? (
                      <Github className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Linkedin className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto aspect-square max-w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {!portraitError ? (
                  <img
                    src={PROFILE_IMAGE}
                    alt="Gauri Yete"
                    referrerPolicy="no-referrer"
                    onError={() => setPortraitError(true)}
                    className="h-full w-full scale-[1.12] object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 p-6 text-center">
                    <span className="font-display text-3xl font-bold text-slate-800">GY</span>
                    <span className="mt-1 text-sm text-slate-500">Gauri Yete</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About & Skills Section */}
        <section id="about" className="border-t border-slate-200 bg-white px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wide text-blue-600">About</p>
              <h2
                className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-950"
                style={{ textWrap: 'balance' }}
              >
                Combining design clarity with engineering fundamentals.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                As a Computer Engineering student, I enjoy bridging visual design and practical
                programming. Whether mapping out wireframes or implementing data structures in C++
                and Python, I aim to keep every solution simple, purposeful, and easy to use.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                I am actively learning modern web engineering and looking forward to internships
                and collaborative product builds.
              </p>
            </div>

            <div id="skills" className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-blue-600">Skills</p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-slate-950">
                Core Capabilities
              </h3>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {SKILL_GROUPS.map((group) => (
                  <div
                    key={group.group}
                    className="rounded-xl border border-slate-200 bg-[#FAFAFB] p-5"
                  >
                    <h4 className="font-display text-base font-semibold text-slate-900">
                      {group.group}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {group.skills.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Stream Section */}
        <section id="education" className="border-t border-slate-200 bg-[#FAFAFB] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-blue-600">Education Stream</p>
              <h2
                className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-950"
                style={{ textWrap: 'balance' }}
              >
                Academic Path & Study Focus
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Progression from foundational science and mathematics into undergraduate Computer
                Engineering and interactive software design.
              </p>
            </div>

            <div className="relative mt-10 space-y-5 pl-6 sm:pl-8">
              {/* Vertical timeline line */}
              <div
                className="absolute top-3 bottom-3 left-2 w-px bg-slate-200 sm:left-3"
                aria-hidden="true"
              />

              {EDUCATION_STREAM.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 transition-shadow duration-200 hover:shadow-sm"
                >
                  {/* Timeline node marker */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-7 -left-[22px] flex h-4 w-4 items-center justify-center rounded-full border-2 sm:-left-[26px] ${
                      item.isCurrent
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-slate-300 bg-white'
                    }`}
                  />

                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <GraduationCap className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      <span
                        className={
                          item.isCurrent || item.certificate
                            ? 'font-semibold text-blue-600'
                            : 'font-medium text-slate-600'
                        }
                      >
                        {item.status}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.level}</span>
                    </div>

                    {item.certificate && (
                      <button
                        type="button"
                        onClick={() => setActiveCertificate(item.certificate ?? null)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0"
                      >
                        <Award className="h-3.5 w-3.5" aria-hidden="true" />
                        View Certificate
                      </button>
                    )}
                  </div>

                  <h3 className="font-display mt-2 text-xl font-semibold text-slate-950">
                    {item.stream}
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                    {item.summary}
                  </p>

                  {item.certificate && (
                    <button
                      type="button"
                      onClick={() => setActiveCertificate(item.certificate ?? null)}
                      aria-label={`Preview ${item.certificate.title}`}
                      className="mt-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-[#FAFAFB] p-3 text-left transition-colors hover:border-blue-300 sm:flex-row sm:items-center"
                    >
                      <div className="aspect-[1.414/1] w-40 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                        <img
                          src={item.certificate.previewImage}
                          alt={item.certificate.title}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-blue-600">
                          {item.certificate.issuer}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-slate-900">
                          {item.certificate.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.certificate.period} · ID:{' '}
                          <span className="font-mono text-slate-700">
                            {item.certificate.certificateId}
                          </span>
                        </p>
                      </div>
                    </button>
                  )}

                  <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    Focus areas:{' '}
                    <span className="text-slate-800">{item.subjects.join(' · ')}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="border-t border-slate-200 bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-600">Projects</p>
                <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  Selected Work & Experiments
                </h2>
                <p className="mt-2 max-w-xl text-sm text-slate-600">
                  Sample portfolio entries representing my focus across UI/UX design, web
                  development, and programming.
                </p>
              </div>

              <div
                className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1"
                role="group"
                aria-label="Filter projects"
              >
                {PROJECT_FILTERS.map((filter) => {
                  const active = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {visibleProjects.map((project) => {
                const imgFailed = failedImages[project.id];
                return (
                  <article
                    key={project.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Open details for ${project.title}`}
                      className="aspect-[4/3] w-full overflow-hidden bg-slate-100 text-left"
                    >
                      {!imgFailed ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 p-6 text-center">
                          <Layers className="h-7 w-7 text-slate-400" />
                          <span className="mt-2 font-display text-sm font-medium text-slate-700">
                            {project.title}
                          </span>
                        </div>
                      )}
                    </button>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <p className="text-xs text-slate-500">
                          {project.category}
                          {project.isSample ? ' · Sample Entry' : ''}
                        </p>
                        <h3 className="font-display mt-1.5 text-xl font-semibold text-slate-950">
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="text-left transition-colors hover:text-blue-600"
                          >
                            {project.title}
                          </button>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {project.summary}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
                        <span className="truncate text-slate-500">{project.tech.join(' · ')}</span>
                        <div className="flex items-center gap-4 shrink-0">
                          {project.certificate && (
                            <button
                              type="button"
                              onClick={() => setActiveCertificate(project.certificate ?? null)}
                              className="inline-flex items-center gap-1 font-semibold text-slate-800 hover:text-blue-600 whitespace-nowrap"
                            >
                              <Award className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                              Certificate
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
                          >
                            Details
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t border-slate-200 bg-[#FAFAFB] px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wide text-blue-600">Contact</p>
              <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Let's Work Together
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Feel free to reach out for internships, UI/UX collaborations, or software
                projects.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 font-mono text-sm font-medium text-slate-900 hover:text-blue-600"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  {CONTACT_EMAIL}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-200 bg-[#FAFAFB] px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-slate-950"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-blue-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex min-h-[44px] items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-slate-300 hover:text-blue-600"
                  >
                    <span className="inline-flex items-center gap-2">
                      {social.id === 'github' ? (
                        <Github className="h-4 w-4 text-slate-700" aria-hidden="true" />
                      ) : (
                        <Linkedin className="h-4 w-4 text-blue-600" aria-hidden="true" />
                      )}
                      {social.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-slate-700">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="message" className="block text-xs font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a short message..."
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>

                  {draftOpened && (
                    <span className="text-xs text-slate-600">
                      Opened email draft to {CONTACT_EMAIL}.
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>Gauri Yete · B.Tech Computer Engineering</span>
          <div className="flex flex-wrap items-center gap-5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-slate-900"
              >
                {social.label}
              </a>
            ))}
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-slate-900">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-sm hover:text-slate-950"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
              {!failedImages[selectedProject.id] ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
                  {selectedProject.title}
                </div>
              )}
            </div>

            <div className="p-6">
              <p className="text-xs text-slate-500">{selectedProject.label}</p>
              <h3 id="modal-title" className="font-display mt-1 text-2xl font-semibold text-slate-950">
                {selectedProject.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {selectedProject.details}
              </p>
              <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                Technologies: <span className="text-slate-800">{selectedProject.tech.join(' · ')}</span>
              </p>

              {selectedProject.certificate && (
                <div className="mt-5 rounded-xl border border-slate-200 bg-[#FAFAFB] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => setActiveCertificate(selectedProject.certificate ?? null)}
                      aria-label={`Enlarge ${selectedProject.certificate.title}`}
                      className="aspect-[1.414/1] w-36 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white transition-transform hover:scale-[1.02]"
                    >
                      <img
                        src={selectedProject.certificate.previewImage}
                        alt={selectedProject.certificate.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-blue-600">
                        Verified Program Certificate
                      </p>
                      <h4 className="font-display mt-1 text-base font-semibold text-slate-900">
                        {selectedProject.certificate.program}
                      </h4>
                      <p className="mt-0.5 text-xs text-slate-600">
                        {selectedProject.certificate.issuer} · Issued{' '}
                        {selectedProject.certificate.issuedDate} · ID:{' '}
                        <span className="font-mono">{selectedProject.certificate.certificateId}</span>
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setActiveCertificate(selectedProject.certificate ?? null)}
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          <Award className="h-3.5 w-3.5" />
                          View Certificate
                        </button>

                        <a
                          href={selectedProject.certificate.pdfUrl}
                          download="Gauri_Yete_NASSCOM_Certificate.pdf"
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NASSCOM Certificate PDF Viewer Modal */}
      {activeCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveCertificate(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-xs font-semibold text-blue-600">
                  {activeCertificate.issuer}
                </p>
                <h3
                  id="certificate-modal-title"
                  className="font-display text-lg font-semibold text-slate-950"
                >
                  {activeCertificate.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  {activeCertificate.period} · Issued {activeCertificate.issuedDate} · Certificate
                  ID: <span className="font-mono text-slate-700">{activeCertificate.certificateId}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeCertificate.pdfUrl}
                  download="Gauri_Yete_NASSCOM_Certificate.pdf"
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-200 bg-[#FAFAFB] px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:text-slate-950"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                <button
                  type="button"
                  onClick={() => setActiveCertificate(null)}
                  aria-label="Close certificate viewer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:text-slate-950"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6">
              <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={activeCertificate.previewImage}
                  alt={activeCertificate.title}
                  referrerPolicy="no-referrer"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
