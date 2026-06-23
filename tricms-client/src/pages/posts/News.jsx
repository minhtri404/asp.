import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import { getPosts } from "../../services/postService";
import { formatDate } from "../../utils/formatters";
import { getImageUrl } from "../../utils/media";

const POST_PAGE_SIZE = 6;

function News() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pageValue = Number(searchParams.get("page") || 1);
    const currentPage = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const totalPages = Math.max(1, Math.ceil(posts.length / POST_PAGE_SIZE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedPosts = posts.slice(
        (safePage - 1) * POST_PAGE_SIZE,
        safePage * POST_PAGE_SIZE
    );

    const updatePage = (page) => {
        const nextParams = new URLSearchParams(searchParams);

        if (page <= 1) {
            nextParams.delete("page");
        } else {
            nextParams.set("page", String(page));
        }

        setSearchParams(nextParams);
    };

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

    useEffect(() => {
        if (!loading && currentPage !== safePage) {
            updatePage(safePage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, loading, safePage]);

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
                {paginatedPosts.map((post) => (
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

            <Pagination
                currentPage={safePage}
                totalItems={posts.length}
                pageSize={POST_PAGE_SIZE}
                onPageChange={updatePage}
            />
        </div>
    );
}

export default News;
