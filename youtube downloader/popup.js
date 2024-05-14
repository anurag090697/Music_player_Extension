async function getData() {
  const url =
    "https://youtube-mp3-downloader5.p.rapidapi.com/?url=https://youtu.be/ybRYNRcIuA4?si=mzsNG6UFKudHwuAc";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a09def0f2emshdcc7e36f69fdb60p1b1885jsnd064a990f9c8",
      "X-RapidAPI-Host": "youtube-mp3-downloader5.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
getData();