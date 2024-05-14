const TEST_FILE_URL =
  "https://freetestdata.com/wp-content/uploads/2021/09/1-MB-DOC.doc";
const TEST_FILE_SIZE_MB = 1; // Size of your test file in MB
const themeToggleButton = document.getElementById("themeToggle");

document.getElementById("themeToggle").addEventListener("click", () => {
  const bodyElement = document.body;

  // Check if current theme is dark
  if (bodyElement.classList.contains("bg-gray-900")) {
    bodyElement.classList.remove("bg-gray-900", "text-gray-100");
    bodyElement.classList.add("bg-gray-100", "text-gray-900");
  } else {
    bodyElement.classList.remove("bg-gray-100", "text-gray-900");
    bodyElement.classList.add("bg-gray-900", "text-gray-100");
  }
});

document.getElementById("buymeacoffee").addEventListener("click", () => {
  window.open("https://www.buymeacoffee.com/yourusername", "_blank");
});

document.getElementById("checkSpeed").addEventListener("click", () => {
  const spinner = document.getElementById("spinner");
  const speedInfo = document.getElementById("speedInfo");

  spinner.classList.remove("hidden"); // Show spinner
  speedInfo.innerText = "-"; // Reset speed info

  const startTime = new Date().getTime();
  // A start time is recorded using new Date().getTime(), which gives the current time in milliseconds.
  //Then, the script fetches a test file from a given TEST_FILE_URL. The "?nocache=" + startTime appended
  // to the URL ensures that the file is fetched fresh every time (preventing caching).
  fetch(TEST_FILE_URL + "?nocache=" + startTime)
    .then((response) => response.blob())
    .then((blob) => {
      const endTime = new Date().getTime();
      const durationSeconds = (endTime - startTime) / 1000;
      const speedMbps = (TEST_FILE_SIZE_MB / durationSeconds).toFixed(2);
      speedInfo.innerText = `${speedMbps} Mbps`;
      spinner.classList.add("hidden"); // Hide spinner after fetching
    })
    .catch((error) => {
      speedInfo.innerText = "Error!";
      console.error("Error fetching test file:", error);
      spinner.classList.add("hidden"); // Hide spinner on error
    });
});
