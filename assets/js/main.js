document.addEventListener("DOMContentLoaded", () => {
  // API Configuration
  const API_BASE_URL = process.env.API_URL || window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://api.alidjebbari.com'; // Update with your production URL

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

  // Contact form
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("form-toast");

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast?.classList.remove("hidden");
        toast?.classList.add("flex");
        toast && (toast.textContent = "Message sent — I'll get back within 24 hours.");
        contactForm.reset();
        setTimeout(() => toast?.classList.add("hidden"), 4000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast?.classList.remove("hidden");
      toast && (toast.textContent = "Oops, message failed. Email me directly.");
      setTimeout(() => toast?.classList.add("hidden"), 4000);
      console.error("Contact form error", error);
    }
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

  // Currency converter with live rates
  const fxForm = document.getElementById("fx-form");
  const fxResult = document.getElementById("fx-result");

  fxForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!fxResult) return;
    
    const from = document.getElementById("fx-from")?.value || "USD";
    const to = document.getElementById("fx-to")?.value || "EUR";
    const amount = Number(document.getElementById("fx-amount")?.value || 0);
    
    if (!amount) return;

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await response.json();
      
      if (data.rates && data.rates[to]) {
        const converted = amount * data.rates[to];
        const time = new Date().toLocaleTimeString();
        
        fxResult.innerHTML = `
          <p class="text-lg font-semibold">${amount.toFixed(2)} ${from} → ${converted.toFixed(2)} ${to}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">Live rates from exchangerate-api.com • ${time}</p>
        `;
      } else {
        throw new Error("Currency not supported");
      }
    } catch (error) {
      fxResult.innerHTML = `
        <p class="text-sm text-red-600 dark:text-red-400">Unable to fetch rates. Please try again.</p>
      `;
      console.error("Currency converter error", error);
    }
  });

  // Current year in footer
  const yearEl = document.getElementById("current-year");
  yearEl && (yearEl.textContent = new Date().getFullYear());
});
