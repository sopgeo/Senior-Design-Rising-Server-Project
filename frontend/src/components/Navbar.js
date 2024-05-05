import "../css/Navbar.css";

export default function Navbar() {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <a href='/'>Home</a>
                </li>
                <li>
                    <a href='/Projects'>Projects</a>
                </li>
                <li>
                    <a href='/Upload'>Upload</a>
                </li>
            </ul>
        </nav>
    )
}