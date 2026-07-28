(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", (() => {
        const header = document.querySelector(".header");
        if (!header) return;
        let lastScroll = window.pageYOffset;
        const startPoint = 120;
        window.addEventListener("scroll", (() => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= startPoint) {
                header.classList.remove("header--hidden", "header--visible");
                lastScroll = currentScroll;
                return;
            }
            if (currentScroll > lastScroll) {
                header.classList.add("header--hidden");
                header.classList.remove("header--visible");
            } else {
                header.classList.remove("header--hidden");
                header.classList.add("header--visible");
            }
            lastScroll = currentScroll;
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const topItems = document.querySelectorAll(".menu > .menu__list > .menu__item--dropdown");
        const nestedItems = document.querySelectorAll(".menu__dropdown-item--has-dropdown");
        let topHideTimeout;
        let nestedHideTimeout;
        const isMobile = () => window.innerWidth <= 1200;
        topItems.forEach((item => {
            const link = item.querySelector(":scope > .menu__link");
            link?.querySelector("i");
            item.addEventListener("mouseenter", (() => {
                if (isMobile()) return;
                clearTimeout(topHideTimeout);
                topItems.forEach((el => {
                    if (el !== item) el.classList.remove("active");
                }));
                item.classList.add("active");
            }));
            item.addEventListener("mouseleave", (() => {
                if (isMobile()) return;
                topHideTimeout = setTimeout((() => {
                    item.classList.remove("active");
                    item.querySelectorAll(".active").forEach((el => {
                        el.classList.remove("active");
                    }));
                }), 1500);
            }));
            if (link) link.addEventListener("click", (e => {
                if (!isMobile()) return;
                const href = link.getAttribute("href");
                if (e.target.closest("i")) {
                    e.preventDefault();
                    e.stopPropagation();
                    item.classList.toggle("active");
                    return;
                }
                if (!item.classList.contains("active")) {
                    e.preventDefault();
                    topItems.forEach((el => {
                        if (el !== item) el.classList.remove("active");
                    }));
                    nestedItems.forEach((el => el.classList.remove("active")));
                    item.classList.add("active");
                    return;
                }
                if (!href || href === "#" || href === "#!") {
                    e.preventDefault();
                    item.classList.remove("active");
                }
            }));
        }));
        nestedItems.forEach((item => {
            const link = item.querySelector(":scope > a");
            link?.querySelector("i");
            item.addEventListener("mouseenter", (() => {
                if (isMobile()) return;
                clearTimeout(nestedHideTimeout);
                const parent = item.parentElement;
                parent.querySelectorAll(":scope > .menu__dropdown-item--has-dropdown.active").forEach((el => {
                    if (el !== item) el.classList.remove("active");
                }));
                item.classList.add("active");
            }));
            item.addEventListener("mouseleave", (() => {
                if (isMobile()) return;
                nestedHideTimeout = setTimeout((() => {
                    item.classList.remove("active");
                }), 1500);
            }));
            if (link) link.addEventListener("click", (e => {
                if (!isMobile()) return;
                const href = link.getAttribute("href");
                if (e.target.closest("i")) {
                    e.preventDefault();
                    e.stopPropagation();
                    item.classList.toggle("active");
                    return;
                }
                if (!item.classList.contains("active")) {
                    e.preventDefault();
                    item.classList.add("active");
                    return;
                }
                if (!href || href === "#" || href === "#!") {
                    e.preventDefault();
                    item.classList.remove("active");
                }
            }));
        }));
        document.addEventListener("click", (e => {
            if (!e.target.closest(".menu")) {
                clearTimeout(topHideTimeout);
                clearTimeout(nestedHideTimeout);
                topItems.forEach((item => item.classList.remove("active")));
                nestedItems.forEach((item => item.classList.remove("active")));
            }
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const btn = document.querySelector(".open-menu");
        const menu = document.querySelector(".menu-wrapper");
        const overlay = document.querySelector(".menu-overlay");
        if (!btn || !menu) return;
        function openMenu() {
            btn.classList.add("active");
            menu.classList.add("active");
            overlay.classList.add("active");
            document.body.classList.add("menu-open");
            const icon = btn.querySelector("i");
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        }
        function closeMenu() {
            btn.classList.remove("active");
            menu.classList.remove("active");
            overlay.classList.remove("active");
            document.body.classList.remove("menu-open");
            const icon = btn.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
        btn.addEventListener("click", (() => {
            if (menu.classList.contains("active")) closeMenu(); else openMenu();
        }));
        overlay.addEventListener("click", closeMenu);
        window.addEventListener("resize", (() => {
            if (window.innerWidth > 1200) closeMenu();
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const leaves = document.querySelectorAll(".leaf");
            if (!leaves.length) return;
            function animate() {
                const viewport = window.innerHeight;
                leaves.forEach((el => {
                    const speedY = Number(el.dataset.speedY ?? 0);
                    const speedX = Number(el.dataset.speedX ?? 0);
                    const rotate = Number(el.dataset.rotate ?? 0);
                    const wave = Number(el.dataset.wave ?? 2);
                    const baseRotate = Number(el.dataset.baseRotate ?? 0);
                    const rect = el.getBoundingClientRect();
                    const progress = (viewport - rect.top) / (viewport + rect.height);
                    const p = Math.max(0, Math.min(1, progress));
                    const y = (p - .5) * speedY;
                    const x = Math.sin(p * Math.PI * wave) * speedX;
                    const r = baseRotate + (p - .5) * rotate;
                    el.style.transform = `\n          translate(${x}px, calc(-50% + ${y}px))\n          rotate(${r}deg)\n        `;
                }));
                requestAnimationFrame(animate);
            }
            animate();
        } catch (error) {}
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        document.querySelectorAll(".floating-whatsapp").forEach((widget => {
            const close = widget.querySelector(".floating-whatsapp__close");
            setTimeout((() => {
                widget.classList.add("show");
            }), 2e3);
            close.addEventListener("click", (() => {
                widget.style.transition = "opacity .4s ease, transform .4s ease";
                widget.style.opacity = "0";
                widget.style.transform = "translateY(20px)";
                setTimeout((() => {
                    widget.remove();
                }), 400);
            }));
        }));
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        try {
            const items = document.querySelectorAll(".faq__item");
            if (!items.length) return;
            const closeAll = () => {
                items.forEach((item => {
                    item.classList.remove("faq__item--active");
                    const inner = item.querySelector(".faq__inner");
                    if (inner) inner.style.height = "0px";
                }));
            };
            items.forEach((item => {
                const trigger = item.querySelector(".faq__question");
                const inner = item.querySelector(".faq__inner");
                if (!trigger || !inner) return;
                trigger.addEventListener("click", (() => {
                    const isOpen = item.classList.contains("faq__item--active");
                    closeAll();
                    if (!isOpen) {
                        item.classList.add("faq__item--active");
                        inner.style.height = inner.scrollHeight + "px";
                    }
                }));
            }));
        } catch (e) {
            console.warn("FAQ error:", e);
        }
    }));
    new Swiper(".before-after__slider", {
        slidesPerView: 4,
        speed: 500,
        spaceBetween: 20,
        navigation: {
            nextEl: ".before-after__next",
            prevEl: ".before-after__prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        allowTouchMove: false,
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            600: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 4
            }
        }
    });
    new Swiper(".before-after__slider-single", {
        slidesPerView: 3,
        speed: 500,
        spaceBetween: 20,
        navigation: {
            nextEl: ".before-after__next",
            prevEl: ".before-after__prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        allowTouchMove: false,
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            600: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            }
        }
    });
    document.querySelectorAll(".compare").forEach((compare => {
        const line = compare.querySelector(".compare__line");
        const after = compare.querySelector(".compare__after");
        let active = false;
        function move(e) {
            const rect = compare.getBoundingClientRect();
            let percent = (e.clientX - rect.left) / rect.width * 100;
            percent = Math.max(0, Math.min(100, percent));
            after.style.clipPath = `inset(0 0 0 ${percent}%)`;
            line.style.left = percent + "%";
        }
        line.addEventListener("mousedown", (() => {
            active = true;
            compare.classList.add("is-dragging");
        }));
        window.addEventListener("mouseup", (() => {
            active = false;
            compare.classList.remove("is-dragging");
        }));
        window.addEventListener("mousemove", (e => {
            if (!active) return;
            move(e);
        }));
        line.addEventListener("touchstart", (() => {
            active = true;
            compare.classList.add("is-dragging");
        }));
        window.addEventListener("touchend", (() => {
            active = false;
            compare.classList.remove("is-dragging");
        }));
        window.addEventListener("touchmove", (e => {
            if (!active) return;
            move({
                clientX: e.touches[0].clientX
            });
        }));
    }));
    window["FLS"] = true;
})();