

(function () {
  "use strict";

  const serviceType = document.getElementById("calcServiceType");
  const surfaceArea = document.getElementById("calcSurface");
  const calcBtn = document.getElementById("calcBtn");
  const resultEl = document.getElementById("calcResult");
  const resultDetails = document.getElementById("calcDetails");

  if (!serviceType || !surfaceArea || !calcBtn) return;

  /* Prețuri per m² (MDL) după tip serviciu */
  const rates = {
    residential: { rate: 8, label: "Curățenie rezidențială" },
    office: { rate: 12, label: "Curățenie birouri" },
    postconstruction: { rate: 18, label: "Post-construcție" },
    industrial: { rate: 15, label: "Curățenie industrială" },
  };

  function calculate() {
    const type = serviceType.value;
    const area = parseFloat(surfaceArea.value);

    if (!type) {
      showError("Selectați tipul de serviciu.");
      return;
    }

    if (isNaN(area) || area <= 0) {
      showError("Introduceți o suprafață validă (m²).");
      surfaceArea.classList.add("is-invalid");
      return;
    }

    surfaceArea.classList.remove("is-invalid");
    const info = rates[type];
    const total = Math.round(info.rate * area);
    const minPrice = 150;
    const finalPrice = Math.max(total, minPrice);

    resultEl.textContent = finalPrice.toLocaleString("ro-RO") + " MDL";
    resultDetails.textContent =
      info.label +
      " · " +
      area +
      " m² × " +
      info.rate +
      " MDL/m²" +
      (finalPrice === minPrice ? " (preț minim aplicat)" : "");
    resultEl.parentElement.classList.add("animate__animated", "animate__pulse");
    setTimeout(function () {
      resultEl.parentElement.classList.remove("animate__animated", "animate__pulse");
    }, 600);
  }

  function showError(msg) {
    resultEl.textContent = "—";
    resultDetails.textContent = msg;
    resultDetails.style.color = "#ffcdd2";
  }

  calcBtn.addEventListener("click", calculate);

  surfaceArea.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  });
})();
