import { ArrowUpRight } from 'lucide-react'

export function ProjectCard({ project }) {
  function handlePointerMove(event) {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    card.style.setProperty('--pointer-x', `${((x + 1) / 2) * 100}%`)
    card.style.setProperty('--pointer-y', `${((y + 1) / 2) * 100}%`)
    card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-5px)`
  }

  function resetPointer(event) {
    const card = event.currentTarget
    card.style.transform = ''
    card.style.setProperty('--pointer-x', '50%')
    card.style.setProperty('--pointer-y', '50%')
  }

  return (
    <article className="project-feature" onPointerMove={handlePointerMove} onPointerLeave={resetPointer} onPointerUp={resetPointer}>
      <div className="project-card-shell">
        <div className="project-image-wrap"><img src={project.image} alt={`${project.title} project preview`} /><span className="image-fallback">Add project image</span></div>
        <div className="project-info"><span className="project-number">{project.number} / Featured</span><h3>{project.title}</h3><p className="project-type">{project.type}</p><p className="project-description">{project.description}</p><div className="project-details"><div><span>Role / Focus</span><strong>{project.role}</strong><p>{project.focus}</p></div><div><span>Built around</span><div className="project-features">{project.features.map((feature) => <b key={feature}>{feature}</b>)}</div></div></div><div className="tech-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><div className="project-links"><a className="text-link" href={project.demo}><span>Live demo</span><ArrowUpRight size={16} strokeWidth={1.5} /></a><a className="text-link" href={project.github}><span>GitHub</span><ArrowUpRight size={16} strokeWidth={1.5} /></a></div></div>
      </div>
    </article>
  )
}
