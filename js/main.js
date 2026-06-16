/**
 * main.js - Funcționalități comune Clean Pro
 * Meniu responsive, smooth scroll, back to top, active nav
 */

(function () {
  "use strict";

  /* Meniu responsive - închidere la click pe link (mobil) */
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  /* Active state pe pagina curentă */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* Smooth scroll pentru ancore interne */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector(".navbar")?.offsetHeight || 76;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  /* Buton Back to Top */
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Counter animat (folosit pe index și about) */
  function animateCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute("data-counter"), 10);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const progress = Math.min((now - start) / duration, 1);
              const value = Math.floor(progress * target);
              el.textContent = value.toLocaleString("ro-RO");
              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                el.textContent = target.toLocaleString("ro-RO");
              }
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(function (c) {
      observer.observe(c);
    });
  }

  animateCounters();

  /* Fade-in la scroll pentru secțiuni */
  const fadeSections = document.querySelectorAll(".fade-in-section");
  if (fadeSections.length) {
    const fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeSections.forEach(function (s) {
      fadeObserver.observe(s);
    });
  }

  /* Slider recenzii - reviews.html */
  const reviewSlides = document.querySelectorAll(".review-slide");
  const prevBtn = document.getElementById("reviewPrev");
  const nextBtn = document.getElementById("reviewNext");
  let currentSlide = 0;

  function showSlide(index) {
    if (!reviewSlides.length) return;
    reviewSlides.forEach(function (s) {
      s.classList.remove("active");
    });
    currentSlide = (index + reviewSlides.length) % reviewSlides.length;
    reviewSlides[currentSlide].classList.add("active");
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      showSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      showSlide(currentSlide + 1);
    });
  }

  /* Auto-play slider recenzii */
  if (reviewSlides.length > 1) {
    setInterval(function () {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  /* Tabs pachete - packages.html */
  const packageTabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
  packageTabButtons.forEach(function (btn) {
    btn.addEventListener("shown.bs.tab", function () {
      /* Bootstrap gestionează tabs; hook pentru extensii viitoare */
    });
  });
})();
