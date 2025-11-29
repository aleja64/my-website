// Navigation toggle for mobile
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // Close nav when clicking a link (mobile)
    navLinks.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        navLinks.classList.remove("open");
      }
    });
  }

  // Smooth scroll behavior for same-page anchors (if any)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Dynamic footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Contact form handler (no backend – just a UX helper)
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const phone = document.getElementById("phone")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !phone || !message) {
        formStatus.textContent = "Please fill in your name, WhatsApp number and message.";
        formStatus.style.color = "#7b2c39";
        return;
      }

      // Build a WhatsApp message string
      const text =
        `Enquiry from website:%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `WhatsApp: ${encodeURIComponent(phone)}%0A` +
        (document.getElementById("email")?.value
          ? `Email: ${encodeURIComponent(
              document.getElementById("email").value.trim()
            )}%0A`
          : "") +
        `%0ARequest:%0A${encodeURIComponent(message)}`;

      const waLink = `https://wa.me/60108801843?text=${text}`;

      // Open WhatsApp with pre-filled message
      window.open(waLink, "_blank");

      formStatus.textContent =
        "We are opening WhatsApp with your message. You can review and send it directly to us.";
      formStatus.style.color = "#555";

      contactForm.reset();
    });
  }
});


