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
        return <div className="alert alert-info">Đang tải bài viết...</div>;
    }

    return (
        <article className="post-detail-page">
            <Link to="/news" className="btn btn-outline-secondary mb-3">
                ← Quay lại tin tức
            </Link>

            <header className="post-detail-hero">
                <div className="post-detail-hero__content">
                    <span>{post.categoryName || "Tin công nghệ"}</span>
                    <h1>{post.title}</h1>
                    <p>Ngày đăng: {formatDate(post.createdDate)}</p>
                </div>

                <img
                    src={getImageUrl(post.imageUrl, "https://via.placeholder.com/900x400?text=No+Image")}
                    alt={post.title}
                />
            </header>

            <div className="post-detail-layout">
                <div className="post-detail-body">
                    {post.content ? (
                        <div
                            className="post-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    ) : (
                        <p className="post-content">
                            Bài viết chưa có nội dung.
                        </p>
                    )}
                </div>

                <aside className="post-detail-sidebar">
                    <h2>TriShop</h2>
                    <p>
                        Theo dõi tin tức công nghệ, ưu đãi sản phẩm và hướng dẫn mua hàng mới nhất.
                    </p>
                    <Link to="/shop" className="btn btn-primary btn-sm">
                        Xem sản phẩm
                    </Link>
                </aside>
            </div>
        </article>
    );
}

export default PostDetail;
