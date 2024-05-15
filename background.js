// Background.js

let audioPlayer;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "playAudio") {
    if (!audioPlayer) {
      audioPlayer = new Audio();
    }
    audioPlayer.src = message.audioUrl;
    audioPlayer.play();
  } else if (message.action === "pauseAudio") {
    if (audioPlayer) {
      audioPlayer.pause();
    }
  }
});

// Pause audio when tab is inactive
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.audible && audioPlayer) {
      audioPlayer.play();
    } else if (audioPlayer) {
      audioPlayer.pause();
    }
  });
});
