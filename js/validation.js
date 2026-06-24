/**
 * validation.js - Validare + salvare formular
 * Local: PHP + MySQL (XAMPP)
 * Netlify: Netlify Forms (salvare în panoul Netlify)
 */

(function () {
  "use strict";

  const form = document.getElementById("offerForm");
  if (!form) return;

  const successAlert = document.getElementById("formSuccess");
  const errorAlert = document.getElementById("formError");
  const errorText = document.getElementById("formErrorText");
  const submitBtn = form.querySelector('button[type="submit"]');

  function isLocal() {
    var h = window.location.hostname;
    return h === "localhost" || h === "127.0.0.1";
  }

  function isNetlify() {
    return window.location.hostname.includes("netlify.app");
  }

  function getBodyString() {
    return new URLSearchParams(new FormData(form)).toString();
  }

  function postUrlencoded(url, bodyString) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: bodyString,
    }).then(function (response) {
      return response.text().then(function (text) {
        var data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = {
            success: false,
            message:
              "Serverul a returnat răspuns invalid (HTTP " +
              response.status +
              ").",
          };
        }
        return { ok: response.ok, status: response.status, data: data };
      });
    });
  }

  function submitNetlifyForms(bodyString) {
    var params = new URLSearchParams(bodyString);
    params.set("form-name", "offer");
    var urls = ["/contact.html", "/"];

    function attempt(index) {
      if (index >= urls.length) {
        return Promise.resolve({
          ok: false,
          data: {
            success: false,
            message:
              "Formularul Netlify nu este activ. În Netlify: Forms → Enable form detection → redeploy.",
          },
        });
      }

      return fetch(urls[index], {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: params.toString(),
      })
        .then(function (response) {
          if (response.ok || response.status === 302) {
            return {
              ok: true,
              data: { success: true, message: "Cererea a fost înregistrată." },
            };
          }
          return attempt(index + 1);
        })
        .catch(function () {
          return attempt(index + 1);
        });
    }

    return attempt(0);
  }

  function submitForm(bodyString) {
    if (isLocal()) {
      return postUrlencoded("php/submit_offer.php", bodyString);
    }

    if (isNetlify()) {
      return submitNetlifyForms(bodyString);
    }

    return Promise.resolve({
      ok: false,
      data: { success: false, message: "Server indisponibil." },
    });
  }

  const fields = {
    name: {
      el: document.getElementById("clientName"),
      validate: function (v) {
        if (!v.trim()) return "Numele este obligatoriu.";
        if (v.trim().length < 2) return "Numele trebuie să aibă minim 2 caractere.";
        if (!/^[a-zA-ZăâîșțĂÂÎȘȚа-яА-ЯёЁ\s\-']+$/.test(v.trim()))
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

  function hideAlerts() {
    successAlert?.classList.add("d-none");
    errorAlert?.classList.add("d-none");
  }

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
    hideAlerts();

    let isValid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) isValid = false;
    });

    if (!isValid) {
      const firstInvalid = form.querySelector(".is-invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const bodyString = getBodyString();
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2"></span>Se trimite...';
    }

    submitForm(bodyString)
      .then(function (result) {
        if (result.data && result.data.success) {
          if (successAlert) {
            successAlert.classList.remove("d-none");
            successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          form.reset();
          Object.keys(fields).forEach(function (key) {
            fields[key].el.classList.remove("is-valid", "is-invalid");
          });
        } else if (errorAlert && errorText) {
          errorText.textContent = (result.data && result.data.message) || "Eroare la trimitere.";
          errorAlert.classList.remove("d-none");
          errorAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      })
      .catch(function () {
        if (errorAlert && errorText) {
          var msg = "Nu s-a putut trimite cererea. ";
          if (window.location.protocol === "file:") {
            msg +=
              "Nu deschideți fișierul direct! Rulați start-xampp.bat și accesați http://localhost/CleanPro/contact.html";
          } else if (isLocal()) {
            msg +=
              "Porniți XAMPP (Apache + MySQL). Dublu-click pe start-xampp.bat din folderul proiectului.";
          } else {
            msg += "Verificați conexiunea la server.";
          }
          errorText.textContent = msg;
          errorAlert.classList.remove("d-none");
          errorAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      });
  });
})();
