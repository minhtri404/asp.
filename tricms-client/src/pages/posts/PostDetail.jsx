import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { formatDate } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const res = await getPostById(id);
                setPost(res.data);
            } catch (error) {
                console.error("Lỗi tải chi tiết bài viết:", error);
            }
        };

        loadPost();
    }, [id]);

    if (!post) {
        return (
            <div className="alert alert-info">
                Đang tải bài viết...
            </div>
        );
    }

    return (
        <div>
            <Link to="/" className="btn btn-secondary mb-3">
                Quay lại trang chủ
            </Link>

            <div className="card shadow-sm">
                <img
                    src={getImageUrl(post.imageUrl, "https://via.placeholder.com/900x400?text=No+Image")}
                    alt={post.title}
                    className="card-img-top"
                    style={{
                        height: "420px",
                        objectFit: "cover"
                    }}
                />

                <div className="card-body">
                    <h1 className="fw-bold mb-3">
                        {post.title}
                    </h1>

                    <div className="text-muted mb-3">
                        <span>
                            Danh mục: {post.categoryName || "Chưa có danh mục"}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                            Ngày đăng: {formatDate(post.createdDate)}
                        </span>
                    </div>

                    <p style={{ whiteSpace: "pre-line", fontSize: "18px", lineHeight: "1.8" }}>
                        {post.content || "Bài viết chưa có nội dung."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
