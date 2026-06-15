export function formatMoney(value) {
    return `${Number(value || 0).toLocaleString("vi-VN")} đ`;
}

export function formatDate(value) {
    if (!value) {
        return "Chưa có ngày";
    }

    return new Date(value).toLocaleDateString("vi-VN");
}

export function formatDateTime(value) {
    if (!value) {
        return "Chưa có ngày";
    }

    return new Date(value).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
