// Background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "UPDATE_BADGE") {
    chrome.action.setBadgeText({ text: message.text }); // Set badge text based on your logic
  }
});
