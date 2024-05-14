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