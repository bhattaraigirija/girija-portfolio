document.addEventListener("DOMContentLoaded", () => {
    const year = document.querySelector("#year");
    if (year) year.textContent = new Date().getFullYear();

    renderExperience();
    renderServices();
    renderProjects();
    renderProjectArchive();
    renderGallery();
    renderSocialPosts();
    renderRoleExperience();

    setupNavigation();
    setupTabs();
    setupExperienceShowMore();
    setupGalleryFilters();
    setupRoleTabLinks();
    setupOptionalImages();
    setupReveal();
    setupActiveNavigation();
});

function renderExperience() {
    const softwareList = document.querySelector("#software-experience-list");
    const teachingList = document.querySelector("#teaching-experience-list");
    const experience = window.PORTFOLIO_EXPERIENCE;

    if (!experience) return;
    if (softwareList) softwareList.innerHTML = createExperienceList(experience.software, "software");
    if (teachingList) teachingList.innerHTML = createExperienceList(experience.teaching, "teaching");
}

function createExperienceList(items, type) {
    const cards = items.map((item, index) => createExperienceCard(item, index >= 4)).join("");
    const button = items.length > 4
        ? `<button class="timeline-more" type="button" data-experience-more="${type}">Show More <i class="fa-solid fa-arrow-down"></i></button>`
        : "";
    return `${cards}${button}`;
}

function createExperienceCard(item, isHidden = false) {
    const tags = item.tags.map((tag) => `<li>${tag}</li>`).join("");
    return `
        <article class="timeline-card reveal ${isHidden ? "timeline-extra" : ""}">
            <span class="timeline-date">${item.org} | ${item.period}</span>
            <h3>${item.title}</h3>
            ${item.location ? `<small class="timeline-location"><i class="fa-solid fa-location-dot"></i> ${item.location}</small>` : ""}
            <p>${item.description}</p>
            <ul class="subject-list">${tags}</ul>
        </article>
    `;
}

function renderRoleExperience() {
    const softwareRoleList = document.querySelector("#role-software-experience-list");
    const teachingRoleList = document.querySelector("#role-teaching-experience-list");
    const experience = window.PORTFOLIO_EXPERIENCE;

    if (!experience) return;
    if (softwareRoleList) softwareRoleList.innerHTML = experience.software.map(createRoleExperienceCard).join("");
    if (teachingRoleList) teachingRoleList.innerHTML = experience.teaching.map(createRoleExperienceCard).join("");
}

function createRoleExperienceCard(item) {
    const tags = item.tags.map((tag) => `<li>${tag}</li>`).join("");
    return `
        <article class="role-experience-card reveal">
            <div class="role-experience-meta">
                <span>${item.period}</span>
                ${item.location ? `<small><i class="fa-solid fa-location-dot"></i> ${item.location}</small>` : ""}
            </div>
            <div>
                <p class="kicker">${item.org}</p>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <ul class="subject-list">${tags}</ul>
            </div>
        </article>
    `;
}

function renderServices() {
    const serviceList = document.querySelector("#services-list");
    const services = window.PORTFOLIO_SERVICES;
    if (!serviceList || !services) return;

    serviceList.innerHTML = services.map((service) => `
        <a class="service-card reveal" href="${service.href}">
            <i class="${service.icon}"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </a>
    `).join("");
}

function renderProjects() {
    const projectList = document.querySelector("#projects-list");
    const projects = window.PORTFOLIO_PROJECTS;
    if (!projectList || !projects) return;

    projectList.innerHTML = projects.slice(0, 10).map((project, index) => {
        const isFeatured = index === 0;
        const className = isFeatured
            ? "project-card featured reveal"
            : `project-card reveal project-placeholder ${project.theme}`;
        const tags = project.tags.map((tag) => `<li>${tag}</li>`).join("");
        const mediaClass = isFeatured ? "project-media app-project" : "project-media";

        return `
            <a class="${className}" href="${project.link}" target="_blank" rel="noreferrer">
                <div class="${mediaClass}">
                    <i class="${project.icon}"></i>
                    <span>${project.category}</span>
                </div>
                <div>
                    <span class="tag">${project.category}</span>
                    <h3>${project.title}</h3>
                    ${project.association ? `<small class="project-association">${project.association}</small>` : ""}
                    <p>${project.description}</p>
                </div>
                <ul>${tags}</ul>
                <span class="project-link">View project <i class="fa-solid fa-arrow-right"></i></span>
            </a>
        `;
    }).join("");
}

function renderProjectArchive() {
    const archive = document.querySelector("#all-projects-list");
    const projects = window.PORTFOLIO_PROJECTS;
    if (!archive || !projects) return;

    archive.innerHTML = projects.map((project, index) => {
        const tags = project.tags.map((tag) => `<li>${tag}</li>`).join("");
        const outcomes = (project.outcomes || []).map((item) => `<li>${item}</li>`).join("");
        return `
            <article class="archive-project-card reveal ${project.theme}">
                <div class="archive-project-index">${String(index + 1).padStart(2, "0")}</div>
                <div class="archive-project-main">
                    <span class="tag">${project.category}</span>
                    <h2>${project.title}</h2>
                    ${project.association ? `<small class="project-association">${project.association}</small>` : ""}
                    <p>${project.details || project.description}</p>
                    <ul class="subject-list">${tags}</ul>
                </div>
                <div class="archive-project-side">
                    <i class="${project.icon}"></i>
                    <h3>Project Focus</h3>
                    <ul>${outcomes}</ul>
                    <a class="project-link" href="${project.link}" target="_blank" rel="noreferrer">Open project <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </article>
        `;
    }).join("");
}

function renderSocialPosts() {
    const postList = document.querySelector("#social-posts-list");
    const posts = window.SOCIAL_WORK_POSTS;
    if (!postList || !posts) return;

    postList.innerHTML = posts.map((post, index) => `
        <article class="post-card reveal" id="post-${index + 1}">
            <figure class="post-image" data-fallback="${post.category}">
                <img src="${post.image}" alt="${post.title}">
            </figure>
            <div class="post-copy">
                <span class="tag">${post.category}</span>
                <time datetime="${post.date}">${formatPostDate(post.date)}</time>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <details>
                    <summary>Read More</summary>
                    <p>${post.content}</p>
                </details>
            </div>
        </article>
    `).join("");
}

function formatPostDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateValue;
    return date.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" });
}

function renderGallery() {
    const preview = document.querySelector("#gallery-preview-list");
    const full = document.querySelector("#full-gallery-list");
    const gallery = window.PORTFOLIO_GALLERY;
    if (!gallery) return;

    if (preview) {
        preview.innerHTML = gallery.slice(0, 5).map(createGalleryItem).join("");
    }

    if (full) {
        full.innerHTML = gallery.map(createGalleryItem).join("");
    }
}

function getGalleryCategories(gallery) {
    return [...new Map(gallery.map((item) => [item.category, item.categoryLabel || formatCategory(item.category)])).entries()]
        .slice(0, 5)
        .map(([key, label]) => ({ key, label }));
}

function formatCategory(category) {
    return category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function createGalleryCategorySlider(category, gallery) {
    const items = gallery.filter((item) => item.category === category.key);
    const slides = [...items, ...items].map((item) => `
        <figure class="gallery-slide" data-fallback="${item.title}">
            <img src="${item.src}" alt="${item.title}">
            <figcaption>${item.title}</figcaption>
        </figure>
    `).join("");

    return `
        <a class="gallery-category-card reveal" href="gallery.html?category=${category.key}" data-category="${category.key}">
            <div class="gallery-category-head">
                <span>${category.label}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
            <div class="gallery-slider-track">${slides}</div>
        </a>
    `;
}

function createGalleryItem(item) {
    return `
        <figure class="photo-slot reveal" data-category="${item.category}" data-fallback="${item.title}">
            <img src="${item.src}" alt="${item.title}">
            <figcaption>${item.title}</figcaption>
        </figure>
    `;
}

function setupNavigation() {
    const nav = document.querySelector(".site-nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll(".nav-link");

    menuToggle?.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuToggle?.setAttribute("aria-expanded", "false");
            if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

function setupTabs() {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const splitExperience = document.querySelector(".experience-split");

    if (splitExperience) {
        window.selectPortfolioTab = () => {};
        return;
    }

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => selectTab(button.dataset.tab));
    });

    function selectTab(targetId) {
        tabButtons.forEach((item) => {
            const isActive = item.dataset.tab === targetId;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-selected", String(isActive));
        });

        tabPanels.forEach((panel) => {
            const isActive = panel.id === targetId;
            panel.classList.toggle("active", isActive);
            panel.hidden = !isActive;
        });
    }

    window.selectPortfolioTab = selectTab;
}

function setupRoleTabLinks() {
    document.querySelectorAll("[data-select-tab]").forEach((link) => {
        link.addEventListener("click", () => {
            const tabId = link.dataset.selectTab;
            setTimeout(() => window.selectPortfolioTab?.(tabId), 120);
        });
    });
}

function setupExperienceShowMore() {
    document.querySelectorAll("[data-experience-more]").forEach((button) => {
        button.addEventListener("click", () => {
            const list = button.closest(".timeline-line");
            const isOpen = list?.classList.toggle("show-all");
            if (isOpen) {
                list.querySelectorAll(".timeline-extra").forEach((card) => card.classList.add("visible"));
            }
            button.innerHTML = isOpen
                ? 'Show Less <i class="fa-solid fa-arrow-up"></i>'
                : 'Show More <i class="fa-solid fa-arrow-down"></i>';
        });
    });
}

function setupGalleryFilters() {
    const galleryFilters = document.querySelectorAll(".gallery-filter");
    const galleryItems = document.querySelectorAll(".photo-slot[data-category]");
    const query = new URLSearchParams(window.location.search);
    const selectedCategory = query.get("category");

    function applyGalleryFilter(filter, activeButton) {
        galleryFilters.forEach((item) => item.classList.toggle("active", item === activeButton || item.dataset.filter === filter));
        galleryItems.forEach((item) => {
            const shouldShow = filter === "all" || item.dataset.category === filter;
            item.classList.toggle("hidden", !shouldShow);
        });
    }

    galleryFilters.forEach((button) => {
        button.addEventListener("click", () => applyGalleryFilter(button.dataset.filter, button));
    });

    if (selectedCategory) {
        const activeButton = [...galleryFilters].find((button) => button.dataset.filter === selectedCategory);
        applyGalleryFilter(selectedCategory, activeButton);
    }
}

function setupOptionalImages() {
    document.querySelectorAll(".photo-slot img").forEach((image) => {
        if (image.complete && image.naturalWidth === 0) {
            image.closest("figure")?.classList.add("no-image");
        }

        image.addEventListener("error", () => {
            image.closest("figure")?.classList.add("no-image");
        });
    });

    document.querySelectorAll(".post-image img").forEach((image) => {
        if (image.complete && image.naturalWidth === 0) {
            image.closest("figure")?.classList.add("no-image");
        }

        image.addEventListener("error", () => {
            image.closest("figure")?.classList.add("no-image");
        });
    });

    document.querySelectorAll(".gallery-slide img").forEach((image) => {
        if (image.complete && image.naturalWidth === 0) {
            image.closest("figure")?.classList.add("no-image");
        }

        image.addEventListener("error", () => {
            image.closest("figure")?.classList.add("no-image");
        });
    });

    document.querySelectorAll(".story-image img").forEach((image) => {
        if (image.complete && image.naturalWidth === 0) {
            image.closest("figure")?.classList.add("no-image");
        }

        image.addEventListener("error", () => {
            image.closest("figure")?.classList.add("no-image");
        });
    });

}

function setupReveal() {
    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
}

function setupActiveNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main > .section-anchor");
    setExternalActiveNavigation(navLinks);
    if (!sections.length) return;

    const activeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => activeObserver.observe(section));
}

function setExternalActiveNavigation(navLinks) {
    const path = window.location.pathname.replace(/\\/g, "/").toLowerCase();
    let activeTarget = "";

    if (path.endsWith("/projects.html") || path.endsWith("projects.html")) {
        activeTarget = "projects.html";
    } else if (path.endsWith("/gallery.html") || path.endsWith("gallery.html")) {
        activeTarget = "gallery.html";
    } else if (path.includes("/services/")) {
        activeTarget = "#services";
    } else if (path.endsWith("/social-work.html") || path.endsWith("social-work.html") || path.endsWith("/nepali-blood-donors.html") || path.endsWith("nepali-blood-donors.html")) {
        activeTarget = "#about";
    }

    if (!activeTarget) return;

    navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        link.classList.toggle("active", href.endsWith(activeTarget) || href.includes(activeTarget));
    });
}
