// Init a p tag for displaying currentTimestamp under the video title.

const mainDiv = document.querySelector("ytd-watch-metadata").querySelector("#title");
const timestampTag = document.createElement("p");

timestampTag.setAttribute(
    "style",
    "font-family: 'Roboto', 'Arial', sans-serif; font-size: 1.53rem; padding-top: 2px; padding-bottom: 12px;"
);

timestampTag.textContent = "initialized";
mainDiv.appendChild(timestampTag);

//Declaration
ytplayer = document.getElementById("movie_player");

let previousTimestamp = "";
let currentTimestamp = "";

function getCurrentTimestamp(playHeadInSecond) {
    //Using Date Object to calculate the timestamp with the playhead second given by the ytplayer.
    timestampObj = new Date(playHeadInSecond * 1000);
    hours = timestampObj.getUTCHours();
    minutes = timestampObj.getUTCMinutes();
    seconds = timestampObj.getSeconds();

    timestamp =
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");

    return timestamp;
}

//Update the timestamp every 10ms.
const printTimestamp = setInterval(function () {
    let playHeadSecond = ytplayer.getCurrentTime();
    currentTimestamp = getCurrentTimestamp(playHeadSecond);
    if (previousTimestamp !== currentTimestamp) {
        // console.log(currentTimestamp);
        //
        timestampTag.textContent = currentTimestamp;
        previousTimestamp = currentTimestamp;
    }
}, 10);
