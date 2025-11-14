document.addEventListener("DOMContentLoaded", () => {
  // Persisted dark mode toggle
  const toggle = document.getElementById("mode-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedPreference = localStorage.getItem("ali-portfolio-theme");

  if (storedPreference === "dark" || (!storedPreference && prefersDark)) {
    document.documentElement.classList.add("dark");
  }

  toggle?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("ali-portfolio-theme", mode);
  });

  // Project filtering
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-tech]");

  filterButtons.forEach((button) =>
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach((card) => {
        const techStack = card.dataset.tech?.split(",") || [];
        if (filter === "all" || techStack.includes(filter)) {
          card.classList.remove("hidden");
          card.classList.add("flex");
        } else {
          card.classList.add("hidden");
          card.classList.remove("flex");
        }
      });
    })
  );

  // Simple stat counter effect
  const counters = document.querySelectorAll("[data-count]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count || 0);
        const duration = 1200;
        const startTime = performance.now();

        const updateCount = (time) => {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target;
          }
        };

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => observer.observe(counter));

  // Contact form toast
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("form-toast");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    toast?.classList.remove("hidden");
    toast?.classList.add("flex");
    contactForm.reset();
    setTimeout(() => toast?.classList.add("hidden"), 4000);
  });

  // BMI calculator
  const bmiForm = document.getElementById("bmi-form");
  const bmiResult = document.getElementById("bmi-result");

  bmiForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const height = Number(document.getElementById("bmi-height")?.value || 0) / 100;
    const weight = Number(document.getElementById("bmi-weight")?.value || 0);
    if (!height || !weight) return;
    const bmi = weight / (height * height);
    let status = "Balanced";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi >= 25 && bmi < 30) status = "Elevated";
    else if (bmi >= 30) status = "High";

    bmiResult.innerHTML = `
      <p class="text-lg font-semibold">BMI: ${bmi.toFixed(1)}</p>
      <p class="text-sm text-gray-600 dark:text-gray-300">Status: ${status}</p>
      <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">*For educational use. Pair it with real medical advice.</p>
    `;
  });

  // Currency converter (static snapshot)
  const fxRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
    DZD: 134.5,
  };

  const fxForm = document.getElementById("fx-form");
  const fxResult = document.getElementById("fx-result");

  fxForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!fxResult) return;
    const from = document.getElementById("fx-from")?.value || "USD";
    const to = document.getElementById("fx-to")?.value || "EUR";
    const amount = Number(document.getElementById("fx-amount")?.value || 0);
    if (!amount || !fxRates[from] || !fxRates[to]) return;

    const usdValue = amount / fxRates[from];
    const converted = usdValue * fxRates[to];
    const time = new Date().toLocaleTimeString();

    fxResult.innerHTML = `
      <p class="text-lg font-semibold">${amount.toFixed(2)} ${from} → ${converted.toFixed(2)} ${to}</p>
      <p class="text-xs text-gray-500 dark:text-gray-400">Rates last updated manually • ${time}</p>
    `;
  });

  // Current year in footer
  const yearEl = document.getElementById("current-year");
  yearEl && (yearEl.textContent = new Date().getFullYear());
});
