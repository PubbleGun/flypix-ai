(() => {
  const revealNodes = [...document.querySelectorAll("[data-reveal]")];
  const sectionIndexes = new Map();
  revealNodes.forEach((node) => {
    const section = node.closest("section") || node.parentElement || node;
    const index = sectionIndexes.get(section) || 0;
    node.style.setProperty("--reveal-delay", `${Math.min(index * 95, 380)}ms`);
    sectionIndexes.set(section, index + 1);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.13 },
    );
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }

  const comparison = document.querySelector(".comparison");
  if (comparison) {
    const top = comparison.querySelector(".comparison-top");
    const line = comparison.querySelector(".comparison-line");
    let dragging = false;
    const update = (clientX) => {
      const rect = comparison.getBoundingClientRect();
      const position = Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100));
      top.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
      line.style.left = `${position}%`;
      comparison.setAttribute("aria-valuenow", Math.round(position));
    };
    comparison.addEventListener("pointerdown", (event) => {
      dragging = true;
      comparison.setPointerCapture(event.pointerId);
      update(event.clientX);
    });
    comparison.addEventListener("pointermove", (event) => {
      if (dragging) update(event.clientX);
    });
    comparison.addEventListener("pointerup", (event) => {
      dragging = false;
      if (comparison.hasPointerCapture(event.pointerId)) {
        comparison.releasePointerCapture(event.pointerId);
      }
    });
  }

  const wireCarousel = (sectionSelector, carouselSelector, distance) => {
    const section = document.querySelector(sectionSelector);
    const carousel = section?.querySelector(carouselSelector);
    const buttons = section?.querySelectorAll(".carousel-controls button");
    if (!carousel || !buttons || buttons.length < 2) return;
    buttons[0].addEventListener("click", () => carousel.scrollBy({ left: -distance, behavior: "smooth" }));
    buttons[1].addEventListener("click", () => carousel.scrollBy({ left: distance, behavior: "smooth" }));
  };
  wireCarousel(".industries-section", ".industry-carousel", 380);
  wireCarousel(".testimonials-section", ".testimonial-carousel", 380);

  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".site-header nav");
  menuButton?.addEventListener("click", () => {
    navigation?.classList.toggle("is-open");
    menuButton.setAttribute(
      "aria-expanded",
      navigation?.classList.contains("is-open") ? "true" : "false",
    );
  });
})();
