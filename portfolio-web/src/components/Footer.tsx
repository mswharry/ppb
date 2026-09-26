// TODO: Footer component
// - Thông tin bản quyền
// - Links mạng xã hội / GitHub
type FooterProps = {
    name: string
}

export default function Footer({ name }: FooterProps) {
    return (
        <footer className="site-footer">
            <p>
                © {new Date().getFullYear()} {name}. Built while learning React.
            </p>
        </footer>
    )
}