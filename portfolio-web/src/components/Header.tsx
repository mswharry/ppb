import { useState } from 'react'
type HeaderProps = {
    name: string
}
const navigationItems = [
    { href: '#home', label: 'Giới thiệu' },
    { href: '#skills', label: 'Kỹ năng' },
    { href: '#projects', label: 'Dự án' },
    { href: '#contact', label: 'Liên hệ' },
]

export default function Header({ name }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    function closeMenu() {
        setIsMenuOpen(false)
    }
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <a
                    className="site-logo"
                    href="#home"
                    onClick={closeMenu}
                >
                    {name}
                </a>

                <button
                    className="menu-button"
                    type="button"
                    aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="main-navigation"
                    onClick={() =>
                        setIsMenuOpen((current) => !current)
                    }
                >
                    <span aria-hidden="true">
                        {isMenuOpen ? '✕' : '☰'}
                    </span>
                </button>

                <nav
                    id="main-navigation"
                    className={
                        isMenuOpen
                            ? 'main-navigation main-navigation--open'
                            : 'main-navigation'
                    }
                    aria-label="Điều hướng chính"
                >
                    <ul className="nav-list">
                        {navigationItems.map((item) => (
                            <li key={item.href}>
                                <a href={item.href} onClick={closeMenu}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}