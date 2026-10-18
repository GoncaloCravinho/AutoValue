const carListings = document.getElementById("car-listings");

const brandFilter = document.getElementById("filter-brand");
const priceFilter = document.getElementById("filter-price");
const resetButton = document.getElementById("reset-filters");
const noResults = document.getElementById("no-results");

let allCars = [];

// Load cars from JSON
async function loadCars() {
  try {
    const response = await fetch("data/marketplace.json");

    if (!response.ok) {
      throw new Error("Failed to load cars");
    }

    allCars = await response.json();

    populateBrandFilter(allCars);
    displayCars(allCars);
  } catch (error) {
    console.error("Error loading cars:", error);
  }
}

// Populate brand filter dynamically
function populateBrandFilter(cars) {
  brandFilter.innerHTML = '<option value="">All Brands</option>';

  const brands = [...new Set(cars.map((car) => car.brand))];

  brands.sort();

  brands.forEach((brand) => {
    const option = document.createElement("option");

    option.value = brand;
    option.textContent = brand;

    brandFilter.appendChild(option);
  });
}

// Display car cards
function displayCars(cars) {
  carListings.innerHTML = "";

  noResults.hidden = cars.length > 0;

  cars.forEach((car) => {
    const card = document.createElement("article");
    card.classList.add("car-card");

    card.innerHTML = `
      <img
        src="${car.images[0]}"
        alt="${car.brand} ${car.model}"
        class="car-image"
      >

      <h2>${car.brand} ${car.model}</h2>

      <p class="car-details">
        ${car.year} · ${car.mileage.toLocaleString("pt-PT")} km
        · ${car.fuel} · ${car.transmission}
      </p>

      <p class="car-price">
        ${car.price.toLocaleString("pt-PT", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        })}
      </p>

      <a href="car-details.html?id=${car.id}" class="car-link">
        View Details →
      </a>
    `;

    carListings.appendChild(card);
  });
}

// Filter cars by brand and maximum price
function filterCars() {
  const selectedBrand = brandFilter.value;
  const selectedPrice = priceFilter.value;

  const filteredCars = allCars.filter((car) => {
    const matchesBrand =
      selectedBrand === "" ||
      car.brand.toLowerCase() === selectedBrand.toLowerCase();

    const matchesPrice =
      selectedPrice === "" || car.price <= Number(selectedPrice);

    return matchesBrand && matchesPrice;
  });

  displayCars(filteredCars);
}

// Activate filters
brandFilter.addEventListener("change", filterCars);
priceFilter.addEventListener("change", filterCars);

// Reset filters
resetButton.addEventListener("click", () => {
  brandFilter.value = "";
  priceFilter.value = "";

  displayCars(allCars);
});

// Initialize marketplace
loadCars();
