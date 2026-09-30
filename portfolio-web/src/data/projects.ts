export type ProjectCategory = 'development' | 'security' | 'ctf'
export type Project = {
    id: string
    title: string
    description: string
    category: ProjectCategory
    tags: string[]
    repositoryUrl?: string
}
export const projects: Project[] = [
    {
        id: 'portfolio',
        title: 'Personal Portfolio',
        description:
            'Website profile cá nhân được xây dựng bằng React và TypeScript.',
        category: 'development',
        tags: ['React', 'TypeScript', 'CSS'],
        repositoryUrl: 'https://github.com/mswharry/ppb',
    },
    {
        id: 'web-security-notes',
        title: 'Web Security Learning Notes',
        description:
            'Ghi chú học tập về các lỗ hổng web và phương pháp kiểm thử bảo mật.',
        category: 'security',
        tags: ['Web Security', 'OWASP', 'Burp Suite'],
    },
    {
        id: 'ctf-writeups',
        title: 'CTF Write-ups',
        description:
            'Các bài phân tích challenge CTF và quá trình tìm ra lời giải.',
        category: 'ctf',
        tags: ['CTF', 'Forensics', 'Scripting'],
    },
]
