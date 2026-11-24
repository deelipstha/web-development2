import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const API_URL = "http://localhost:3000/api/posts";

export default function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/${id}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to load post");
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

    const handleUpdatePost = async (updatedData) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || "Failed to update post");
        }
        navigate(`/posts/${id}`);
    };

    if (loading) return <p>Loading post...</p>;
    if (error) return <p style={{ color: "crimson" }}>Error: {error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div>
            <h1>Edit Post</h1>
            <PostForm initialValues={post} onSubmit={handleUpdatePost} submitLabel="Update Post" />
        </div>
    );
}