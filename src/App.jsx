import { useEffect, useState } from 'react'


import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Atom, BarChart3, Braces, Code2, Database, FileCode2, GitBranch, Menu, Monitor, Palette, Table2, Wind, X } from 'lucide-react'
import { InteractiveBackground } from './components/Background'
import { ProjectCard } from './components/ProjectCard'

const navItems = [
  ['01', 'About', '#about'],
  ['02', 'Education', '#education'],
  ['03', 'Projects', '#projects'],
  ['04', 'Skills', '#skills'],
  ['05', 'Contact', '#contact'],
]

const projects = [
  {
    number: '01',
    title: 'Alinea Laundry',
    type: 'Management web application',
    description: 'A practical laundry management system designed to make daily orders, customer records, and operational flow easier to handle.',
    role: 'Web application development',
    focus: 'Turning a daily laundry workflow into a clearer digital system.',
    features: ['Order tracking', 'Customer records', 'Operational overview'],
    technologies: ['React', 'Express', 'MySQL'],
    image: '/assets/projects/ss_AlineaLaundry.png',
    github: '#',
    demo: '#',
  },
]

const education = [
  {
    period: '2024 — Present',
    degree: 'Bachelor of Information Systems',
    institution: 'Universitas Negeri Semarang',
    detail: 'Information Systems',
  },
  {
    period: '2021 — 2024',
    degree: 'Senior High School',
    institution: 'SMAN 9 SEMARANG',
    detail: 'MIPA',
  },
]

const skillGroups = [
  ['Programming', [
    { name: 'Python', icon: Code2 },
    { name: 'JavaScript', icon: Braces },
    { name: 'HTML', icon: FileCode2 },
    { name: 'CSS', icon: Palette },
  ]],
  ['Development', [
    { name: 'React', icon: Atom },
    { name: 'Vite', icon: Wind },
    { name: 'Tailwind CSS', icon: Wind },
  ]],
  ['Data & Database', [
    { name: 'MySQL', icon: Database },
    { name: 'SQL', icon: Table2 },
    { name: 'Pandas', icon: BarChart3 },
    { name: 'NumPy', icon: Code2 },
  ]],
  ['Tools', [
    { name: 'Git', icon: GitBranch },
    { name: 'GitHub', icon: GitBranch },
    { name: 'VS Code', icon: Monitor },
  ]],
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  )
}

function LinkArrow({ children, href = '#' }) {
  return (
    <a className="text-link" href={href}>
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={1.5} />
    </a>
  )
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-shell">
      <InteractiveBackground />
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <a className="wordmark" href="#top" aria-label="Radhitya home">
          R / M / A
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([number, label, href]) => (
            <a key={label} href={href}><span>{number}</span>{label}</a>
          ))}
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">
            {navItems.map(([number, label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}><span>{number}</span>{label}</a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <motion.p className="eyebrow" initial="hidden" animate="visible" variants={reveal}>Information Systems Student <span>↗</span></motion.p>
            <motion.h1 initial="hidden" animate="visible" variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: 0.08 } } }}>
              Radhitya<br /><em>Maheswara</em><br />Aryapratama
            </motion.h1>
            <motion.p className="hero-intro" initial="hidden" animate="visible" variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: 0.16 } } }}>
              I build practical web applications and explore how information systems can make everyday workflows clearer.
            </motion.p>
            <motion.div className="hero-focus" initial="hidden" animate="visible" variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: 0.2 } } }}><span>Focus</span><strong>Web applications · Information systems · Practical solutions</strong></motion.div>
            <motion.div className="hero-actions" initial="hidden" animate="visible" variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: 0.24 } } }}>
              <a className="button button-primary" href="#projects">View projects <ArrowDownRight size={17} /></a>
              <a className="button button-quiet" href="#contact">Get in touch <ArrowUpRight size={17} /></a>
            </motion.div>
          </div>
          <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.25 }}>
            <img src="/assets/profile/Pas_Foto.jpeg" alt="Portrait of Radhitya Maheswara Aryapratama" />
            <div className="portrait-note"><span>Portrait / 2026</span><span>01</span></div>
          </motion.div>
          <div className="hero-meta"><span>Based in Indonesia</span><span>Available for select opportunities</span></div>
        </section>

        <section id="about" className="section-wrap about-section">
          <SectionLabel number="01">About</SectionLabel>
          <motion.div className="about-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <h2>Curious by nature.<br /><em>Practical by design.</em></h2>
            <div className="about-copy"><p>I’m an Information Systems student exploring the intersection of technology, software development, and real-world problem solving.</p><p>I enjoy learning through projects, experimenting with different technologies, and turning ideas into practical digital solutions.</p></div>
          </motion.div>
        </section>

        <section id="education" className="section-wrap education-section">
          <SectionLabel number="02">Education</SectionLabel>
          <div className="education-list">
            {education.map((item, index) => (
              <motion.article className="education-row" key={item.degree} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={{ ...reveal, visible: { ...reveal.visible, transition: { ...reveal.visible.transition, delay: index * 0.08 } } }}>
                <span className="education-period">{item.period}</span>
                <div className="education-main"><h3>{item.institution}</h3><p className="education-degree">{item.degree}</p><p className="education-description">{item.detail}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-wrap projects-section">
          <SectionLabel number="03">Selected projects</SectionLabel>
          <div className="projects-heading"><h2>Work that makes<br /><em>things clearer.</em></h2><p>A small selection of things I’ve built while learning, exploring, and solving real problems.</p></div>
          <div className="project-list">
            {projects.map((project) => (
              <motion.div className="project-reveal" key={project.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="section-wrap skills-section">
          <SectionLabel number="04">Skills</SectionLabel>
          <div className="skills-intro"><h2>A growing<br /><em>toolkit.</em></h2><p>Tools I use to move an idea from a rough question to something useful.</p></div>
          <div className="skills-list">{skillGroups.map(([category, skills]) => <div className="skill-row" key={category}><span className="skill-category">{category}</span><div className="skill-items">{skills.map(({ name, icon: Icon }) => <div className="skill-card" key={name}><Icon size={20} strokeWidth={1.5} /><span>{name}</span></div>)}</div></div>)}</div>
        </section>

        <section id="contact" className="contact-section section-wrap">
          <SectionLabel number="05">Contact</SectionLabel>
          <motion.div className="contact-content" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal}><h2>Let’s<br /><em>connect.</em></h2><p>Have a project, idea, or opportunity in mind? Feel free to reach out.</p><a className="contact-email" href="mailto:radhityamaheswara7@gmail.com">radhityamaheswara7@gmail.com <ArrowUpRight size={21} /></a></motion.div>
          <div className="social-links"><LinkArrow href="mailto:radhityamaheswara7@gmail.com">Email</LinkArrow><LinkArrow href="https://github.com/R-8180">GitHub</LinkArrow><LinkArrow href="https://www.linkedin.com/in/radhitya-maheswara

">LinkedIn</LinkArrow><LinkArrow href="https://instagram.com/radhitya_maheswara">Instagram</LinkArrow></div>
        </section>
      </main>

      <footer className="site-footer"><span>Radhitya Maheswara Aryapratama</span><span>Information Systems Student</span><span>© 2026</span></footer>
    </div>
  )
}
