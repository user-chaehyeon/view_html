const lossData = [
  { epoch: 1, trainLoss: 0.5416, validLoss: 0.0417 },
  { epoch: 2, trainLoss: 0.4858, validLoss: 0.0411 },
  { epoch: 3, trainLoss: 0.4629, validLoss: 0.0429 },
  { epoch: 4, trainLoss: 0.4447, validLoss: 0.0427 },
  { epoch: 5, trainLoss: 0.4673, validLoss: 0.0428 }
];

const chartElement = document.getElementById("lossChart");
const fallbackElement = document.getElementById("chartFallback");

if (!window.Chart) {
  fallbackElement.classList.add("is-visible");
} else {
  const computedStyle = getComputedStyle(document.documentElement);
  const trainColor = computedStyle.getPropertyValue("--train").trim();
  const validColor = computedStyle.getPropertyValue("--valid").trim();
  const textColor = computedStyle.getPropertyValue("--text").trim();
  const mutedColor = computedStyle.getPropertyValue("--muted").trim();
  const lineColor = computedStyle.getPropertyValue("--line").trim();
  const chartFontFamily = "\"Noto Sans KR\", \"Segoe UI\", Arial, sans-serif";

  Chart.defaults.font.family = chartFontFamily;

  new Chart(chartElement, {
    type: "line",
    data: {
      labels: lossData.map((item) => `Epoch ${item.epoch}`),
      datasets: [
        {
          label: "Train loss",
          data: lossData.map((item) => item.trainLoss),
          borderColor: trainColor,
          backgroundColor: "rgba(37, 99, 235, 0.12)",
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: trainColor,
          pointBorderWidth: 2,
          tension: 0.28,
          fill: false
        },
        {
          label: "Valid loss",
          data: lossData.map((item) => item.validLoss),
          borderColor: validColor,
          backgroundColor: "rgba(220, 38, 38, 0.12)",
          borderWidth: 3,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: validColor,
          pointBorderWidth: 2,
          tension: 0.28,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#17201d",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label(context) {
              return `${context.dataset.label}: ${context.parsed.y.toFixed(4)}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: "rgba(216, 224, 220, 0.55)"
          },
          ticks: {
            color: mutedColor,
            maxRotation: 0
          },
          title: {
            display: true,
            text: "Epoch",
            color: textColor,
            font: {
              weight: "700"
            }
          }
        },
        y: {
          beginAtZero: true,
          suggestedMax: 0.6,
          grid: {
            color: lineColor
          },
          ticks: {
            color: mutedColor,
            callback(value) {
              return Number(value).toFixed(2);
            }
          },
          title: {
            display: true,
            text: "Loss",
            color: textColor,
            font: {
              weight: "700"
            }
          }
        }
      }
    }
  });
}
