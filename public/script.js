const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
const roomsTag = document.querySelectorAll(".roombutton");
let instructionstext = document.querySelector(".infotext");
const slotContainer = document.getElementById("slotContainer");
const submitBtn = document.getElementById("submit");

const room_number = document.querySelector(".room-number");
const timeslot = document.querySelector(".timeslot");
const booking_date = document.querySelector(".booking-date");

const modal = document.getElementById("confirmationModal");
const overlay = document.getElementById("overlay");

let activeRoom = null;
let activeDay = null;
let activeTimeslot = null;

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday = i === date.getDate() && currMonth === new Date().getMonth();
    //  && currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li id=${`${currYear}-${
      currMonth + 1
    }-${i}`} class="${isToday}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive day">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();

activeDay = document.querySelector("li.active");

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }

    instructionstext = null;

    renderCalendar(); // calling renderCalendar function

    daysTag.childNodes.forEach((day) => {
      // getting day buttons
      day.addEventListener("click", () => {
        // adding click event on all day icons
        // Set current day as active

        // ensures that if click on inactive days that are blurred out, they are sent ot the next or previous page depending on their location
        if (day.classList.contains("inactive")) {
          activeDay = null;
          if (day.classList.contains("day")) {
            nextBtn.click();
            TimeslotGenerator();
          } else {
            prevBtn.click();
            TimeslotGenerator();
          }
        } else {
          activeDay?.classList.remove("active");
          day.classList.add("active");
          activeDay = day;
          TimeslotGenerator();
        }
      });
    });
  });
});

let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");

//Prove it selected date
daysTag.childNodes.forEach((day) => {
  // getting day buttons
  day.addEventListener("click", () => {
    // adding click event on all day icons
    // Set current day as active

    // ensures that if click on inactive days that are blurred out, they are sent ot the next or previous page depending on their location
    if (day.classList.contains("inactive")) {
      activeDay = null;
      if (day.classList.contains("day")) {
        nextBtn.click();
        TimeslotGenerator();
      } else {
        prevBtn.click();
        TimeslotGenerator();
      }
    } else {
      activeDay?.classList.remove("active");
      day.classList.add("active");
      activeDay = day;
      TimeslotGenerator();
    }
  });
});

//Prove it selected room button
roomsTag.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove 'clicked' class from all buttons
    activeRoom?.classList.remove("clicked");

    // Add 'clicked' class to the clicked button
    button.classList.add("clicked");
    activeRoom = this;
    TimeslotGenerator();
  });
});

/* Do an if else for the buttons displayed

if day and button not active, input 1 (dateclicked)
if day selected room not active, input 2
if day room selected day not select, input 3
if both selected, 
check with database on which slots are already taken
allow selection and hovering over taken slots.


*/

function createButtons(timeslots) {
  const buttonContainer = document.createElement("div"); // Create a container for the buttons
  buttonContainer.classList.add("button-container"); // Add a class for styling

  timeslots.forEach((timeslot) => {
    const timeSlotButton = document.createElement("button"); // Create a button for each time slot
    timeSlotButton.textContent = timeslot.time; // Set button text with time slot
    timeSlotButton.classList.add("timeslot-button"); // Add a class for styling
    timeSlotButton.setAttribute("id", timeslot.id);

    timeSlotButton.addEventListener("click", function () {
      // Handle click event for each time slot button
      activeTimeslot?.classList.remove("active");
      this.classList.add("active");
      activeTimeslot = this;

      // Perform actions specific to the selected time slot
    });

    buttonContainer.appendChild(timeSlotButton); // Append the button to the container
  });

  slotContainer.replaceChildren(buttonContainer);
}

function createInstructionText() {
  const textEl = document.createElement("div");
  textEl.classList.add("infotext");
  slotContainer.replaceChildren(textEl);
  return textEl;
}

// to check the conditions within a room
async function TimeslotGenerator() {
  const roomclicked = activeRoom !== null;
  const dateclicked = activeDay !== null;
  if (roomclicked && dateclicked) {
    const res = await fetch(
      `/timeslots/available?RoomId=${activeRoom.id}&date=${activeDay.id}`
    );
    const { timeslots } = await res.json();
    console.log(timeslots);
    createButtons(timeslots);
    // to implement BOX GENERATION AND CHECKER HERE TO WORK WITH BACK END
  } else {
    if (instructionstext == null) {
      instructionstext = createInstructionText();
    }

    if (dateclicked) {
      // Only date is clicked
      instructionstext.textContent = "Select a room";
      // Perform actions when only date is clicked
    } else if (roomclicked) {
      // Only room is clicked
      instructionstext.textContent = "Select a date";
      // Perform actions when only room is clicked
    } else {
      // Neither room nor date is clicked
      instructionstext.textContent = "Select a room and date";
      // Perform actions when neither room nor date is clicked
    }
  }
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function confirmBooking() {
  // Perform booking confirmation logic here
  closeModal();
  submit();
}

async function submit() {
  await fetch("/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      RoomId: Number(activeRoom.id),
      UserId: 1,
      TimeslotId: Number(activeTimeslot.id),
      date: activeDay.id,
    }),
  });

  TimeslotGenerator();
}

function updateBookingValues() {
  booking_date.textContent = activeDay.id;
  room_number.textContent = activeRoom.textContent;
  timeslot.textContent = activeTimeslot.textContent;
}

submitBtn.addEventListener("click", async (e) => {
  if (activeRoom === null || activeTimeslot === null || activeDay === null) {
    alert("Please select all the necessary stuff");
  } else {
    updateBookingValues();
    openModal();
  }
});
