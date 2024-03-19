// Init a p tag for displaying currentTimestamp under the video title.

const mainDiv = document.querySelector("ytd-watch-metadata").querySelector("#title");
const pluginDiv = document.createElement("div");
const timestampTag = document.createElement("p");
pluginDiv.classList.add("plugin-div");
timestampTag.classList.add("timestamp");

timestampTag.setAttribute(
    "style",
    "font-family: 'Roboto', 'Arial', sans-serif; font-size: 1.53rem; padding-top: 2px; padding-bottom: 12px;"
);

//To-do, add a form submission for section looping, jump to, and skip to timestamp location.
//Create a form

//test

//Append all elements created above
mainDiv.appendChild(pluginDiv);
pluginDiv.appendChild(timestampTag);
timestampTag.textContent = "initialized";

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

//Update the timestamp
const printTimestamp = () => {
    let playHeadSecond = ytplayer.getCurrentTime();
    currentTimestamp = getCurrentTimestamp(playHeadSecond);
    if (previousTimestamp !== currentTimestamp) {
        // console.log(currentTimestamp)
        timestampTag.textContent = currentTimestamp;
        previousTimestamp = currentTimestamp;
    }
};

const mainLoop = setInterval(function () {
    printTimestamp();
}, 10);
