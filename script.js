const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll("#project-grid .card");

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.filter;

      filterButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = target === "all" || category === target;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const observedSections = document.querySelectorAll("main section[id], footer[id]");

if (navLinks.length && observedSections.length) {
  const navMap = new Map(
    Array.from(navLinks).map((link) => [link.getAttribute("href")?.slice(1), link])
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const id = visible.target.id;
      navLinks.forEach((link) => link.classList.remove("is-active"));
      navMap.get(id)?.classList.add("is-active");
    },
    {
      threshold: [0.35, 0.6],
      rootMargin: "-20% 0px -45% 0px",
    }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

if (lightbox && lightboxImage && lightboxClose && lightboxTriggers.length) {
  const openLightbox = (source, altText) => {
    lightboxImage.setAttribute("src", source);
    lightboxImage.setAttribute("alt", altText || "Forstørret prosjektbilde");
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.setAttribute("src", "");
    document.body.style.overflow = "";
  };

  lightboxTriggers.forEach((image) => {
    image.addEventListener("click", () => {
      openLightbox(image.getAttribute("src"), image.getAttribute("alt"));
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

const siteUrlLinks = document.querySelectorAll("[data-site-url]");

if (siteUrlLinks.length) {
  const pageUrl = window.location.href;

  siteUrlLinks.forEach((link) => {
    link.setAttribute("href", pageUrl);
    link.textContent = pageUrl;
  });
}
