/**
 * gallery.js - Galerie Before/After (index.html, services.html)
 */

(function () {
  "use strict";

  const galleryItems = document.querySelectorAll(".gallery-ba[data-gallery]");
  const modalEl = document.getElementById("galleryModal");

  if (!galleryItems.length || !modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  const modalImg = document.getElementById("galleryModalImg");
  const modalTitle = document.getElementById("galleryModalTitle");
  const modalDesc = document.getElementById("galleryModalDesc");
  const thumbsContainer = document.getElementById("galleryThumbs");

  let currentIndex = 0;
  const items = Array.from(galleryItems).map(function (el) {
    return {
      before: el.getAttribute("data-before"),
      after: el.getAttribute("data-after"),
      title: el.getAttribute("data-title") || "Rezultat curățenie",
      desc: el.getAttribute("data-desc") || "",
    };
  });

  function renderThumbs() {
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = "";
    items.forEach(function (item, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thumb-btn" + (i === currentIndex ? " active" : "");
      btn.innerHTML =
        '<img src="' +
        item.before +
        '" alt="Miniatură ' +
        (i + 1) +
        '" width="80" height="60">';
      btn.addEventListener("click", function () {
        showItem(i);
      });
      thumbsContainer.appendChild(btn);
    });
  }

  function showItem(index) {
    currentIndex = index;
    const item = items[index];
    if (modalImg) {
      modalImg.src = item.after;
      modalImg.alt = "După curățenie - " + item.title;
    }
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalDesc) modalDesc.textContent = item.desc;

    const thumbs = thumbsContainer?.querySelectorAll(".thumb-btn");
    thumbs?.forEach(function (t, i) {
      t.classList.toggle("active", i === index);
    });
  }

  galleryItems.forEach(function (el, index) {
    el.addEventListener("click", function () {
      currentIndex = index;
      renderThumbs();
      showItem(index);
      modal.show();
    });

    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
      }
    });
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Deschide galeria: " + (el.getAttribute("data-title") || ""));
  });

  /* Toggle before/after în modal */
  const toggleBtn = document.getElementById("galleryToggle");
  let showingAfter = true;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const item = items[currentIndex];
      showingAfter = !showingAfter;
      if (modalImg) {
        modalImg.src = showingAfter ? item.after : item.before;
        modalImg.alt = (showingAfter ? "După" : "Înainte") + " - " + item.title;
      }
      toggleBtn.textContent = showingAfter ? "Arată ÎNAINTE" : "Arată DUPĂ";
    });
  }

  const prevModal = document.getElementById("galleryPrev");
  const nextModal = document.getElementById("galleryNext");

  if (prevModal) {
    prevModal.addEventListener("click", function () {
      showItem((currentIndex - 1 + items.length) % items.length);
      showingAfter = true;
      if (toggleBtn) toggleBtn.textContent = "Arată ÎNAINTE";
    });
  }

  if (nextModal) {
    nextModal.addEventListener("click", function () {
      showItem((currentIndex + 1) % items.length);
      showingAfter = true;
      if (toggleBtn) toggleBtn.textContent = "Arată ÎNAINTE";
    });
  }
})();
