# NoteHolder
A webapp I wrote that will take quick notes in the browser. Includes ability to edit and delete the notes, as well as save them statically within local storage so you can come back to them after leaving the page.

**Link to project:** https://noteholderapp.herokuapp.com/

![alt tag](/planning/screenshot_website.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

Based upon my previous experiences and struggles with project creep, I wanted to go into this one with a plan. Before starting to write code, I actually sat down and designed the functionality I wanted it to have. This was just a simple flowchart but I found forcing myself to think about the implemenation of each function before getting into the weeds was super helpful. When I did start to actually write the code, I found that this helped with keeping each function more succinct as well as stopped me from accidentally starting to creep beyond the initial scope of the project. I've included this in the repo and below:

![Flow chart of the note taking app functionality](https://raw.githubusercontent.com/tpacun/notes_app/main/planning/Note_App.jpg)

I implemented this flow without any major changes - each point in the flow chart corresponds with a function in main.js. The JavaScript is all client-side and uses local storage to store the user's notes. This all displays full CRUD functionality - you can CREATE, UPDATE, and DELETE each note and the website will READ anything in local storage kept from a previous session.

## Optimizations

Future optimizations for this that would include making it full-stack - using Node and a database. I'd also like to include a login/authorization function as well.

## Lessons Learned:

How much planning a project can help out with implementation! Seriously cannot understate how much easier this was to think about when running into problems, as each function served a smaller and more concise purpose.