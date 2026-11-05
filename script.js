// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Subtle reveal-on-scroll animation, with reduced-motion support.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Project enquiry: opens WhatsApp with the visitor's details pre-filled.
// The visitor reviews and sends the message themselves.
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const text = [
      "Hello Salaam Salaam Digital!",
      "",
      `My name is ${name}.`,
      `Email: ${email}`,
      `I'm interested in: ${service}`,
      "",
      "Project details:",
      message
    ].join("\n");

    const whatsappUrl = `https://wa.me/2349063320838?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (formStatus) {
      formStatus.textContent = "WhatsApp opened with your enquiry. Please review and send your message there.";
    }
  });
}

// Current year in the footer.
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();
