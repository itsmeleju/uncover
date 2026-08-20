const offers = [
  { shop: "Malabar Fresh", category: "Supermarket", title: "Weekend Fresh Sale", text: "Up to 30% off selected groceries", price: "30% OFF" },
  { shop: "Kairali Textiles", category: "Textiles", title: "Onam Collection", text: "Kerala-inspired festive styles", price: "NEW" },
  { shop: "Coconut Tree Café", category: "Dining", title: "Tea & Snacks Combo", text: "A local evening favourite", price: "₹99" },
  { shop: "Green Leaf Services", category: "Services", title: "Home Service Offer", text: "Book selected local services", price: "SAVE 20%" },
  { shop: "Nila Supermart", category: "Supermarket", title: "Monthly Essentials", text: "Family packs and daily needs", price: "DEALS" },
  { shop: "Mango Looms", category: "Textiles", title: "Handloom Picks", text: "Local handloom favourites", price: "FROM ₹499" }
];

const offerGrid = document.querySelector("#offerGrid");
const exploreList = document.querySelector("#exploreList");
const searchInput = document.querySelector("#searchInput");
const categoryChips = document.querySelector("#categoryChips");

function renderHome() {
  offerGrid.innerHTML = offers.slice(0, 6).map(item => `
    <article class="offer-card">
      <div class="offer-visual">
        <strong>${item.title}</strong>
      </div>
      <div class="offer-body">
        <span class="tag">${item.category}</span>
        <h3>${item.shop}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `).join("");
}

let activeCategory = "All";

function renderExplore() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = offers.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const searchable = `${item.shop} ${item.title} ${item.text} ${item.category}`.toLowerCase();
    return matchesCategory && searchable.includes(query);
  });

  exploreList.innerHTML = filtered.length
    ? filtered.map(item => `
      <article class="explore-item">
        <div>
          <span class="tag">${item.category}</span>
          <h3>${item.shop}</h3>
          <p>${item.title} · ${item.text}</p>
        </div>
        <span class="offer-price">${item.price}</span>
      </article>
    `).join("")
    : `<p>No local results found. Try another search or category.</p>`;
}

function switchTab(tabName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.toggle("active", page.id === tabName);
  });

  document.querySelectorAll(".nav-item").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-tab]").forEach(button => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

categoryChips.addEventListener("click", event => {
  const chip = event.target.closest(".chip");
  if (!chip) return;

  activeCategory = chip.dataset.category;

  document.querySelectorAll(".chip").forEach(item => {
    item.classList.toggle("active", item === chip);
  });

  renderExplore();
});

searchInput.addEventListener("input", renderExplore);

document.querySelector("#locateBtn").addEventListener("click", () => {
  const locationText = document.querySelector("#locationText");

  if (!navigator.geolocation) {
    locationText.textContent = "Kerala · Local";
    return;
  }

  locationText.textContent = "Finding your area…";

  navigator.geolocation.getCurrentPosition(
    () => {
      // A real project would send coordinates to a backend/geocoding service.
      // This starter keeps everything free and static for GitHub Pages.
      locationText.textContent = "Near you · Offers";
      alert("Location found. Connect your preferred map/geocoding service later to show exact local results.");
    },
    () => {
      locationText.textContent = "Kerala · Local";
      alert("Location permission was not granted. You can still explore offers manually.");
    }
  );
});

renderHome();
renderExplore();
