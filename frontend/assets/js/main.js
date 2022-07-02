(function() {

	"use strict";

	// Methods/polyfills.

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

	// Vars.
		var	$body = document.querySelector('body');

	// Disable animations/transitions until everything's loaded.
		if ('addEventListener' in window) {

			$body.classList.add('is-preload');

			window.addEventListener('load', function() {
				$body.classList.remove('is-preload');
			});

		}

	// IE?
		if (navigator.userAgent.match(/(MSIE|rv:11\.0)/))
			$body.classList.add('is-ie');

})();

// variable declaration

let displayedNotes = document.querySelector('.notesDiv')
let inputId = document.querySelector('#inputId')
let inputTitle = document.querySelector('#inputTitle')
let inputDate = document.querySelector('#inputDate')
let inputNote = document.querySelector('#inputNote')
let validationMsg = document.querySelector('.validationMsg')
let form = document.querySelector('form')
const API_URL = '/api/notes'
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
    else if (inputNote.value === '') {
        validationMsg.innerHTML = '<p>Note Blank</p>'
    }
    else {
        validationMsg.innerHtml = ''
        acceptData()
        clearForm()
    }
}

// function - write data to localstorage


let acceptData = async () => {

//   readData()
    if (inputId.value === '') {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': inputTitle.value,
                'text': inputNote.value})
        })
    }
    else {
        const response = await fetch(API_URL + '/' + inputId.value, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': inputTitle.value,
                'text': inputNote.value})
        })
    }
    console.log('Data Accepted')
    readData()
}

// function - load data from localstorage and display on page

async function readData() {
    let response = await fetch(API_URL)
    data = await response.json()
    
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
        <div class="noteContainer" id="container${note._id}">
            <span id="id${note._id}">Note #${i}</span>
            <div class="buttonsContainer">
                <button id="editButton${note._id}">Edit Note</button>
                <button id="deleteButton${note._id}">Delete Note</button>
            </div>
            <h3 id="title${note._id}">${note.title}</h3>
			<span id="date${note._id}">Date: ${note.timestamp}</span>
            <p id="note${note._id}">${note.text ? note.text:''}</p>

        </div>
        `)
        // need to add event listeners to each button which calls a function which ACCEPTS an id
        document.querySelector(`#editButton${note._id}`).addEventListener('click', () => {editNote(i)})
        document.querySelector(`#deleteButton${note._id}`).addEventListener('click', () => {deleteNote(i)})
    })
}

// function - for edit button, moves data to form, removes data from localstorage

function editNote(num) {
    inputId.value = data[num]._id
    inputNote.value = data[num].text ? data[num].text:''
    inputTitle.value = data[num].title
    document.querySelector(`#container${data[num]._id}`).remove()
}

// function - for delete button, removes data from localstorage

async function deleteNote(num) {
    const response = await fetch(API_URL + '/' + data[num]._id, {
        method: 'DELETE'
    })

    document.querySelector(`#container${data[num]._id}`).remove()
    data.splice(num, 1)

}

// function - clear form (reset)

function clearForm() {
    inputId.value = ''
    inputTitle.value = ''
    inputDate.value = ''
    inputNote.value = ''

}