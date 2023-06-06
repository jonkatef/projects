//  date validation current day  ---------------------------------------------
const todayDate = new Date();
let month = todayDate.getMonth() + 1;
let year = todayDate.getUTCFullYear();
let tdate = todayDate.getDate();
if (month < 10) {
    month = "0" + month;
}
if (tdate < 10) {
    tdate = "0" + tdate;
}
let maxDate = year + "-" + month + "-" + tdate;
document.getElementById("noteDate").setAttribute("min", maxDate);
console.log(maxDate);

const formBtn = document.getElementById("formBtn");
formBtn.addEventListener("click", (e) => {
    // form validation -------------------------------------
    const noteTitle = document.getElementById("noteTitle");
    const noteDescription = document.getElementById("noteDescription");
    const noteDate = document.getElementById("noteDate");
    const noteTime = document.getElementById("noteTime");

    if (noteTitle.value === "") {
        alert("Enter title");
        noteTitle.style.outlineColor = "red";
        noteTitle.focus();
        return false;
    } else if (noteDescription.value === "") {
        alert("Enter description");
        noteDescription.style.outlineColor = "red";
        noteDescription.focus();
        return false;
    } else if (noteTime.value === "") {
        alert("Enter time");
        noteTime.style.outlineColor = "red";
        noteTime.focus();
        return false;
    } else if (noteDate.value === "") {
        alert("Enter date");
        noteDate.style.outlineColor = "red";
        noteDate.focus();
        return false;
    }

    // local storage ----------------------------------------------------
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: noteTitle.value,
        description: noteDescription.value,
        date: noteDate.value,
        time: noteTime.value,
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));

    noteTitle.value = "";
    noteDescription.value = "";
    noteDate.value = "";
    noteTime.value = "";

    displayNotes();
});

// SHOW NOTES ON THE BOARD -------

const displayNotes = () => {
    let notes = localStorage.getItem("notes");
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="note">
        <div class="icons">
        <button id="${index}" onclick="deleteNote(this.id)" class="iconsBtn" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete note"><i class="fa-solid fa-trash"></i> </button>
       
        <button id="${index}" onclick="editNote(this.id)" class="iconsBtn" data-bs-placement="top" title="Edit note" ><i class="fa-solid fa-pen-to-square" ></i></button>
    </div>
    <p hidden class="note-counter">${index + 1}</p>
    <h3 class="note_title noteInput">${element.title}
    </h3>
    <p class="note_description noteInput">${element.description}</p>
    <div class="time_date_cont">
        <span class="timeDate">${element.date}</span>
        <span class="timeDate">${element.time}</span>
    </div>
        </div>
            `;
        // <i class="fa-solid fa-xmark" ></i> <i class="fa-regular fa-trash-can"></i>
    });

    //  <button class="iconsBtn"><i class="fa-solid fa-check"></i></button>

    let notesElm = document.getElementById("note-container");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<p class="massage">There are no notes yet, add a new one.</p>`;
    }
};

// Function to delete a note ----------------------------------------------
const deleteNote = (index) => {
    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));

        displayNotes();
    }
};

// Function to Edit the Note ---------------------------------------------
function editNote(index) {
    let notes = localStorage.getItem("notes");
    const noteTitle = document.getElementById("noteTitle");
    const noteDescription = document.getElementById("noteDescription");
    const noteDate = document.getElementById("noteDate");
    const noteTime = document.getElementById("noteTime");

    if (
        noteTitle.value !== "" ||
        noteDescription.value !== "" ||
        noteDate.value !== "" ||
        noteTime.value !== ""
    ) {
        return alert("Please clear the form before editing a note");
    }

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
        noteTitle.value = element.title;
        noteDescription.value = element.description;
        noteDate.value = element.date;
        noteTime.value = element.time;
    });
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    displayNotes();
}

// Tooltips --------------
// const Tooltips = document.querySelector(".iconsBtn");
// Tooltips.forEach((t) => {
//     new bootstrap(t);
// });

const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);