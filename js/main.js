// call load function at top of page

// declare variables

let form = document.querySelector('form')

// add eventlistener and function to call when submit button is clicked

form.addEventListener('submit', (event) => {
    event.preventDefault()

    formValidator()
})



// function - data validation for form
let inputId = document.querySelector('#inputId')
let inputTitle = document.querySelector('#inputTitle')
let inputDate = document.querySelector('#inputDate')
let inputNote = document.querySelector('#inputNote')
let validationMsg = document.querySelector('.validationMsg')

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
    console.log('Data accepted')
}

// function - load data from localstorage and display on page

// function - for edit button, moves data to form, removes data from localstorage

// function - for delete button, removes data from localstorage

// function - clear form (reset)