const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageItems = () => {
        if (totalPages <= 8) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        if (currentPage <= 4) {
            return [1, 2, 3, 4, "...", totalPages - 2, totalPages - 1, totalPages];
        }

        if (currentPage >= totalPages - 3) {
            return [1, 2, 3, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    const goToPage = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange(page);
    };

    return (
        <nav className="mt-16 flex justify-center" aria-label="Product pagination">
            <div className="inline-flex items-center border border-gray-200 bg-white">
                {getPageItems().map((item, index) => (
                    item === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="flex h-12 min-w-12 items-center justify-center border-r border-gray-200 px-3 text-sm font-bold text-gray-900"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            onClick={() => goToPage(item)}
                            aria-current={item === currentPage ? "page" : undefined}
                            className={`flex h-12 min-w-12 items-center justify-center border-r border-gray-200 px-3 text-base font-medium transition-colors ${item === currentPage
                                ? "bg-[#f6f2fb] text-[#7a5aa0]"
                                : "text-[#b5793d] hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {item}
                        </button>
                    )
                ))}

                <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="flex h-12 min-w-14 items-center justify-center px-4 text-xl text-[#b5793d] transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
                >
                    &rarr;
                </button>
            </div>
        </nav>
    );
};

export default ProductPagination;
