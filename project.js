const projects = {
  "west-bi": {
    title: "WEST B.I.",
    subtitle: "A backoffice B.I. app for WEST S.A., a marketing company.",
    images: [
      "images/west1.png",
      "images/west2.png",
      "images/west3.png",
      "images/west4.png",
      "images/west5.png",
    ],
    description:
      "A dashboard for creating and managing marketing campaigns, tracking leads, and generating reports.",
    tech: [
      "Angular 13",
      "Bootstrap",
      "Google Maps APIs",
      "Angular Material",
      "Angular Forms",
    ],
    github: "https://github.com/yourusername/dashboard-ui",
    live: "https://dashboard-ui-demo.netlify.app",
  },
  "wps-courier": {
    title: "WPS Courier App",
    subtitle: "A backoffice dashboard for West Postal Service (WPS).",
    images: [
      "images/wps1.png",
      "images/wps2.png",
      "images/wps3.png",
      "images/wps4.png",
      "images/wps5.png",
    ],
    description:
      "Features stuff management, courier live-tracking, order management, zone creation on Google Maps and role-based access.",
    tech: [
      "Angular 17 (Standalone components)",
      "Firebase (Firestore Database, Firebase Authentication)",
      "Tailwind",
      "Google Maps APIs",
      "RabbitMQ",
      "Chart.js",
      "Reactive Forms",
    ],
    github: "https://github.com/yourusername/calendar-component",
  },
  "easy-spot": {
    title: "Easy Spot",
    subtitle: "A backoffice dashboard for a parking booking app.",
    images: [
      "images/parking1.png",
      "images/parking2.png",
      "images/parking3.png",
      "images/parking4.png",
    ],
    description:
      "Features parking management, customer management, calendar availability and statistics.",
    tech: [
      "Angular 16 (Standalone components)",
      "Tailwind",
      "Firebase",
      "Google Maps APIs",
      "Reactive Forms",
    ],
    github: "https://github.com/yourusername/candidate-dashboard",
  },
  "panidis-alum": {
    title: "Panidis Aluminum",
    subtitle: "A website for an aluminum/glass panels company",
    images: [
      "images/pan1.png",
      "images/pan2.png",
      "images/pan3.png",
      "images/pan4.png",
      "images/pan5.png",
    ],
    description:
      "Features product catalog, online store, cart, mobile view, dynamic form and checkout.",
    tech: ["Angular 17 (Standalone components)", "Tailwind", "Firebase"],
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
  // if (data.live) {
  //   const liveLink = `<a href="${data.live}" target="_blank" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg mr-4">Live Demo</a>`;
  //   linksContainer.insertAdjacentHTML("beforeend", liveLink);
  // }
  // if (data.github) {
  //   const githubLink = `<a href="${data.github}" target="_blank" class="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">View Code</a>`;
  //   linksContainer.insertAdjacentHTML("beforeend", githubLink);
  // }

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
