// call load function at top of page

// declare form variable

let form = document.querySelector('form')

// add eventlistener and function to call when submit button is clicked

form.addEventListener('submit', (event) => {
    event.preventDefault()
    formValidator()
})

// function - data validation for form

    // declare form variables
let inputId = document.querySelector('#inputId')
let inputTitle = document.querySelector('#inputTitle')
let inputDate = document.querySelector('#inputDate')
let inputNote = document.querySelector('#inputNote')
let validationMsg = document.querySelector('.validationMsg')

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
let data = []

let acceptData = () => {
    data = readData()
    data.push({
        'id': inputId.value,
        'title': inputTitle.value,
        'date': inputDate.value,
        'note': inputNote.value
    })
    localStorage.setItem('data', JSON.stringify(data))
    console.log('Data Accepted', data)
    readData()
}

// function - load data from localstorage and display on page

let readData = () => {
    data = JSON.parse(localStorage.getItem('data'))
    
    // not sure if will/would have reason to keep this separate from placing updated data into the html, but going to keep the load/parsing separate from that for now

    createNotes()
}

// function - load notes into html

let displayedNotes = document.querySelector('.notesDiv')

let createNotes = () => {
    displayedNotes.innerHTML = '' // reset notes
    data.forEach((note, i) => {
        displayedNotes.innerHTML += `
        <div id="">
						<h3>${note.title}</h3>
						<div>
							<button>Edit Note</button>
							<button>Delete Note</button>
						</div>
						<span>${note.date}</span>
						<span>${note.id}</span>
						<p>${note.note}</p>
					</div>
        `
    })
}


// function - for edit button, moves data to form, removes data from localstorage

// function - for delete button, removes data from localstorage

// function - clear form (reset)