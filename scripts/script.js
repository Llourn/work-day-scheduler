// Create instance of dayjs object
const dayjsObj = dayjs();

// init data for the planner entries.
var plannerEntries = [
  {
    timeSlot: 9,
    text: "",
  },
  {
    timeSlot: 10,
    text: "",
  },
  {
    timeSlot: 11,
    text: "",
  },
  {
    timeSlot: 12,
    text: "",
  },
  {
    timeSlot: 13,
    text: "",
  },
  {
    timeSlot: 14,
    text: "",
  },
  {
    timeSlot: 15,
    text: "",
  },
  {
    timeSlot: 16,
    text: "",
  },
  {
    timeSlot: 17,
    text: "",
  },
];

// Checking if localstorage has any data.
function getLocalStorageTimeSlots() {
  var retrievedEntries = JSON.parse(localStorage.getItem("plannerEntries"));
  if (retrievedEntries != null) {
    plannerEntries = retrievedEntries;
  }
}
// run on page load
getLocalStorageTimeSlots();

// utility function for creating time slot hour labels
function timeSlotLabel(timeIn24hr) {
  var suffix = "AM";
  var hour = timeIn24hr;

  if (timeIn24hr >= 12) {
    suffix = "PM";
    if (timeIn24hr > 12) {
      hour = timeIn24hr - 12;
    }
  }

  return `${hour}${suffix}`;
}

// utility function for assigning the correct class to the timeslot for styling.
function isPastPresentOrFuture(timeIn24hr) {
  const currentHour = dayjsObj.format("H");
  if (timeIn24hr < currentHour) {
    return "past";
  } else if (timeIn24hr > currentHour) {
    return "future";
  } else {
    return "present";
  }
}

// Run all dom interactions logic once the page has loaded.
$(function () {
  var timeSlotsHtml = "";
  // create a timeslot entry in html for every item in the plannerEntries array.
  plannerEntries.forEach((entry) => {
    timeSlotsHtml += `
    <div id="hour-${
      entry.timeSlot
    }" class="row time-block ${isPastPresentOrFuture(entry.timeSlot)}">
      <div class="col-2 col-md-1 hour text-center py-3">${timeSlotLabel(
        entry.timeSlot
      )}</div>
      <textarea class="col-8 col-md-10 description" rows="3">${
        entry.text
      }</textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>
    `;
  });
  // inject html into the #timeSlots element
  $("#timeSlots").html(timeSlotsHtml);

  // Eventlistener for saving text in entry to array then pushing to localstorage
  $(".time-block").click(function () {
    plannerEntries[$(this).index()].text = $(this).find("textarea").val();
    localStorage.setItem("plannerEntries", JSON.stringify(plannerEntries));
  });

  // Add today's date to the header.
  $("#currentDay").text(dayjsObj.format("MMMM DD, YYYY"));
});
