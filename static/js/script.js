/* ==========================================================================
   Rishav Raj - Portfolio
   Interactive behaviour: mobile nav, scroll spy, skill-bar animation,
   scroll reveal, and AJAX contact-form submission.
   ========================================================================== */

(function () {
    "use strict";

    var prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------- Mobile navigation ---------- */
    function initNavToggle() {
        var toggle = document.querySelector(".nav-toggle");
        var menu = document.querySelector(".nav-menu");

        if (!toggle || !menu) {
            return;
        }

        // The markup uses a plain <div>, so give it real button semantics.
        toggle.setAttribute("role", "button");
        toggle.setAttribute("tabindex", "0");
        toggle.setAttribute("aria-label", "Toggle navigation menu");
        toggle.setAttribute("aria-expanded", "false");

        function setOpen(open) {
            toggle.classList.toggle("active", open);
            menu.classList.toggle("active", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        }

        function toggleMenu() {
            setOpen(!menu.classList.contains("active"));
        }

        toggle.addEventListener("click", toggleMenu);

        toggle.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleMenu();
            }
        });

        // Close after picking a destination on mobile.
        menu.addEventListener("click", function (event) {
            if (event.target.closest(".nav-link")) {
                setOpen(false);
            }
        });

        document.addEventListener("click", function (event) {
            if (
                menu.classList.contains("active") &&
                !menu.contains(event.target) &&
                !toggle.contains(event.target)
            ) {
                setOpen(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setOpen(false);
            }
        });

        // Reset state if the viewport grows back to desktop while open.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                setOpen(false);
            }
        });
    }

    /* ---------- Header shadow on scroll ---------- */
    function initHeaderScroll() {
        var header = document.querySelector(".header");

        if (!header) {
            return;
        }

        function update() {
            header.classList.toggle("scrolled", window.scrollY > 10);
        }

        update();
        window.addEventListener("scroll", update, { passive: true });
    }

    /* ---------- Scroll spy: highlight the section in view ---------- */
    function initScrollSpy() {
        var links = Array.prototype.slice.call(
            document.querySelectorAll('.nav-link[href^="#"]')
        );

        if (!links.length || !("IntersectionObserver" in window)) {
            return;
        }

        var sections = links
            .map(function (link) {
                var id = link.getAttribute("href").slice(1);
                return id ? document.getElementById(id) : null;
            })
            .filter(Boolean);

        if (!sections.length) {
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    links.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                });
            },
            // Trigger around the upper third of the viewport.
            { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
        );

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    /* ---------- Smooth scrolling for in-page anchors ---------- */
    function initSmoothScroll() {
        document.addEventListener("click", function (event) {
            var link = event.target.closest('a[href^="#"]');

            if (!link) {
                return;
            }

            var id = link.getAttribute("href");

            if (!id || id === "#") {
                return;
            }

            var target = document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });

            // Keep the URL shareable without a second jump.
            if (window.history && window.history.pushState) {
                window.history.pushState(null, "", id);
            }
        });
    }

    /* ---------- Skill bars: animate to their inline width ---------- */
    function initSkillBars() {
        var bars = Array.prototype.slice.call(
            document.querySelectorAll(".skill-progress")
        );

        if (!bars.length) {
            return;
        }

        // The target percentage lives in the template's inline style; stash it
        // and reset to 0 so the fill can animate in when scrolled into view.
        bars.forEach(function (bar) {
            var target = bar.style.width || "0%";
            bar.setAttribute("data-width", target);
            bar.setAttribute("role", "progressbar");
            bar.setAttribute("aria-valuenow", parseInt(target, 10) || 0);
            bar.setAttribute("aria-valuemin", "0");
            bar.setAttribute("aria-valuemax", "100");
        });

        function fill(bar) {
            bar.style.width = bar.getAttribute("data-width");
        }

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            bars.forEach(fill);
            return;
        }

        bars.forEach(function (bar) {
            bar.style.width = "0%";
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        fill(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25 }
        );

        bars.forEach(function (bar) {
            observer.observe(bar);
        });
    }

    /* ---------- Scroll reveal for cards and sections ---------- */
    function initScrollReveal() {
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            return;
        }

        var selectors = [
            ".highlight-item",
            ".experience-item",
            ".project-item",
            ".education-item",
            ".skills-category",
            ".contact-info",
            ".contact-form"
        ];

        var items = Array.prototype.slice.call(
            document.querySelectorAll(selectors.join(","))
        );

        if (!items.length) {
            return;
        }

        items.forEach(function (item) {
            item.classList.add("reveal");
        });

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        items.forEach(function (item) {
            observer.observe(item);
        });
    }

    /* ---------- Contact form (AJAX) ---------- */
    function initContactForm() {
        var form = document.getElementById("contactForm");

        if (!form) {
            return;
        }

        var messageBox = document.getElementById("form-message");
        var submitButton = form.querySelector('button[type="submit"]');

        function showMessage(text, isSuccess) {
            if (!messageBox) {
                return;
            }

            messageBox.innerHTML = "";

            var box = document.createElement("div");
            box.className = isSuccess
                ? "form-message-success"
                : "form-message-error";
            box.setAttribute("role", isSuccess ? "status" : "alert");
            box.textContent = text;
            messageBox.appendChild(box);
            messageBox.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "nearest"
            });
        }

        function clearFieldErrors() {
            form.querySelectorAll(".input-error").forEach(function (field) {
                field.classList.remove("input-error");
            });
        }

        function markFieldErrors(errors) {
            Object.keys(errors || {}).forEach(function (name) {
                var field = form.querySelector('[name="' + name + '"]');

                if (field) {
                    field.classList.add("input-error");
                }
            });
        }

        function firstErrorText(errors) {
            var keys = Object.keys(errors || {});

            if (!keys.length) {
                return "Please correct the highlighted fields and try again.";
            }

            var first = errors[keys[0]];

            return Array.isArray(first) ? first[0] : String(first);
        }

        form.addEventListener("submit", function (event) {
            // Without fetch, fall through to the normal POST + redirect flow
            // that contact_view already handles.
            if (typeof window.fetch !== "function") {
                return;
            }

            event.preventDefault();
            clearFieldErrors();

            var originalLabel = submitButton ? submitButton.textContent : "";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
            }

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                credentials: "same-origin",
                headers: {
                    // contact_view checks this header to return JSON.
                    "X-Requested-With": "XMLHttpRequest"
                }
            })
                .then(function (response) {
                    return response.json().catch(function () {
                        throw new Error("Unexpected server response.");
                    });
                })
                .then(function (data) {
                    if (data && data.success) {
                        showMessage(
                            data.message ||
                                "Thank you for your message! I will get back to you soon.",
                            true
                        );
                        form.reset();
                    } else {
                        markFieldErrors(data && data.errors);
                        showMessage(firstErrorText(data && data.errors), false);
                    }
                })
                .catch(function () {
                    showMessage(
                        "Sorry, something went wrong sending your message. " +
                            "Please try again or email me directly.",
                        false
                    );
                })
                .then(function () {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalLabel;
                    }
                });
        });
    }

    /* ---------- Theme toggle ---------- */
    function initThemeToggle() {
        var btn = document.querySelector(".theme-toggle");

        if (!btn) {
            return;
        }

        var root = document.documentElement;

        // The inline head script has already resolved a concrete data-theme;
        // this only has to flip it and keep the button's label honest.
        function syncLabel() {
            var dark = root.getAttribute("data-theme") === "dark";
            btn.setAttribute(
                "aria-label",
                dark ? "Switch to light theme" : "Switch to dark theme"
            );
            btn.setAttribute("aria-pressed", dark ? "true" : "false");
        }

        syncLabel();

        btn.addEventListener("click", function () {
            var next =
                root.getAttribute("data-theme") === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try {
                localStorage.setItem("theme", next);
            } catch (e) {
                // Private mode / blocked storage: the choice just won't persist.
            }
            syncLabel();
        });
    }

    function init() {
        initThemeToggle();
        initNavToggle();
        initHeaderScroll();
        initScrollSpy();
        initSmoothScroll();
        initSkillBars();
        initScrollReveal();
        initContactForm();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
