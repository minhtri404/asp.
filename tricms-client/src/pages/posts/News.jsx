import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../services/postService";
import { formatDate } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function News() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const loadPosts = useCallback(async () => {
        setLoading(true);
        setMessage("");

        try {
            const res = await getPosts();
            setPosts(res.data || []);
        } catch (error) {
            console.error("Lỗi tải tin tức:", error);
            setMessage("Không thể tải tin tức. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadPosts();
    }, [loadPosts]);

    return (
        <div>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Tin tức</h2>
                    <p className="text-muted mb-0">Cập nhật bài viết công nghệ và thông tin mới từ TriShop.</p>
                </div>

                <button className="btn btn-outline-primary" onClick={loadPosts} disabled={loading}>
                    {loading ? "Đang tải..." : "Tải lại"}
                </button>
            </div>

            {message && (
                <div className="alert alert-danger">
                    {message}
                </div>
            )}

            {loading && (
                <div className="alert alert-info">
                    Đang tải tin tức...
                </div>
            )}

            {!loading && posts.length === 0 && !message && (
                <div className="alert alert-warning">
                    Chưa có bài viết nào.
                </div>
            )}

            <div className="row">
                {posts.map((post) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={post.id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={getImageUrl(post.imageUrl)}
                                className="card-img-top"
                                alt={post.title}
                                style={{ height: "220px", objectFit: "cover" }}
                            />

                            <div className="card-body d-flex flex-column">
                                <div className="text-muted small mb-2">
                                    {post.categoryName || "Tin công nghệ"} · {formatDate(post.createdDate)}
                                </div>

                                <h5 className="fw-bold">{post.title}</h5>

                                <p className="text-muted flex-grow-1">
                                    {post.content
                                        ? `${post.content.substring(0, 140)}...`
                                        : "Bài viết chưa có nội dung."}
                                </p>

                                <Link to={`/post/${post.id}`} className="btn btn-outline-primary">
                                    Xem bài viết
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
