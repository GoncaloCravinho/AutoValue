// HTML ELEMENTS

const mainImage = document.getElementById("main-image");
const thumbnailsContainer = document.getElementById("car-thumbnails");

const carTitle = document.getElementById("car-title");
const carSummary = document.getElementById("car-summary");
const carPrice = document.getElementById("car-price");

const carBrand = document.getElementById("car-brand");
const carModel = document.getElementById("car-model");
const carYear = document.getElementById("car-year");
const carMileage = document.getElementById("car-mileage");
const carFuel = document.getElementById("car-fuel");
const carTransmission = document.getElementById("car-transmission");

// GET CAR ID FROM URL

const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get("id");

// LOAD CAR DATA

async function loadCarDetails() {
  try {
    const response = await fetch("data/marketplace.json");

    if (!response.ok) {
      throw new Error("Failed to load car data");
    }

    const cars = await response.json();

    const car = cars.find((car) => String(car.id) === carId);

    if (!car) {
      throw new Error("Car not found");
    }

    displayCarDetails(car);
    displayCarImages(car.images);
  } catch (error) {
    console.error("Error loading car details:", error);

    carTitle.textContent = "Car not found";
    carSummary.textContent = "Unable to load vehicle information.";
  }
}

// DISPLAY CAR INFORMATION

function displayCarDetails(car) {
  carTitle.textContent = `${car.brand} ${car.model}`;

  carSummary.textContent = `${car.year} · ${car.mileage.toLocaleString("pt-PT")} km · ${car.fuel} · ${car.transmission}`;

  carPrice.textContent = car.price.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

  carBrand.textContent = car.brand;
  carModel.textContent = car.model;
  carYear.textContent = car.year;

  carMileage.textContent = `${car.mileage.toLocaleString("pt-PT")} km`;

  carFuel.textContent = car.fuel;
  carTransmission.textContent = car.transmission;
}

// DISPLAY IMAGE GALLERY

function displayCarImages(images) {
  thumbnailsContainer.innerHTML = "";

  mainImage.src = images[0];

  images.forEach((image, index) => {
    const thumbnail = document.createElement("img");

    thumbnail.src = image;
    thumbnail.alt = `Car image ${index + 1}`;

    if (index === 0) {
      thumbnail.classList.add("active");
    }

    thumbnail.addEventListener("click", () => {
      mainImage.src = image;

      document
        .querySelectorAll(".car-thumbnails img")
        .forEach((img) => img.classList.remove("active"));

      thumbnail.classList.add("active");
    });

    thumbnailsContainer.appendChild(thumbnail);
  });
}

// INITIALIZE PAGE

loadCarDetails();
