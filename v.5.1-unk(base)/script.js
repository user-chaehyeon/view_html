const lossData = [
  { epoch: 1, trainLoss: 7.9305, validLoss: 5.7164 },
  { epoch: 2, trainLoss: 5.5582, validLoss: 4.4169 },
  { epoch: 3, trainLoss: 4.5886, validLoss: 3.8195 },
  { epoch: 4, trainLoss: 4.0864, validLoss: 3.4150 },
  { epoch: 5, trainLoss: 3.3182, validLoss: 2.3672 },
  { epoch: 6, trainLoss: 2.1637, validLoss: 0.8744 },
  { epoch: 7, trainLoss: 1.0033, validLoss: 0.6744 },
  { epoch: 8, trainLoss: 0.9681, validLoss: 0.6008 },
  { epoch: 9, trainLoss: 0.7929, validLoss: 0.5285 },
  { epoch: 10, trainLoss: 0.6773, validLoss: 0.4734 }
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
          suggestedMax: 8.5,
          grid: {
            color: lineColor
          },
          ticks: {
            color: mutedColor,
            callback(value) {
              return Number(value).toFixed(1);
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
