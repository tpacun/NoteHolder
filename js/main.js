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
    if (inputTitle.value === '') {
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
    if (inputId.value === '') {
        data.push({
            'title': inputTitle.value,
            'date': inputDate.value,
            'note': inputNote.value,
        })
    }
    else {
        data[inputId.value] = {
            'title': inputTitle.value,
            'date': inputDate.value,
            'note': inputNote.value,
        }
    }
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
        displayedNotes.insertAdjacentHTML('beforeend', `
        <div id="container${i}">
						<h3 id="title${i}">${note.title}</h3>
						<div>
							<button id="editButton${i}">Edit Note</button>
							<button id="deleteButton${i}">Delete Note</button>
						</div>
						<span id="date${i}">${note.date}</span>
						<span id="id${i}">${i}</span>
						<p id="note${i}>${note.note}</p>
					</div>
        `)
        // need to add event listeners to each button which calls a function which ACCEPTS an id
        document.querySelector(`#editButton${i}`).addEventListener('click', () => {editNote(i)})
        document.querySelector(`#deleteButton${i}`).addEventListener('click', () => {deleteNote(i)})
    })
}

// function - for edit button, moves data to form, removes data from localstorage

function editNote(num) {
    inputId.value = num
    inputDate.value = data[num].date
    inputNote.value = data[num].note
    inputTitle.value = data[num].title
    document.querySelector(`#container${num}`).remove()
}

// function - for delete button, removes data from localstorage

function deleteNote(num) {
    document.querySelector(`#container${num}`).remove()
    data.splice(num, 1)
    localStorage.setItem('data', JSON.stringify(data))

}

// function - clear form (reset)