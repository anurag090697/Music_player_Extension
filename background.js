// Background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "PLAY_MUSIC" && message.previewUrl) {
      chrome.tabs.create({ url: message.previewUrl });
    }
  });