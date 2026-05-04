const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const nextState = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", nextState);
    document.body.classList.toggle("is-menu-open", nextState);
    menuButton.setAttribute("aria-expanded", String(nextState));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      document.body.classList.remove("is-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-slots]").forEach((group) => {
  const summary = document.querySelector(group.dataset.summary || "");

  group.addEventListener("click", (event) => {
    const slot = event.target.closest(".slot:not(.slot--busy)");

    if (!slot) {
      return;
    }

    group.querySelectorAll(".slot").forEach((item) => item.classList.remove("is-selected"));
    slot.classList.add("is-selected");

    if (summary) {
      summary.textContent = `Выбрано окно: ${slot.textContent.trim()}. На сайте здесь будет переход к записи.`;
    }
  });
});

const canHover = window.matchMedia("(hover: hover)").matches;

if (canHover) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 8).toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "42%");
    });
  });
}
