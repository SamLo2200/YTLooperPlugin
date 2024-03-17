ytplayer = document.getElementById("movie_player");

let previousTimestamp = "";
let currentTimestamp = "";

function getCurrentTimestamp(playHeadInSecond) {
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

const printTimestamp = setInterval(function () {
    let playHeadSecond = ytplayer.getCurrentTime();
    currentTimestamp = getCurrentTimestamp(playHeadSecond);
    if (previousTimestamp !== currentTimestamp) {
        console.log(currentTimestamp);
        previousTimestamp = currentTimestamp;
    }
}, 10);

//todo: append timestamp to youtube.com

// const ytdWatchMetadata = document.getElementById("title");
// const timestampTag = document.createElement("p");
// timestampTag.textContent = "initialized";
// ytdWatchMetadata.appendChild(timestampTag);
// timestampTag.textContent = "changed";
