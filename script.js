document.addEventListener("DOMContentLoaded", () => {
    const year = document.querySelector("#year");
    if (year) year.textContent = new Date().getFullYear();

    renderExperience();
    renderServices();
    renderProjects();
    renderGallery();

    setupNavigation();
    setupTabs();
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
    if (softwareList) softwareList.innerHTML = experience.software.map(createExperienceCard).join("");
    if (teachingList) teachingList.innerHTML = experience.teaching.map(createExperienceCard).join("");
}

function createExperienceCard(item) {
    const tags = item.tags.map((tag) => `<li>${tag}</li>`).join("");
    return `
        <article class="timeline-card reveal">
            <span class="timeline-date">${item.org} | ${item.period}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <ul class="subject-list">${tags}</ul>
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

    projectList.innerHTML = projects.map((project, index) => {
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
                    <p>${project.description}</p>
                </div>
                <ul>${tags}</ul>
                <span class="project-link">View project <i class="fa-solid fa-arrow-right"></i></span>
            </a>
        `;
    }).join("");
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

function setupGalleryFilters() {
    const galleryFilters = document.querySelectorAll(".gallery-filter");
    const galleryItems = document.querySelectorAll(".photo-slot[data-category]");

    galleryFilters.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            galleryFilters.forEach((item) => item.classList.toggle("active", item === button));
            galleryItems.forEach((item) => {
                const shouldShow = filter === "all" || item.dataset.category === filter;
                item.classList.toggle("hidden", !shouldShow);
            });
        });
    });
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
