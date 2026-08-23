/* =========================================================
   Visual Vertex Technology Company — main.js
   Small, purposeful behaviors only:
   - Mobile navigation
   - Sticky header state on scroll
   - Smooth-scroll for on-page anchor links
   - Active navigation link on scroll
   - Animated stat counters
   - Scroll-reveal for cards/sections
   - Back-to-top button
   - Contact form UX (client-side only)
   - Portfolio filters (portfolio.html only)
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  /* -----------------------------------------------------
     Mobile navigation
  ----------------------------------------------------- */
  let overlay = document.querySelector(".nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    body.appendChild(overlay);
  }

  const closeMenu = () => {
    navLinks?.classList.remove("active");
    menuBtn?.classList.remove("active");
    menuBtn?.setAttribute("aria-expanded", "false");
    overlay.classList.remove("show");
    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    navLinks?.classList.add("active");
    menuBtn?.classList.add("active");
    menuBtn?.setAttribute("aria-expanded", "true");
    overlay.classList.add("show");
    body.classList.add("menu-open");
  };

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.contains("active") ? closeMenu() : openMenu();
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) closeMenu();
    });
  }

  /* -----------------------------------------------------
     Sticky header
  ----------------------------------------------------- */
  const onScrollHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* -----------------------------------------------------
     Smooth scroll for in-page anchors
  ----------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* -----------------------------------------------------
     Active navigation link on scroll
  ----------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id], #hero[id]");
  // Only same-page fragment links (e.g. "#about") participate in scroll
  // highlighting — cross-page links (e.g. "portfolio.html") are left as-is.
  const navAnchors = Array.from(document.querySelectorAll(".nav-links a")).filter((link) =>
    link.getAttribute("href").startsWith("#")
  );

  if (sections.length && navAnchors.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* -----------------------------------------------------
     Animated stat counters
  ----------------------------------------------------- */
  const counters = document.querySelectorAll(".stat-card h2[data-target]");

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          const decimals = el.dataset.target.includes(".") ? 1 : 0;
          const duration = 1400;
          const start = performance.now();

          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = value.toFixed(decimals) + suffix;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = target.toFixed(decimals) + suffix;
            }
          };

          requestAnimationFrame(step);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* -----------------------------------------------------
     Scroll reveal
  ----------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".about-card, .service-card, .portfolio-card, .mission-card, .contact-item, .why-item, .stat-card"
  );

  if (revealTargets.length) {
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* -----------------------------------------------------
     Back to top
  ----------------------------------------------------- */
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("show", window.scrollY > 480);
      },
      { passive: true }
    );

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -----------------------------------------------------
     Contact form
     Delivers to visualvertextechnologycompany@gmail.com via
     FormSubmit (https://formsubmit.co) — a free form-to-email
     relay that needs no account or API key. The form's `action`
     attribute in index.html already points at it; this handler
     just submits it with fetch so the page doesn't reload and
     the visitor gets an inline success/error message instead.

     IMPORTANT ONE-TIME STEP: the very first message sent from
     this form makes FormSubmit email a confirmation link to
     visualvertextechnologycompany@gmail.com. Someone has to open
     that email and click "Activate Form" once — until then,
     FormSubmit holds the message instead of delivering it. Every
     submission after that activation is delivered automatically.
  ----------------------------------------------------- */
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    const note = document.createElement("p");
    note.className = "form-note";
    contactForm.appendChild(note);

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitLabel = submitBtn?.querySelector(".btn-label");
    const defaultLabel = submitLabel ? submitLabel.textContent : "";

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        note.textContent = "Please fill in your name, email, and message.";
        note.className = "form-note error";
        contactForm.reportValidity();
        return;
      }

      // Honeypot: if this hidden field got filled in, silently drop it.
      const honey = contactForm.querySelector('input[name="_honey"]');
      if (honey && honey.value) {
        note.textContent = "Thanks — your message has been sent.";
        note.className = "form-note success";
        contactForm.reset();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        if (submitLabel) submitLabel.textContent = "Sending...";
      }
      note.textContent = "";
      note.className = "form-note";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(contactForm),
        });

        if (response.ok) {
          note.textContent = "Thanks — your message has been sent. We'll get back to you shortly.";
          note.className = "form-note success";
          contactForm.reset();
        } else {
          throw new Error("Request failed");
        }
      } catch (err) {
        note.textContent =
          "Sorry, something went wrong sending your message. Please try again, or email us directly at visualvertextechnologycompany@gmail.com.";
        note.className = "form-note error";
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (submitLabel) submitLabel.textContent = defaultLabel;
        }
      }
    });
  }

  /* -----------------------------------------------------
     Portfolio filters (portfolio.html)
  ----------------------------------------------------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card[data-category]");

  if (filterButtons.length && portfolioCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        portfolioCards.forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.style.display = match ? "" : "none";
        });
      });
    });
  }
});
