// Sinde Shobha Portfolio - ES6+ JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector("#themeToggle");
  const themeText = document.querySelector(".theme-text");
  const currentYear = document.querySelector("#currentYear");
  const backToTop = document.querySelector("#backToTop");

  // ---------------- Theme switching ----------------
  const savedTheme = localStorage.getItem("portfolio-theme");

  const setTheme = (darkMode) => {
    body.classList.toggle("dark-mode", darkMode);
    themeToggle.setAttribute("aria-pressed", String(darkMode));
    themeToggle.setAttribute(
      "aria-label",
      darkMode ? "Switch to light mode" : "Switch to dark mode"
    );
    themeToggle.innerHTML = darkMode
      ? '<i class="bi bi-sun-fill" aria-hidden="true"></i><span class="theme-text">Light</span>'
      : '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i><span class="theme-text">Dark</span>';
  };

  setTheme(savedTheme === "dark");

  themeToggle.addEventListener("click", () => {
    const darkMode = !body.classList.contains("dark-mode");
    setTheme(darkMode);
    localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  });

  // ---------------- Dynamic year ----------------
  currentYear.textContent = new Date().getFullYear();

  // ---------------- Project filtering ----------------
  const projectButtons = document.querySelectorAll(".project-filter");
  const projectItems = document.querySelectorAll(".project-item");

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      projectButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("active", active);
        btn.classList.toggle("btn-primary", active);
        btn.classList.toggle("btn-outline-primary", !active);
      });

      projectItems.forEach((item) => {
        const matches = selected === "all" || item.dataset.category === selected;
        item.classList.toggle("item-hidden", !matches);
      });
    });
  });

  // ---------------- Skill filtering ----------------
  const skillButtons = document.querySelectorAll(".skill-filter");
  const skillItems = document.querySelectorAll(".skill-item");

  skillButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.skill;

      skillButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("active", active);
        btn.classList.toggle("btn-primary", active);
        btn.classList.toggle("btn-outline-primary", !active);
      });

      skillItems.forEach((item) => {
        const matches = selected === "all" || item.dataset.category === selected;
        item.classList.toggle("item-hidden", !matches);
      });
    });
  });

  // ---------------- Contact form validation ----------------
  const form = document.querySelector("#contactForm");
  const alertBox = document.querySelector("#formAlert");

  const showAlert = (message, type) => {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    alertBox.classList.remove("d-none");
  };

  const validateField = (field) => {
    const valid = field.checkValidity();
    field.classList.toggle("is-valid", valid);
    field.classList.toggle("is-invalid", !valid);
    return valid;
  };

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [...form.querySelectorAll("input, textarea")];
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      showAlert("Please correct the highlighted fields and try again.", "danger");
      fields.find((field) => !field.checkValidity())?.focus();
      return;
    }

    // This is a front-end demonstration; no backend is connected.
    showAlert(
      "Thank you! Your message passed validation successfully. In a production site, it would now be sent to a server.",
      "success"
    );
    form.reset();
    fields.forEach((field) => field.classList.remove("is-valid", "is-invalid"));
  });

  // ---------------- Back-to-top button ----------------
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---------------- Active navigation ----------------
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  // Close mobile Bootstrap navbar after selecting a section
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.querySelector("#portfolioNav");
      if (nav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });
});
