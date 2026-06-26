import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPost();
    }, [id]);

    const loadPost = async () => {
        try {
            const res = await axiosClient.get(`/Posts/${id}`);
            setPost(res.data);
        } catch (error) {
            console.error("Lỗi tải chi tiết bài viết:", error);
            setError("Không tải được chi tiết bài viết.");
        }
    };

    const getImageUrl = (imageUrl) => {
        if (!imageUrl) {
            return "https://via.placeholder.com/900x400?text=No+Image";
        }

        if (imageUrl.startsWith("http")) {
            return imageUrl;
        }

        return `http://localhost:5000${imageUrl}`;
    };

    const formatDate = (date) => {
        if (!date) {
            return "Chưa có ngày";
        }

        return new Date(date).toLocaleDateString("vi-VN");
    };

    if (error) {
        return (
            <div>
                <div className="alert alert-danger">{error}</div>
                <Link to="/" className="btn btn-primary">
                    Quay lại trang chủ
                </Link>
            </div>
        );
    }

    if (!post) {
        return <div className="alert alert-info">Đang tải bài viết...</div>;
    }

    return (
        <div>
            <Link to="/" className="btn btn-secondary mb-3">
                Quay lại trang chủ
            </Link>

            <div className="card shadow-sm">
                <img
                    src={getImageUrl(post.imageUrl)}
                    alt={post.title}
                    className="card-img-top"
                    style={{ height: "420px", objectFit: "cover" }}
                />

                <div className="card-body">
                    <h1 className="fw-bold mb-3">{post.title}</h1>

                    <div className="text-muted mb-4">
                        <span>
                            Danh mục: {post.categoryName || "Chưa có danh mục"}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                            Ngày đăng: {formatDate(post.createdDate)}
                        </span>
                    </div>

                    <div
                        style={{
                            fontSize: "18px",
                            lineHeight: "1.8",
                            whiteSpace: "pre-line"
                        }}
                    >
                        {post.content || "Bài viết chưa có nội dung."}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;