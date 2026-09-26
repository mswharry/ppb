// TODO: Thông tin cá nhân
// Export object chứa: name, title, bio, skills, contacts, featured projects
// Dữ liệu dùng cho HomePage
export type Profile = {
    name: string;
    title: string;
    bio: string
    skills: string[]
    githubUrl: string
    email: string
    location: string
}

export const profile: Profile = {
    name: 'Vũ Đặng Hải Đăng',
    title: 'Offensive Security & CTF Learner',
    bio: 'My dream is to become a red teamer',
    skills: ['Web Security', 'Network & OS', 'Web Development', 'Scripting', 'Digital Forensics'],
    githubUrl: 'https://github.com/mswharry',
    email: 'msw_dang@outlook.com',
    location: 'Me Tri, Hanoi, Vietnam'
}