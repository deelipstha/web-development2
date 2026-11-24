import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/posts";

export default function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/${id}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Post not found");
                }
                setPost(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            setDeleting(true);
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to delete post");
            }
            navigate("/");
        } catch (err) {
            setError(err.message);
            setDeleting(false);
        }
    };

    if (loading) return <p>Loading post...</p>;
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <article>
            <h1>{post.title}</h1>
            <p style={{ color: "#555" }}>By {post.author}</p>
            <p style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>{post.content}</p>

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                <Link to={`/posts/${post._id}/edit`}>Edit Post</Link>
                <button onClick={handleDelete} disabled={deleting}>
                    {deleting ? "Deleting..." : "Delete Post"}
                </button>
                <Link to="/">Back to Posts</Link>
            </div>
        </article>
    );
}