let modelsByBrand = {};

const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");

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

/* GENERATE CHART */

const insightsForm = document.getElementById("insights-form");
const chartContainer = document.querySelector(".chart-container");

let mileageChart = null;

insightsForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const car = {
    brand: brandSelect.value,
    model: modelSelect.value,
    year: Number(document.getElementById("year").value),
    fuel: document.getElementById("fuel").value,
    transmission: document.getElementById("transmission").value,
    power: Number(document.getElementById("power").value),
  };

  console.log("Selected car:", car);

  // Example data (temporary)
  const mileages = [
    0, 25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000,
  ];
  const prices = [
    35000, 32500, 29500, 27000, 24500, 22000, 20000, 18000, 16500,
  ];

  chartContainer.style.display = "block";

  if (mileageChart !== null) {
    mileageChart.destroy();
  }

  const ctx = document.getElementById("mileage-chart");

  mileageChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: mileages,
      datasets: [
        {
          label: "Illustrative Price (€)",
          data: prices,
          borderColor: "#d9ad5d",
          backgroundColor: "rgba(217, 173, 93, 0.15)",
          borderWidth: 3,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Illustrative Data — Not Model Predictions",
          color: "#b8bbc2",
        },
        legend: {
          labels: {
            color: "white",
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Mileage (km)",
            color: "white",
          },
          ticks: {
            color: "#b8bbc2",
          },
        },
        y: {
          title: {
            display: true,
            text: "Estimated Price (€)",
            color: "white",
          },
          ticks: {
            color: "#b8bbc2",
          },
        },
      },
    },
  });
});
