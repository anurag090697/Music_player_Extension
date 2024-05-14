let currentTrackIndex = 0;
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const trackInfo = document.getElementById("trackInfo");
const audioPlayer = document.getElementById("audioPlayer");
const container = document.querySelector(".container");

let storedSongData = localStorage.getItem("songData");

if (storedSongData) {
  const parsedData = JSON.parse(storedSongData);
  if (parsedData && parsedData.url && parsedData.info) {
    audioPlayer.src = parsedData.url;
    trackInfo.innerHTML = parsedData.info;
    let displayText = (document.getElementById("displayText").style.display =
      "none");
    audioPlayer.style.display = "block";
    container.classList.add("newColor");
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
      let displayText = (document.getElementById("displayText").style.display =
        "none");
      audioPlayer.style.display = "block";
      container.classList.add("newColor");
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
