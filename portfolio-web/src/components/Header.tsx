// TODO: Header component
// - Logo/tên portfolio
// - Navigation links: Home, Posts, Achievements
// - Menu mobile (hamburger)
type HeaderProps = {
    name: string
}

export default function Header({ name }: HeaderProps) {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <a className="site-logo" href="#home">{name}</a>
                <nav aria-label="Main navigation">
                    <ul className="nav-list">
                        <li>
                            <a href="#home">Giới thiệu</a>
                        </li>
                        <li>
                            <a href="#posts">Bài viết</a>
                        </li>
                        <li>
                            <a href="#achievements">Thành tựu</a>
                        </li>
                        <li>
                            <a href="#projects">Dự án</a>
                        </li>
                        <li>
                            <a href="#skills">Kỹ Năng</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}