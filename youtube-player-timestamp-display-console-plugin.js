//Declaration
ytplayer = document.getElementById("movie_player");

let previousTimestamp = "";
let currentTimestamp = "";

// Init a p tag for displaying currentTimestamp under the video title.

const mainDiv = document.querySelector("ytd-watch-metadata").querySelector("#title");
const pluginDiv = document.createElement("div");
const timestampTag = document.createElement("p");
pluginDiv.classList.add("plugin-div");
timestampTag.classList.add("timestamp");

timestampTag.setAttribute(
    "style",
    "font-family: 'Roboto', 'Arial', sans-serif; font-size: 1.53rem; padding-top: 2px; padding-bottom: 5px;"
);

//To-do, add a form submission for section looping, jump to, and skip to timestamp location.

//Create a form
const inputForm = document.createElement("form");
inputForm.id = "timestamp-input-form";

const timestampInputField = document.createElement("input");
timestampInputField.type = "text";
timestampInputField.id = "timestamp-input-field";
timestampInputField.name = "timestamp";
inputForm.appendChild(timestampInputField);

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Confirm";
inputForm.appendChild(submitButton);

// Event listener for form submission
inputForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(event.currentTarget);

    //convert timestamp input to seconds
    const toSecond = (hrs, min, sec) => hrs * 60 * 60 + min * 60 + sec;

    timeString = formData.get("timestamp");
    const [hours, minutes, seconds] = timeString.split(":");
    console.log(`${hours}:${minutes}:${seconds}`);
    console.log(toSecond(parseInt(hours), parseInt(minutes), parseInt(seconds)));
    ytplayer.seekTo(toSecond(parseInt(hours), parseInt(minutes), parseInt(seconds)));
    // const formDataObject = {};
    // formData.forEach(function (value, key) {
    //     formDataObject[key] = value;
    // });

    // Display form data
    // console.log(formDataObject);
});

//Append all elements created above
mainDiv.appendChild(pluginDiv);
pluginDiv.appendChild(timestampTag);
pluginDiv.appendChild(inputForm);
timestampTag.textContent = "initialized";

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
