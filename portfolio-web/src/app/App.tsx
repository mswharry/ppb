// TODO: Khung layout chính và khai báo routes
// Import BrowserRouter, Routes, Route từ react-router
// Import Header, Footer
// Import các page: HomePage, PostsPage, PostDetailPage, AchievementsPage, NotFoundPage
import Footer from '../components/Footer'
import Header from '../components/Header'
import { profile } from '../data/profile'
import HomePage from '../pages/HomePage'

export default function App() {
    return (
        <>
            <Header name={profile.name} />
            <HomePage />
            <Footer name={profile.name} />
        </>
    )
}