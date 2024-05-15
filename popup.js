// var textWrapper = document.querySelector('.ml2');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// anime.timeline({loop: false})
//   .add({
//     targets: '.ml2 .letter',
//     scale: [4,1],
//     opacity: [0,1],
//     translateZ: 0,
//     easing: "easeOutExpo",
//     duration: 950,
//     delay: (el, i) => 70*i
//   });


let currentTrackIndex = 0;
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const trackInfo = document.getElementById("trackInfo");
const audioPlayer = document.getElementById("audioPlayer");
const container = document.querySelector(".container");
let displayText = document.getElementById("displayText");
let storedSongData = localStorage.getItem("songData");
let player = document.getElementById("player");

function changeView() {
  // trackInfo.innerHTML = parsedData.info;
  displayText.style.display = "none";

  container.classList.add("newColor");
}

if (storedSongData) {
  const parsedData = JSON.parse(storedSongData);
  if (parsedData && parsedData.url && parsedData.info) {
    audioPlayer.src = parsedData.url;
    audioPlayer.style.display = "block";
    displayText.style.display = "none";
    trackInfo.innerHTML = parsedData.info;
  }
}

searchButton.addEventListener("click", function () {
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    alert("Please enter a search term");
    return;
  }

  searchTrack(searchTerm);
});

async function searchTrack(searchTerm) {
  const url = `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a09def0f2emshdcc7e36f69fdb60p1b1885jsnd064a990f9c8",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    const loader = document.querySelector(".loader-wrapper");
    loader.style.display = "flex";
    setTimeout(function () {
      loader.style.display = "none";
    }, 2000);
    playMusic(data);
  } catch (error) {
    console.error("Error searching track:", error);
    alert("An error occurred while searching for the track");
  }
}

function playMusic(data) {
  const navbtns = document.querySelectorAll(".navbtns");

  if (data && data.tracks && data.tracks.items.length > 0) {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (prevBtn && nextBtn) {
      // Check if buttons are found
      prevBtn.addEventListener("click", () => prevSong(data));
      nextBtn.addEventListener("click", () => nextSong(data));
    } else {
      console.error("Previous or next button not found.");
    }

    if (currentTrackIndex >= data.tracks.items.length) {
      console.log("Reached end of playlist");
      return;
    }

    const track = data.tracks.items[currentTrackIndex].data;
    const trackName = track.name;
    const artist = track.artists.items[0].profile.name;
    const album = track.albumOfTrack.name;
    const previewUrl = track.playability.playable
      ? `https://open.spotify.com/embed/track/${track.id}`
      : null;

    trackInfo.innerHTML = `<div>
      <p>Track: ${trackName}</p>
      <p>Artist: ${artist}</p>
      <p>Album: ${album}</p>
      </div>`;

    localStorage.setItem(
      "songData",
      JSON.stringify({ url: previewUrl, info: trackInfo.innerHTML })
    );

    if (previewUrl) {
      audioPlayer.src = previewUrl;
      // let displayText = (document.getElementById("displayText").style.display =
      //   "none");
      audioPlayer.style.display = "block";
      // container.classList.add("newColor");
      changeView();
      navbtns.forEach((btn) => (btn.style.display = "block")); // Adjusted this line

      chrome.runtime.sendMessage({ type: "UPDATE_BADGE", text: "1" });

      prevBtn.disabled = currentTrackIndex === 0;
      nextBtn.disabled = currentTrackIndex === data.tracks.items.length - 2;
    } else {
      console.log("Preview unavailable for this track. Skipping...");
    }
  } else {
    alert("No track found for the search term");
  }
}

function prevSong(data) {
  currentTrackIndex--;
  playMusic(data);
  console.log("prev");
}
function nextSong(data) {
  currentTrackIndex++;
  playMusic(data);
  console.log("next");
}

let localPlay = document.getElementById("localPlay");
let playerLocal = document.getElementById("playerLocal");

localPlay.addEventListener("change", function () {
  playLocalsong(this.files[0]);
});

  // Send a message to the background script to play audio
  function playAudio(audioUrl) {
    chrome.runtime.sendMessage({ action: "playAudio", audioUrl: audioUrl });
  }
  
  // Send a message to the background script to pause audio
  function pauseAudio() {
    chrome.runtime.sendMessage({ action: "pauseAudio" });
  }

function playLocalsong(file) {
  let url = URL.createObjectURL(file);
  playerLocal.src = url;
  console.log(file);
  trackInfo.innerText = file.name;
  changeView();
  playerLocal.style.display = "block";
  audioPlayer.style.display = "none";

playAudio(url);
}
