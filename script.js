const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
const roomsTag = document.querySelectorAll(".roombutton")
const instructionstext = document.querySelector(".infotext")
// getting new date, current year and month

// need these 2 conditions in order to turn true in order to generate timigs
let roomclicked = false;
let dateclicked = false;



let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                    //  && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive day">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();




let activeDay = document.querySelector("li.active");

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }

        renderCalendar(); // calling renderCalendar function
        activeDay = document.querySelector("li.active");

        daysTag.childNodes.forEach(day => { // getting day buttons
            day.addEventListener("click", () => { // adding click event on all day icons
                    // Set current day as active 
                    activeDay?.classList.remove("active")
                    day.classList.add("active")
                    activeDay = day
                    dateclicked = true
                    TimeslotGenerator();
                    

                    if (day.classList.contains("inactive")) {
                        if (day.classList.contains("day")) {
                            nextBtn.click()
                            dateclicked = false
                            TimeslotGenerator();
                            
                        } else {
                           prevBtn.click()
                           dateclicked = false
                           TimeslotGenerator();
                          
                        }
                    }
                    
            });
        });
    });
});

let prevBtn = document.querySelector("#prev")
let nextBtn = document.querySelector("#next")


//Prove it selected date
daysTag.childNodes.forEach(day => { // getting day buttons
    day.addEventListener("click", () => { // adding click event on all day icons
            // Set current day as active 
            activeDay?.classList.remove("active")
            day.classList.add("active")
            activeDay = day
            dateclicked = true
            TimeslotGenerator();

           

            // ensures that if click on inactive days that are blurred out, they are sent ot the next or previous page depending on their location
            if (day.classList.contains("inactive")) {
                if (day.classList.contains("day")) {
                    nextBtn.click()
                    dateclicked = false
                    TimeslotGenerator();
                    
                } else {
                    prevBtn.click()
                    dateclicked = false
                    TimeslotGenerator();
                    
                }
            }
            
    });
});



//Prove it selected room button
roomsTag.forEach(button => {
    button.addEventListener('click', function() {
      // Remove 'clicked' class from all buttons
      roomsTag.forEach(btn => {
        btn.classList.remove('clicked');
        
      });
  
      // Add 'clicked' class to the clicked button
      this.classList.add('clicked');
      roomclicked = true
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

// const timeslots = [
//     '08:00 - 09:00',
//     '09:00 - 10:00',
//     '10:00 - 11:00',
//     '11:00 - 12:00',
//     '12:00 - 13:00',
//     '13:00 - 14:00',
//     '14:00 - 15:00',
//     '15:00 - 16:00',
//     '16:00 - 17:00',
//     '17:00 - 18:00'
//   ]

//   function createButtons() {
//     const buttonContainer = document.createElement('div'); // Create a container for the buttons
//     buttonContainer.classList.add('button-container'); // Add a class for styling
  
//     timeslots.forEach(slot => {
//       const timeSlotButton = document.createElement('timeslotbutton'); // Create a button for each time slot
//       timeSlotButton.textContent = slot; // Set button text with time slot
//       timeSlotButton.classList.add('timeslot-button'); // Add a class for styling



//       timeSlotButton.addEventListener('click', function() {
//         // Handle click event for each time slot button
//         console.log(`Selected time slot: ${slot}`);
//         // Perform actions specific to the selected time slot
//       });
      
//       buttonContainer.appendChild(timeSlotButton); // Append the button to the container
//     });
  
//     // Append the container to your desired element
//     const containerElement = document.getElementById('infotext'); // Get the container
//     containerElement.appendChild(buttonContainer); // Append the button container to the element
//   }
//   createButtons();
  


// to check the conditions within a room
function TimeslotGenerator() {
    if (roomclicked && dateclicked) {
        instructionstext.textContent = "GENERATE BOX";
      // to implement BOX GENERATION AND CHECKER HERE TO WORK WITH BACK END
      
      }
      
    else if (dateclicked) {
        // Only date is clicked
        instructionstext.textContent = "Select a room"
        // Perform actions when only date is clicked
      } else if (roomclicked) {
        // Only room is clicked
        instructionstext.textContent = "Select a date"
        // Perform actions when only room is clicked
      } else {
        // Neither room nor date is clicked
        instructionstext.textContent = "Select a room and date"
        // Perform actions when neither room nor date is clicked
      }
    
    
  }




