let modelsByBrand = {};

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

/* Load brands and models from JSON */

fetch("data/models_by_brand.json")
  .then((response) => response.json())
  .then((data) => {
    modelsByBrand = data;

    for (const brand in modelsByBrand) {
      const option = document.createElement("option");

      option.value = brand;
      option.textContent = brand;

      brandSelect.appendChild(option);
    }
  });

/* Update models when a brand is selected */

brandSelect.addEventListener("change", function () {
  modelSelect.disabled = false;

  modelSelect.innerHTML = "";

  const defaultOption = document.createElement("option");

  defaultOption.value = "";
  defaultOption.textContent = "Select a model";
  defaultOption.disabled = true;
  defaultOption.selected = true;

  modelSelect.appendChild(defaultOption);

  const models = modelsByBrand[brandSelect.value];

  models.forEach(function (model) {
    const option = document.createElement("option");

    option.value = model;
    option.textContent = model;

    modelSelect.appendChild(option);
  });
});

/* Form submission */

estimateForm.addEventListener("submit", function (event) {
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

  const brandName = brandSelect.options[brandSelect.selectedIndex].text;

  const formattedMileage = car.mileage.toLocaleString("en-US");

  resultCar.textContent = `${brandName} ${car.model}`;

  resultDetails.textContent = `${car.year} • ${formattedMileage} km • ${car.fuel} • ${car.transmission} • ${car.power} hp`;

  estimateForm.style.display = "none";
  result.style.display = "block";
});

/* New estimate */

newEstimateButton.addEventListener("click", function () {
  result.style.display = "none";
  estimateForm.style.display = "grid";
});
