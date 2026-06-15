import { API_ORIGIN } from "../config/api";

export function getImageUrl(imageUrl, placeholder = "https://via.placeholder.com/400x250?text=No+Image") {
    if (!imageUrl) {
        return placeholder;
    }

    if (imageUrl.startsWith("http")) {
        return imageUrl;
    }

    return `${API_ORIGIN}${imageUrl}`;
}

export function getStaticAssetUrl(path) {
    return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
