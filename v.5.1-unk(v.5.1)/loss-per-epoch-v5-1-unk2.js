const lossData = [
  { epoch: 1, trainLoss: 10.5032, validLoss: 6.9636 },
  { epoch: 2, trainLoss: 6.7767, validLoss: 5.1494 },
  { epoch: 3, trainLoss: 5.3665, validLoss: 4.4830 },
  { epoch: 4, trainLoss: 4.8012, validLoss: 4.1845 },
  { epoch: 5, trainLoss: 4.4335, validLoss: 3.9688 },
  { epoch: 6, trainLoss: 4.3717, validLoss: 3.8814 },
  { epoch: 7, trainLoss: 4.0129, validLoss: 3.7796 },
  { epoch: 8, trainLoss: 4.0295, validLoss: 3.6690 },
  { epoch: 9, trainLoss: 3.8753, validLoss: 3.6023 },
  { epoch: 10, trainLoss: 3.8119, validLoss: 3.5036 },
  { epoch: 11, trainLoss: 3.6720, validLoss: 3.4190 },
  { epoch: 12, trainLoss: 3.5932, validLoss: 3.3272 },
  { epoch: 13, trainLoss: 3.3878, validLoss: 3.2597 },
  { epoch: 14, trainLoss: 3.2961, validLoss: 3.0737 },
  { epoch: 15, trainLoss: 3.1128, validLoss: 2.9010 },
  { epoch: 16, trainLoss: 2.9446, validLoss: 2.7011 },
  { epoch: 17, trainLoss: 2.7782, validLoss: 2.4217 },
  { epoch: 18, trainLoss: 2.5058, validLoss: 2.0196 },
  { epoch: 19, trainLoss: 2.2130, validLoss: 1.5090 },
  { epoch: 20, trainLoss: 1.7006, validLoss: 1.1293 }
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
          suggestedMax: 11,
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
