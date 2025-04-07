const sections = [
  "header",
  "services",
  "testimonials",
  "contact",
  "join",
  "admin-dashboard",
  "footer"
];

// 🧩 Load Each Section Into #main-content
const loadSections = async () => {
  const container = document.getElementById("main-content");

  for (const section of sections) {
    try {
      const res = await fetch(`sections/${section}.html`);
      if (!res.ok) throw new Error(`❌ Failed to load section: ${section}`);

      const html = await res.text();
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      wrapper.classList.add("animate__animated", "animate__fadeInUp");
      container.appendChild(wrapper);
    } catch (err) {
      console.error(`🚫 Error loading '${section}':`, err);
    }
  }

  // ⏱️ Ensure DOM is ready before login script runs
  setTimeout(initLogin, 500);
};

// 🔐 Handle Login Form Submission
const initLogin = () => {
  const loginForm = document.querySelector("#login form");
  if (!loginForm) {
    console.warn("⚠️ Login form not found.");
    return;
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!username || !password) {
      alert("⚠️ Both fields are required.");
      return;
    }

    // 🧪 Basic Admin Check (for demo purpose)
    if (username === "admin" && password === "karmyug123") {
      alert("✅ Login successful!");
      window.location.href = "admin-dashboard.html";
    } else {
      alert("❌ Invalid credentials. Please try again.");
    }
  });
};

// 🚀 Start Everything After DOM Loads
document.addEventListener("DOMContentLoaded", loadSections);
