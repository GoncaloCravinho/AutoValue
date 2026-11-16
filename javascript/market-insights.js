let modelsByBrand = {};

const API_URL = "http://127.0.0.1:8000/api/insights/mileage";

const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");
const insightsForm = document.getElementById("insights-form");
const chartContainer = document.querySelector(".chart-container");
const generateButton = insightsForm.querySelector('button[type="submit"]');

let mileageChart = null;

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

/* Request mileage insights from FastAPI */

async function getMileageInsights(car) {
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
        : "Unable to generate market insights.",
    );
  }

  return await response.json();
}

/* Generate chart */

insightsForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const car = {
    brand: brandSelect.value,
    model: modelSelect.value,
    year: Number(document.getElementById("year").value),
    fuel: document.getElementById("fuel").value,
    transmission: document.getElementById("transmission").value,
    power: Number(document.getElementById("power").value),
  };

  generateButton.disabled = true;
  generateButton.textContent = "Generating...";

  try {
    const insights = await getMileageInsights(car);

    const mileages = insights.mileage;
    const prices = insights.estimated_prices;

    if (
      !Array.isArray(mileages) ||
      !Array.isArray(prices) ||
      mileages.length !== prices.length ||
      mileages.length === 0 ||
      !prices.every((price) => Number.isFinite(price))
    ) {
      throw new Error("Invalid prediction data received.");
    }

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
            label: "Estimated Price (€)",
            data: prices,
            borderColor: "#d9ad5d",
            backgroundColor: "rgba(217, 173, 93, 0.08)",
            borderWidth: 3,
            tension: 0,
            fill: true,
            pointRadius: 2,
            pointHoverRadius: 6,
            pointBackgroundColor: "#d9ad5d",
            pointBorderColor: "#d9ad5d",
            pointHoverBackgroundColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
          mode: "index",
          intersect: false,
        },

        plugins: {
          title: {
            display: true,
            text: `${car.brand} ${car.model} (${car.year})`,
            color: "#ffffff",
            font: {
              size: 18,
              weight: "bold",
            },
            padding: {
              top: 10,
              bottom: 20,
            },
          },

          legend: {
            display: false,
          },

          tooltip: {
            backgroundColor: "#20252d",
            titleColor: "#ffffff",
            bodyColor: "#d9ad5d",
            borderColor: "#454b55",
            borderWidth: 1,
            padding: 12,

            callbacks: {
              title: function (items) {
                const mileage = Number(items[0].label);

                return `${mileage.toLocaleString("en-US")} km`;
              },

              label: function (context) {
                const price = context.parsed.y;

                return `Estimated Price: ${price.toLocaleString("en-IE", {
                  style: "currency",
                  currency: "EUR",
                })}`;
              },
            },
          },
        },

        scales: {
          x: {
            title: {
              display: true,
              text: "Mileage (km)",
              color: "#ffffff",
              font: {
                size: 13,
                weight: "bold",
              },
              padding: {
                top: 10,
              },
            },

            ticks: {
              color: "#b8bbc2",
              maxTicksLimit: 9,

              callback: function (value) {
                const mileage = Number(this.getLabelForValue(value));

                return `${mileage / 1000}k`;
              },
            },

            grid: {
              color: "rgba(255, 255, 255, 0.04)",
            },
          },

          y: {
            title: {
              display: true,
              text: "Estimated Price (€)",
              color: "#ffffff",
              font: {
                size: 13,
                weight: "bold",
              },
              padding: {
                bottom: 10,
              },
            },

            ticks: {
              color: "#b8bbc2",

              callback: function (value) {
                return `${(value / 1000).toFixed(0)}k €`;
              },
            },

            grid: {
              color: "rgba(255, 255, 255, 0.06)",
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Market insights error:", error);

    alert("Unable to generate the chart. Please try again.");
  } finally {
    generateButton.disabled = false;
    generateButton.textContent = "Generate Chart";
  }
});
