// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PLAY_MUSIC") {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer) {
      audioPlayer.src = message.previewUrl;
      audioPlayer.play();
    }
  }
});
