let modelsByBrand = {};

const API_URL = "http://127.0.0.1:8000/api/predict";

const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");
const estimateForm = document.getElementById("estimate-form");
const yearInput = document.getElementById("year");
const mileageInput = document.getElementById("mileage");
const powerInput = document.getElementById("power");
const fuelSelect = document.getElementById("fuel");
const transmissionSelect = document.getElementById("transmission");
const result = document.getElementById("result");
const resultCar = document.getElementById("result-car");
const resultDetails = document.getElementById("result-details");
const newEstimateButton = document.getElementById("new-estimate");
const estimatedPriceElement = document.getElementById("estimated-price");

/* Load brands and models from JSON */

fetch("data/models_by_brand.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to load brands and models.");
    }
    return response.json();
  })
  .then((data) => {
    modelsByBrand = data;

    for (const brand in modelsByBrand) {
      const option = document.createElement("option");

      option.value = brand;
      option.textContent = brand;

      brandSelect.appendChild(option);
    }
  })
  .catch((error) => {
    console.error("Error loading brands:", error);
  });

/* Update models when a brand is selected */

brandSelect.addEventListener("change", function () {
  modelSelect.innerHTML = "";

  const defaultOption = document.createElement("option");

  defaultOption.value = "";
  defaultOption.textContent = "Select a model";
  defaultOption.disabled = true;
  defaultOption.selected = true;

  modelSelect.appendChild(defaultOption);

  const models = modelsByBrand[brandSelect.value] || [];

  modelSelect.disabled = models.length === 0;

  models.forEach(function (model) {
    const option = document.createElement("option");

    option.value = model;
    option.textContent = model;

    modelSelect.appendChild(option);
  });
});

/* Request prediction from FastAPI */

async function predictPrice(car) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      typeof error.detail === "string"
        ? error.detail
        : "Unable to estimate the car price.",
    );
  }

  const data = await response.json();

  return data.estimated_price;
}

/* Form submission */

estimateForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const car = {
    brand: brandSelect.value,
    model: modelSelect.value,
    year: Number(yearInput.value),
    mileage: Number(mileageInput.value),
    fuel: fuelSelect.value,
    transmission: transmissionSelect.value,
    power: Number(powerInput.value),
  };

  const submitButton = estimateForm.querySelector('button[type="submit"]');

  if (submitButton) {
    submitButton.disabled = true;
  }

  try {
    const estimatedPrice = await predictPrice(car);

    const brandName = brandSelect.options[brandSelect.selectedIndex].text;

    const formattedMileage = car.mileage.toLocaleString("en-US");

    const formattedPrice = estimatedPrice.toLocaleString("en-IE", {
      style: "currency",
      currency: "EUR",
    });

    estimatedPriceElement.textContent = formattedPrice;

    resultCar.textContent = `${brandName} ${car.model}`;

    resultDetails.textContent =
      `${car.year} • ${formattedMileage} km • ${car.fuel} • ` +
      `${car.transmission} • ${car.power} hp`;

    estimateForm.style.display = "none";
    result.style.display = "block";
  } catch (error) {
    console.error("Prediction error:", error);

    alert("Unable to estimate the price. Please try again.");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
});

/* New estimate */

newEstimateButton.addEventListener("click", function () {
  result.style.display = "none";
  estimateForm.style.display = "grid";
});
