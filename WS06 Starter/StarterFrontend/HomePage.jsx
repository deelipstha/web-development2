import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/api/posts";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch(API_URL);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch posts");
                }
                setPosts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;

    return (
        <div>
            <h1>Blog Posts</h1>
            {posts.length === 0 ? (
                <p>
                    No posts yet. <Link to="/new">Create the first post</Link>.
                </p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {posts.map((post) => (
                        <article
                            key={post._id}
                            style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "1rem" }}
                        >
                            <h2 style={{ marginTop: 0 }}>
                                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                            </h2>
                            <p style={{ color: "#555", fontSize: "0.9rem" }}>By {post.author}</p>
                            <p>{post.content.length > 160 ? `${post.content.slice(0, 160)}...` : post.content}</p>
                            <Link to={`/posts/${post._id}`}>Read more</Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}