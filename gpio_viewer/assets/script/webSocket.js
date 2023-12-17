var ws;
const colors = [
  "#00ff00", // Green
  "#1fff00",
  "#3eff00",
  "#5dff00",
  "#7cff00",
  "#9bff00",
  "#baff00",
  "#d9ff00",
  "#f8ff00",
  "#ffff00", // Yellow
  "#ffef00",
  "#ffdf00",
  "#ffcf00",
  "#ffbf00",
  "#ffaf00",
  "#ff9f00",
  "#ff8f00",
  "#ff7f00",
  "#ff6f00",
  "#ff0000"  // Red
];

function initWebSocket() {
  ws = new WebSocket("ws://" + window.location.hostname + ":" + serverPort + "/ws");
  ws.onmessage = function (event) {
    var states = JSON.parse(event.data);
    for (var gpio in states) {
      setIndicatorColor("gpio" + gpio, states[gpio]);
    }
  };
}

function setIndicatorColor(indicatorId, value) {
  // Find the indicator within the 'indicators' section
  const indicatorSection = document.getElementById('indicators');
  const indicator = indicatorSection.querySelector('#' + indicatorId);
  if (!indicator) return;

  // Set the color of the indicator
  value = Math.max(0, Math.min(value, 256));
  const index = Math.floor((value / 256) * (colors.length - 1));
  indicator.style.backgroundColor = colors[index];

  // Find the corresponding value element within the 'values' section
  const valuesSection = document.getElementById('values');
  const valueElement = valuesSection.querySelector('#' + indicatorId);
  if (valueElement) {
      // Set the text content of the value element
      valueElement.textContent = value;
  }
}


window.addEventListener("load", initWebSocket);
