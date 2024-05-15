# Music Player Chrome Extension

This Chrome extension allows users to play their favorite music seamlessly while browsing the web.

## Features

- Seamless music playback through an iframe-based music player.
- Control playback with next and previous track buttons.(In online search)
- Persist playback state even when switching tabs or closing the extension popup.
- select a song from local storage and play.

## Installation

1. Clone this repository to your local machine:

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the top-right corner.

4. Click on "Load unpacked" and select the directory where you cloned the repository.

5. The extension should now be installed and visible in your extensions toolbar.

## Usage

1. Click on the extension icon in the toolbar to open the popup window.

2. Use the next and previous buttons to control playback of the music player.

3. Enjoy seamless music playback while browsing the web!

4. User can also select a song form the local storage and hit play.

## Development

- The extension popup UI is implemented using HTML, CSS, and JavaScript.
- The background logic is handled by a service worker (`background.js`) for persistent playback state.
- Content scripts (`contentScript.js`) are injected into webpages to control the iframe-based music player.

## Contributors

- [Anurag Shukla](https://github.com/anurag090697)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
