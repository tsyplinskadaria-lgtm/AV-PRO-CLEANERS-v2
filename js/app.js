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
            const hasDropdown = !!item.querySelector(":scope > .menu__dropdown");
            item.addEventListener("mouseenter", (() => {
                if (isMobile()) return;
                clearTimeout(topHideTimeout);
                topItems.forEach((el => {
                    if (el !== item) {
                        el.classList.remove("active");
                        el.querySelectorAll(".active").forEach((sub => {
                            sub.classList.remove("active");
                        }));
                    }
                }));
                if (hasDropdown) item.classList.add("active");
            }));
            item.addEventListener("mouseleave", (() => {
                if (isMobile()) return;
                if (!hasDropdown) return;
                topHideTimeout = setTimeout((() => {
                    item.classList.remove("active");
                    item.querySelectorAll(".active").forEach((el => {
                        el.classList.remove("active");
                    }));
                }), 1500);
            }));
            if (link && hasDropdown) link.addEventListener("click", (e => {
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
    document.addEventListener("DOMContentLoaded", (() => {
        const slider = document.querySelector(".before-after__slider-single");
        const pagination = document.querySelector(".before-after__pagination");
        const prevBtn = document.querySelector(".before-after__prev");
        const nextBtn = document.querySelector(".before-after__next");
        if (!slider || !pagination || !prevBtn || !nextBtn || typeof Swiper === "undefined") return;
        const slidesCount = slider.querySelectorAll(".swiper-slide").length;
        const dotsCount = Math.min(5, slidesCount);
        pagination.innerHTML = "";
        const dots = [];
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement("span");
            dot.className = "before-after-dot";
            dot.addEventListener("click", (() => {
                const currentCycle = Math.floor(beforeAfterSwiper.realIndex / dotsCount);
                let target = currentCycle * dotsCount + i;
                if (target >= slidesCount) target = slidesCount - 1;
                beforeAfterSwiper.slideTo(target);
            }));
            pagination.appendChild(dot);
            dots.push(dot);
        }
        const beforeAfterSwiper = new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 500,
            loop: true,
            watchOverflow: true,
            allowTouchMove: false,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
                disabledClass: "is-disabled"
            },
            pagination: false,
            breakpoints: {
                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 15
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            },
            on: {
                init(swiper) {
                    updateDots(swiper);
                    updateButtons(swiper);
                    toggleControls(swiper);
                },
                slideChange(swiper) {
                    updateDots(swiper);
                    updateButtons(swiper);
                },
                resize(swiper) {
                    toggleControls(swiper);
                    updateButtons(swiper);
                },
                lock(swiper) {
                    toggleControls(swiper);
                },
                unlock(swiper) {
                    toggleControls(swiper);
                }
            }
        });
        function updateDots(swiper) {
            dots.forEach((dot => dot.classList.remove("active")));
            if (!dots.length) return;
            const activeDot = swiper.realIndex % dotsCount;
            dots[activeDot]?.classList.add("active");
        }
        function updateButtons(swiper) {
            prevBtn.classList.toggle("is-disabled", swiper.isBeginning);
            nextBtn.classList.toggle("is-disabled", swiper.isEnd);
        }
        function toggleControls(swiper) {
            const hide = swiper.isLocked;
            pagination.style.display = hide ? "none" : "";
            prevBtn.style.display = hide ? "none" : "";
            nextBtn.style.display = hide ? "none" : "";
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const path = window.location.pathname;
        document.querySelectorAll(".menu__item > a").forEach((link => {
            const href = link.getAttribute("href");
            if (!href || href === "#!") return;
            if (path.endsWith(href)) link.closest(".menu__item")?.classList.add("current");
        }));
        if (path.includes("services-single")) document.querySelector('.menu__item > a[href="services.html"]')?.closest(".menu__item")?.classList.add("current");
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const slider = document.querySelector(".reviews__slider");
        const pagination = document.querySelector(".reviews__pagination");
        const prevBtn = document.querySelector(".reviews__prev");
        const nextBtn = document.querySelector(".reviews__next");
        if (!slider || !pagination || !prevBtn || !nextBtn || typeof Swiper === "undefined") return;
        const slidesCount = slider.querySelectorAll(".swiper-slide").length;
        const dotsCount = Math.min(5, slidesCount);
        pagination.innerHTML = "";
        const dots = [];
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement("span");
            dot.className = "reviews-dot";
            dot.addEventListener("click", (() => {
                const currentCycle = Math.floor(reviewsSwiper.realIndex / dotsCount);
                let target = currentCycle * dotsCount + i;
                if (target >= slidesCount) target = slidesCount - 1;
                reviewsSwiper.slideTo(target);
            }));
            pagination.appendChild(dot);
            dots.push(dot);
        }
        const reviewsSwiper = new Swiper(slider, {
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 700,
            loop: true,
            watchOverflow: true,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
                disabledClass: "is-disabled"
            },
            pagination: false,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            },
            on: {
                init(swiper) {
                    updateDots(swiper);
                    updateButtons(swiper);
                    toggleControls(swiper);
                },
                slideChange(swiper) {
                    updateDots(swiper);
                    updateButtons(swiper);
                },
                resize(swiper) {
                    toggleControls(swiper);
                    updateButtons(swiper);
                },
                lock(swiper) {
                    toggleControls(swiper);
                },
                unlock(swiper) {
                    toggleControls(swiper);
                }
            }
        });
        function updateDots(swiper) {
            dots.forEach((dot => dot.classList.remove("active")));
            if (!dots.length) return;
            const activeDot = swiper.realIndex % dotsCount;
            dots[activeDot]?.classList.add("active");
        }
        function updateButtons(swiper) {
            prevBtn.classList.toggle("is-disabled", swiper.isBeginning);
            nextBtn.classList.toggle("is-disabled", swiper.isEnd);
        }
        function toggleControls(swiper) {
            const hide = swiper.isLocked;
            pagination.style.display = hide ? "none" : "";
            prevBtn.style.display = hide ? "none" : "";
            nextBtn.style.display = hide ? "none" : "";
        }
    }));
    window["FLS"] = true;
})();