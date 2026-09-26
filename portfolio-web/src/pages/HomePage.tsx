// TODO: HomePage
// - Hero section: giới thiệu bản thân
// - Kỹ năng (skills)
// - Dự án nổi bật (featured posts)
// - Liên hệ
// Dùng dữ liệu từ data/profile.ts
import ProjectCard from '../components/ProjectCard'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

type SkillListProps = {
    skills: string[]
}

function SkillList({ skills }: SkillListProps) {
    return (
        <ul className="skill-list">
            {skills.map((skill) => (
                <li key={skill}>{skill}</li>
            ))}
        </ul>
    )
}

export default function HomePage() {
    return (
        <main id="home" className="container">
            <section className="hero">
                <p>Xin chào, tôi là</p>

                <h1>{profile.name}</h1>

                <h2>{profile.title}</h2>

                <p>{profile.bio}</p>

                <p>Location: {profile.location}</p>

                <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    Xem GitHub
                </a>
            </section>

            <section id="skills">
                <h2>Kỹ năng</h2>
                <SkillList skills={profile.skills} />
            </section>

            <section id="projects">
                <h2>Dự án</h2>

                <div className="project-grid">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            tags={project.tags}
                            repositoryUrl={project.repositoryUrl}
                        />
                    ))}
                </div>
            </section>

            <section id="contact">
                <h2>Liên hệ</h2>

                <p>
                    Email:{' '}
                    <a href={`mailto:${profile.email}`}>
                        {profile.email}
                    </a>
                </p>

                <p>
                    GitHub:{' '}
                    <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {profile.githubUrl}
                    </a>
                </p>
            </section>
        </main>
    )
}