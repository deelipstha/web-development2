import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/new" element={<NewPostPage />} />
                    <Route path="/posts/:id" element={<PostPage />} />
                    <Route path="/posts/:id/edit" element={<EditPostPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}