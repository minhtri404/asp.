import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAdvertisements } from "../../services/advertisementService";
import { getImageUrl, getStaticAssetUrl } from "../../utils/media";

const fallbackSlides = [
    {
        id: "fallback-iphone",
        subtitle: "TriShop công nghệ",
        title: "iPhone 15 Pro Max",
        description: "Titan bền nhẹ, camera sắc nét, ưu đãi trả góp và thu cũ lên đời cho khách hàng TriShop.",
        imageUrl: "/img/iphone.jpg",
        linkUrl: "/shop?category=2",
        buttonText: "Xem điện thoại"
    },
    {
        id: "fallback-laptop",
        subtitle: "Laptop văn phòng",
        title: "MacBook Air M2",
        description: "Mỏng nhẹ, pin lâu, hiệu năng ổn định cho học tập, làm việc và di chuyển mỗi ngày.",
        imageUrl: "/img/laptop.jpg",
        linkUrl: "/shop?category=1",
        buttonText: "Xem laptop"
    }
];

function HeroBanner() {
    const [slides, setSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let mounted = true;

        async function loadAdvertisements() {
            try {
                const res = await getAdvertisements();

                if (mounted) {
                    setSlides(Array.isArray(res.data) ? res.data : []);
                }
            } catch (error) {
                console.error("Lỗi tải banner quảng cáo:", error);
            }
        }

        loadAdvertisements();

        return () => {
            mounted = false;
        };
    }, []);

    const displaySlides = useMemo(() => {
        return slides.length > 0 ? slides : fallbackSlides;
    }, [slides]);

    useEffect(() => {
        if (displaySlides.length <= 1) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % displaySlides.length);
        }, 5000);

        return () => window.clearInterval(timer);
    }, [displaySlides.length]);

    useEffect(() => {
        if (activeIndex >= displaySlides.length) {
            setActiveIndex(0);
        }
    }, [activeIndex, displaySlides.length]);

    const activeSlide = displaySlides[activeIndex] || displaySlides[0];
    const imageUrl = activeSlide?.imageUrl?.startsWith("/img/")
        ? getStaticAssetUrl(activeSlide.imageUrl)
        : getImageUrl(activeSlide?.imageUrl, getStaticAssetUrl("/img/iphone.jpg"));

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    const goPrev = () => {
        setActiveIndex((current) => (
            current === 0 ? displaySlides.length - 1 : current - 1
        ));
    };

    const goNext = () => {
        setActiveIndex((current) => (current + 1) % displaySlides.length);
    };

    if (!activeSlide) {
        return null;
    }

    const primaryLink = activeSlide.linkUrl || "/shop";
    const buttonText = activeSlide.buttonText || "Xem ngay";

    return (
        <section className="home-hero">
            <div className="home-hero__content">
                {activeSlide.subtitle && (
                    <p className="home-hero__eyebrow">{activeSlide.subtitle}</p>
                )}

                <h1>{activeSlide.title}</h1>

                {activeSlide.description && (
                    <p className="home-hero__copy">{activeSlide.description}</p>
                )}

                <div className="home-hero__offers">
                    <span>Ưu đãi thu cũ</span>
                    <span>Trả góp 0%</span>
                </div>

                <div className="home-hero__actions">
                    {primaryLink.startsWith("http") ? (
                        <a href={primaryLink} className="btn btn-light btn-lg fw-bold">
                            {buttonText}
                        </a>
                    ) : (
                        <Link to={primaryLink} className="btn btn-light btn-lg fw-bold">
                            {buttonText}
                        </Link>
                    )}

                    <Link to="/shop" className="btn btn-outline-light btn-lg fw-bold">
                        Mua sắm ngay
                    </Link>
                </div>
            </div>

            <div className="home-hero__media">
                <img src={imageUrl} alt={activeSlide.title} />
            </div>

            {displaySlides.length > 1 && (
                <>
                    <button
                        type="button"
                        className="home-hero__nav home-hero__nav--prev"
                        onClick={goPrev}
                        aria-label="Banner trước"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className="home-hero__nav home-hero__nav--next"
                        onClick={goNext}
                        aria-label="Banner sau"
                    >
                        ›
                    </button>

                    <div className="home-hero__dots" aria-label="Chọn banner">
                        {displaySlides.map((slide, index) => (
                            <button
                                type="button"
                                className={index === activeIndex ? "active" : ""}
                                key={slide.id}
                                onClick={() => goToSlide(index)}
                                aria-label={`Banner ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default HeroBanner;
