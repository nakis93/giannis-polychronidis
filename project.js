// === Theme init (copy from script.js) ===
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (userTheme === "dark" || (!userTheme && systemTheme)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}
// === End theme init ===

const projects = {
  "dashboard-ui": {
    title: "Dashboard UI for a B.I. application",
    subtitle: "Admin interface with analytics and charts",
    images: [
      "images/west1.png",
      "images/west2.png",
      "images/west3.png",
      "images/west4.png",
      "images/west5.png",
    ],
    description:
      "A modern admin dashboard built with Angular and Tailwind CSS. Includes dynamic data visualization, dark mode, and responsive layout.",
    tech: ["Angular", "Tailwind CSS", "Firebase", "Chart.js"],
    github: "https://github.com/yourusername/dashboard-ui",
    live: "https://dashboard-ui-demo.netlify.app",
  },
  "calendar-component": {
    title: "Calendar Component",
    subtitle: "Interactive calendar with multi-select & icons",
    images: ["images/pic1.jpg", "images/pic2.jpg", "images/pic3.jpg"],
    description:
      "A custom calendar component featuring multi-day selection, event icons, and responsive design. Built for admin tools.",
    tech: ["Angular", "TypeScript", "SCSS"],
    github: "https://github.com/yourusername/calendar-component",
  },
  "candidate-management": {
    title: "Candidate Management",
    subtitle: "Manage applications and interview stages",
    images: ["images/pic1.jpg", "images/pic2.jpg", "images/pic3.jpg"],
    description:
      "A dashboard for HR teams to manage job candidates, forms, and feedback. Features filtering, role-based views, and Firebase integration.",
    tech: ["Angular", "Tailwind", "Firebase", "RxJS"],
    github: "https://github.com/yourusername/candidate-dashboard",
  },
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const data = projects[id];

if (!data) {
  document.body.innerHTML =
    "<main class='text-center py-20'><h1 class='text-3xl font-bold'>Project not found 😢</h1><a href='index.html' class='text-indigo-500 hover:underline mt-4 block'>Back to portfolio</a></main>";
} else {
  // Set title and description as before
  document.getElementById("projectTitle").textContent = data.title;
  document.getElementById("projectSubtitle").textContent = data.subtitle;
  document.getElementById("projectDescription").textContent = data.description;

  // Technologies
  const techList = document.getElementById("projectTech");
  data.tech.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    techList.appendChild(li);
  });

  // Links
  const linksContainer = document.getElementById("projectLinks");
  if (data.live) {
    const liveLink = `<a href="${data.live}" target="_blank" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg mr-4">Live Demo</a>`;
    linksContainer.insertAdjacentHTML("beforeend", liveLink);
  }
  if (data.github) {
    const githubLink = `<a href="${data.github}" target="_blank" class="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">View Code</a>`;
    linksContainer.insertAdjacentHTML("beforeend", githubLink);
  }

  // === Carousel logic ===
  const carouselImage = document.getElementById("carouselImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("carouselDots");

  let currentIndex = 0;
  const images = data.images;

  // Populate dots
  images.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className =
      "w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 hover:bg-indigo-600 transition";
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  function updateCarousel() {
    carouselImage.src = images[currentIndex];
    carouselImage.alt = `${data.title} screenshot ${currentIndex + 1}`;

    // Update dots active state
    Array.from(dotsContainer.children).forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add("bg-indigo-600");
        dot.classList.remove("bg-gray-400", "dark:bg-gray-600");
      } else {
        dot.classList.remove("bg-indigo-600");
        dot.classList.add("bg-gray-400", "dark:bg-gray-600");
      }
    });
  }

  // Prev button
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  // Next button
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  updateCarousel();
}

function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = src;
  modal.classList.remove("hidden");
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.add("hidden");
}

document.getElementById("imageModal").addEventListener("click", (e) => {
  if (e.target.id === "imageModal") {
    closeImageModal();
  }
});
