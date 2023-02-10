// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const dayjsObj = dayjs();

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

function getLocalStorageTimeSlots() {}

function timeSlotLabel(timeIn24hr) {
  var label;
  if (timeIn24hr > 12) {
    label = `${timeIn24hr - 12}PM`;
  } else {
    label = `${timeIn24hr}AM`;
  }

  return label;
}

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

$(function () {
  var timeSlots = "";
  plannerEntries.forEach((entry) => {
    timeSlots += `
    <div id="hour-${
      entry.timeSlot
    }" class="row time-block ${isPastPresentOrFuture(entry.timeSlot)}">
      <div class="col-2 col-md-1 hour text-center py-3">${timeSlotLabel(
        entry.timeSlot
      )}</div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>
    `;
  });

  $("#timeSlots").html(timeSlots);

  $(".time-block").click(function (event) {
    console.log("CLICKY CLICKITY ", event.target);
    console.log("CLICKY CLICKITY ", $(this).index());
  });

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjsObj.format("MMMM DD, YYYY"));
});
