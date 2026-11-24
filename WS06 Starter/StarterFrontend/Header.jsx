import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 2rem",
                borderBottom: "1px solid #ddd"
            }}
        >
            <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "1.25rem" }}>
                Full-Stack Blog
            </Link>
            <nav style={{ display: "flex", gap: "1rem" }}>
                <Link to="/">Home</Link>
                <Link to="/new">New Post</Link>
            </nav>
        </header>
    );
}