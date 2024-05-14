let currentTrackIndex = 0;
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const trackInfo = document.getElementById("trackInfo");
const audioPlayer = document.getElementById("audioPlayer");
const container = document.querySelector(".container");

let arr = localStorage.getItem("song");
let num = arr.indexOf(",");
// console.log(num);
if (arr.length > 0) {
  audioPlayer.src = arr.substring(0, num);
  trackInfo.innerHTML = arr.substring(num+1, arr.length);
  let displayText = (document.getElementById("displayText").style.display =
    "none");
  audioPlayer.style.display = "block";
  container.classList.add("newColor");
  // console.log(arr.substring(0, num), arr.substring(num, arr.length));
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
    playMusic(data);
  } catch (error) {
    console.error("Error searching track:", error);
    alert("An error occurred while searching for the track");
  }
}

// function playMusic(data) {
//   if (data && data.tracks && data.tracks.items.length > 0) {
//     if (currentTrackIndex >= data.tracks.items.length) {
//       // Reached the end of the list, maybe handle it or stop
//       console.log("Reached end of playlist");
//       return;
//     }

//     const track = data.tracks.items[currentTrackIndex].data;
//     const trackName = track.name;
//     const artist = track.artists.items[0].profile.name;
//     const album = track.albumOfTrack.name;
//     // let songDuration = track.duration.totalMilliseconds;
//     const previewUrl = track.playability.playable
//       ? `https://open.spotify.com/embed/track/${track.id}`
//       : null;

//     trackInfo.innerHTML = `
//                 <p>Track: ${trackName}</p>
//                 <p>Artist: ${artist}</p>
//                 <p>Album: ${album}</p>
//             `;

//     if (previewUrl) {
//       audioPlayer.src = previewUrl;
//       let displayText = (document.getElementById("displayText").style.display =
//         "none");
//       audioPlayer.style.display = "block";
//       container.classList.add("newColor");
//       chrome.runtime.sendMessage({
//         type: "PLAY_MUSIC",
//         previewUrl: previewUrl,
//       });

//       currentTrackIndex++; // Move to the next track after playing

//       audioPlayer.addEventListener("ended", () => {
//         playMusic(data); // Call playMusic again after the current song ends
//       });
//     } else {
//       alert("Preview not available for this track");
//     }
//   } else {
//     alert("No track found for the search term");
//   }
// }

function playMusic(data) {
  if (data && data.tracks && data.tracks.items.length > 0) {
    if (currentTrackIndex >= data.tracks.items.length) {
      // Reached the end of the list, maybe handle it or stop
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

    trackInfo.innerHTML = `
      <p>Track: ${trackName}</p>
      <p>Artist: ${artist}</p>
      <p>Album: ${album}</p>
    `;
    localStorage.setItem("song", [
      `https://open.spotify.com/embed/track/${track.id}`,

      `<p>Track: ${trackName}</p>
    <p>Artist: ${artist}</p>
    <p>Album: ${album}</p>
  `,
    ]);
    if (previewUrl) {
      audioPlayer.src = previewUrl;
      let displayText = (document.getElementById("displayText").style.display =
        "none");
      audioPlayer.style.display = "block";
      container.classList.add("newColor");
      chrome.runtime.sendMessage({
        type: "PLAY_MUSIC",
        previewUrl: previewUrl,
      });

      currentTrackIndex++; // Move to the next track after playing

      audioPlayer.addEventListener("ended", () => {
        playMusic(data); // Call playMusic again after the current song ends
      });
    } else {
      console.log("Preview unavailable for this track. Skipping...");
      currentTrackIndex++; // Move to the next track even if preview is unavailable
      playMusic(data); // Try playing the next track
    }
  } else {
    alert("No track found for the search term");
  }
}
