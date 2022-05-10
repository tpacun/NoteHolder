// variable declaration

let displayedNotes = document.querySelector('.notesDiv')
let inputId = document.querySelector('#inputId')
let inputTitle = document.querySelector('#inputTitle')
let inputDate = document.querySelector('#inputDate')
let inputNote = document.querySelector('#inputNote')
let validationMsg = document.querySelector('.validationMsg')
let form = document.querySelector('form')
let data = []

// call load function at top of page

readData()

// add eventlistener and function to call when submit button is clicked

form.addEventListener('submit', (event) => {
    event.preventDefault()
    formValidator()
})

// function - data validation for form

// function - rejects inputs if any of the fields are blank

let formValidator = () => {
    if (inputId.value === '') {
        validationMsg.innerHTML = '<p>ID Blank</p>'
    }
    else if (inputTitle.value === '') {
        validationMsg.innerHTML = '<p>Title Blank</p>'
    }
    else if (inputDate.value === '') {
        validationMsg.innerHTML = '<p>Date Blank</p>'
    }
    else if (inputNote.value === '') {
        validationMsg.innerHTML = '<p>Note Blank</p>'
    }
    else {
        validationMsg.innerHtml = ''
        acceptData()
    }
}

// function - write data to localstorage


let acceptData = () => {
    readData()
    data.push({
        'id': inputId.value,
        'title': inputTitle.value,
        'date': inputDate.value,
        'note': inputNote.value,
    })
    localStorage.setItem('data', JSON.stringify(data))
    console.log('Data Accepted', data)
    readData()
}

// function - load data from localstorage and display on page

function readData() {
    data = JSON.parse(localStorage.getItem('data'))
    
    // not sure if will/would have reason to keep this separate from placing updated data into the html, but going to keep the load/parsing separate from that for now

    // adding conditional to check for if there is data (will be null and throw error if empty)
    if (data !== null) {
        createNotes()
    }
    else {
        data = []
    }
}

// function - load notes into html



function createNotes() {
    displayedNotes.innerHTML = '' // reset notes
    data.forEach((note, i) => {
        displayedNotes.innerHTML += `
        <div id="container${note.id}">
						<h3 id="title${note.id}">${note.title}</h3>
						<div>
							<button id="editButton${note.id}">Edit Note</button>
							<button id="deleteButton${note.id}">Delete Note</button>
						</div>
						<span id="date${note.id}">${note.date}</span>
						<span id="id${note.id}">${note.id}</span>
						<p id="note${note.id}>${note.note}</p>
					</div>
        `
        // need to add event listeners to each button which calls a function which ACCEPTS an id
        document.querySelector(`#editButton${note.id}`).addEventListener('click', () => {editNote(note.id)})
        document.querySelector(`#deleteButton${note.id}`).addEventListener('click', () => {deleteNote(note.id)})
    })
}

// function - for edit button, moves data to form, removes data from localstorage

function editNote(num) {

}

    // perhaps write delete function first - easier
    // needs to accept an id #
    // needs to deal with it in relativity

// function - for delete button, removes data from localstorage

function deleteNote(num) {
    document.querySelector(`#container${num}`).remove()
}
    // same as above, needs to function relatively

// function - clear form (reset)