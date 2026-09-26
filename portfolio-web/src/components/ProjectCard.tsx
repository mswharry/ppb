type ProjectCardProps = {
    title: string
    description: string
    tags: string[]
    repositoryUrl?: string
}

export default function ProjectCard({
    title,
    description,
    tags,
    repositoryUrl
}: ProjectCardProps) {
    return (
        <article className="project-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <ul className="tag-list">
                {tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                ))}
            </ul>
            {repositoryUrl && (
                <a href={repositoryUrl} target="_blank" rel="noreferrer">
                    Xem mã nguồn
                </a>
            )}
        </article>
    )
}