
(function () {
  "use strict";

  const form = document.getElementById("offerForm");
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById("clientName"),
      validate: function (v) {
        if (!v.trim()) return "Numele este obligatoriu.";
        if (v.trim().length < 2) return "Numele trebuie să aibă minim 2 caractere.";
        if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s\-']+$/.test(v.trim()))
          return "Numele conține caractere nevalide.";
        return "";
      },
    },
    phone: {
      el: document.getElementById("clientPhone"),
      validate: function (v) {
        if (!v.trim()) return "Telefonul este obligatoriu.";
        const cleaned = v.replace(/[\s\-\(\)]/g, "");
        if (cleaned.length > 12) return "Telefonul nu poate depăși 12 caractere.";
        if (!/^\+373[0-9]{8}$/.test(cleaned))
          return "Format: +373 și 8 cifre (12 caractere, ex: +37369123456).";
        return "";
      },
    },
    email: {
      el: document.getElementById("clientEmail"),
      validate: function (v) {
        if (!v.trim()) return "Emailul este obligatoriu.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
          return "Introduceți o adresă email validă.";
        return "";
      },
    },
    serviceType: {
      el: document.getElementById("serviceType"),
      validate: function (v) {
        if (!v || v === "") return "Selectați tipul de serviciu.";
        return "";
      },
    },
    area: {
      el: document.getElementById("surfaceArea"),
      validate: function (v) {
        if (!v.trim()) return "Suprafața este obligatorie.";
        const num = parseFloat(v);
        if (isNaN(num) || num <= 0) return "Suprafața trebuie să fie un număr pozitiv.";
        if (num > 10000) return "Suprafața pare prea mare. Verificați valoarea.";
        return "";
      },
    },
    frequency: {
      el: document.getElementById("frequency"),
      validate: function (v) {
        if (!v || v === "") return "Selectați frecvența.";
        return "";
      },
    },
    message: {
      el: document.getElementById("clientMessage"),
      validate: function (v) {
        if (v.trim().length > 500) return "Mesajul nu poate depăși 500 de caractere.";
        return "";
      },
    },
  };

  function showError(field, message) {
    field.el.classList.add("is-invalid");
    field.el.classList.remove("is-valid");
    let feedback = field.el.parentElement.querySelector(".invalid-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      field.el.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
  }

  function showSuccess(field) {
    field.el.classList.remove("is-invalid");
    field.el.classList.add("is-valid");
    const feedback = field.el.parentElement.querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = "";
  }

  function validateField(key) {
    const field = fields[key];
    const error = field.validate(field.el.value);
    if (error) {
      showError(field, error);
      return false;
    }
    showSuccess(field);
    return true;
  }

  Object.keys(fields).forEach(function (key) {
    const field = fields[key];
    field.el.addEventListener("blur", function () {
      validateField(key);
    });
    field.el.addEventListener("input", function () {
      if (field.el.classList.contains("is-invalid")) {
        validateField(key);
      }
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) isValid = false;
    });

    if (isValid) {
      const successAlert = document.getElementById("formSuccess");
      if (successAlert) {
        successAlert.classList.remove("d-none");
        form.reset();
        Object.keys(fields).forEach(function (key) {
          fields[key].el.classList.remove("is-valid", "is-invalid");
        });
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
    }
  });
})();
