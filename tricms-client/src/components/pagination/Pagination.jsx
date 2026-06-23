function Pagination({ currentPage, totalItems, pageSize, onPageChange }) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) {
        return null;
    }

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    const pages = [];

    for (let page = 1; page <= totalPages; page += 1) {
        if (
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 2
        ) {
            pages.push(page);
        } else if (page === currentPage - 3 || page === currentPage + 3) {
            pages.push("...");
        }
    }

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }

        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="catalog-pagination">
            <div className="text-muted small">
                Hiển thị {startItem}-{endItem} / {totalItems}
            </div>

            <nav aria-label="Phân trang">
                <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Trước
                        </button>
                    </li>

                    {pages.map((page, index) => (
                        page === "..." ? (
                            <li className="page-item disabled" key={`ellipsis-${index}`}>
                                <span className="page-link">...</span>
                            </li>
                        ) : (
                            <li
                                className={`page-item ${page === currentPage ? "active" : ""}`}
                                key={page}
                            >
                                <button
                                    type="button"
                                    className="page-link"
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        )
                    ))}

                    <li className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}>
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Sau
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
