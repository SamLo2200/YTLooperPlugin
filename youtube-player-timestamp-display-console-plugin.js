//Declaration
ytplayer = document.getElementById("movie_player");

let previousTimestamp = "";
let currentTimestamp = "";
let playHeadSecond = 0;

//A variable that derived from meeting condition, can be directSkip, looping, TimestampQuickSkip
let playingType = "";

//Will determine whether the looper checking function will be executed
let isLooping = false;

function toSecond(hours, minutes, seconds) {
  return parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds);
}

class TimestringSplitter {
  static single(timeString) {
    //Requires deconstruction: [hours, minutes, seconds]
    return timeString.split(":");
  }

  static range(timeString) {
    const [pointA, pointB] = timeString.split("-");

    const [pointAHours, pointAMinutes, pointASeconds] =
      TimestringSplitter.single(pointA);
    const [pointBHours, pointBMinutes, pointBSeconds] =
      TimestringSplitter.single(pointB);

    return [
      { hours: pointAHours, minutes: pointAMinutes, seconds: pointASeconds },
      { hours: pointBHours, minutes: pointBMinutes, seconds: pointBSeconds },
    ];
  }
}

function looper(timeStringInRange) {
  let playlistArray = [];
  let playlistIndex = 0;

  let isInitial = true;

  // Parse multiple inputs that seperated by comma and add each timestamp pair to playlistArray as an object
  timeStringInRange
    .split(/[,，]/)
    .filter((item) => item.trim() !== "")
    .forEach((playlistItemTS) => {
      const [pointATime, pointBTime] = TimestringSplitter.range(playlistItemTS);

      // Convert returned timestamp to seconds
      let pointAInSeconds = toSecond(
        pointATime.hours,
        pointATime.minutes,
        pointATime.seconds,
      );
      let pointBInSeconds = toSecond(
        pointBTime.hours,
        pointBTime.minutes,
        pointBTime.seconds,
      );

      // Push the total seconds to the array as an record
      playlistArray.push({
        pointAInSeconds: pointAInSeconds,
        pointBInSeconds: pointBInSeconds,
      });
    });

  console.log(playlistArray);

  // Interval that handles looping
  const looping = setInterval(() => {
    // If the playhead hits the pointBInSeconds + the record is not the last in the arraylist: skip to next record
    if (
      playHeadSecond >= playlistArray[playlistIndex].pointBInSeconds &&
      playlistIndex < playlistArray.length - 1
    ) {
      playlistIndex += 1;
      ytplayer.seekTo(playlistArray[playlistIndex].pointAInSeconds);

      // Refresh the playHeadSecond variable
      playHeadSecond = ytplayer.getCurrentTime();
    }

    // If the playhead hits pointBInSeconds + the record is the last in the arraylist: Go to the beginning of the array
    if (
      playHeadSecond >= playlistArray[playlistIndex].pointBInSeconds &&
      playlistIndex === playlistArray.length - 1
    ) {
      playlistIndex = 0;
      ytplayer.seekTo(playlistArray[playlistIndex].pointAInSeconds);

      // Refresh the playHeadSecond variable
      playHeadSecond = ytplayer.getCurrentTime();
    }

    // Skip to the first timestamp when clicking the start button
    if (
      playHeadSecond <= playlistArray[0].pointAInSeconds &&
      isInitial === true
    ) {
      playlistIndex = 0;
      ytplayer.seekTo(playlistArray[playlistIndex].pointAInSeconds);

      // Refresh the playHeadSecond variable
      playHeadSecond = ytplayer.getCurrentTime();

      // Prevent racing condition
      isInitial = false;
    }

    // Execute clearInterval when the stop button is clicked
    if (isLooping === false) {
      clearInterval(looping);
    }
  }, 50);
}

// Init a p tag for displaying currentTimestamp under the video title.

const mainDiv = document
  .querySelector("ytd-watch-metadata")
  .querySelector("#title");
const pluginDiv = document.createElement("div");
const timestampTag = document.createElement("p");
pluginDiv.classList.add("plugin-div");
timestampTag.classList.add("timestamp");

timestampTag.setAttribute(
  "style",
  "font-family: 'Roboto', 'Arial', sans-serif; font-size: 1.53rem; padding-top: 6px; padding-bottom: 5px;",
);

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
  document.getElementById("timestamp-input-field").blur(); //Remove focus from the input field

  // Get form data
  const formData = new FormData(event.currentTarget);
  let userInput = formData.get("timestamp");

  if (isLooping === true) {
    isLooping = false;
    submitButton.textContent = "Confirm";
    console.log(isLooping);
  } else {
    if (userInput.length <= 8) {
      playingType = "directSkip";
      const [hours, minutes, seconds] = TimestringSplitter.single(userInput);
      ytplayer.seekTo(toSecond(hours, minutes, seconds));
    }

    if (userInput.length > 8 && isLooping !== true) {
      playingType = "looping";
      isLooping = true;
      looper(userInput);

      submitButton.textContent = "Stop/Reset";
    }
  }

  // Display form data

  const formDataObject = {};
  formData.forEach(function (value, key) {
    formDataObject[key] = value;
  });

  console.log(formDataObject);
});

inputForm.setAttribute(
  "style",
  "font-family: 'Roboto', 'Arial', sans-serif; font-size: 1.53rem; padding-top: 0.2px; padding-bottom: 13px;",
);

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
    hours.toString() +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return timestamp;
}

//Update the timestamp
const printTimestamp = () => {
  playHeadSecond = ytplayer.getCurrentTime();
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

//Shortcuts
document.addEventListener("keydown", function (event) {
  // Define focused HTML elements to ignore
  const formElements = ["INPUT", "TEXTAREA", "SELECT", "OPTION", "DIV"];

  //Copy currentTimestamp to clipboard when Q is pressed
  if (
    (event.key === "q" || event.key === "Q" || event.key === "手") &&
    !formElements.includes(event.target.tagName)
  ) {
    navigator.clipboard.writeText(currentTimestamp);
  }

  //Select timestamp input field
  if (
    (event.key === "w" || event.key === "W" || event.key === "田") &&
    !formElements.includes(event.target.tagName)
  ) {
    event.preventDefault();
    document.getElementById("timestamp-input-field").focus();
  }

  //Clear timestamp input field
  if (
    (event.key === "e" || event.key === "E" || event.key === "水") &&
    !formElements.includes(event.target.tagName)
  ) {
    event.preventDefault();
    document.getElementById("timestamp-input-field").value = "";
  }

  //Deselect timestamp input field
  if (event.key === "Escape" || event.key === "Escape") {
    event.preventDefault();
    document.getElementById("timestamp-input-field").blur();
  }
});
