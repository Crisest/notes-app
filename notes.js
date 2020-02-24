const fs = require('fs')
const chalk = require('chalk')

const listNotes = () =>  { 
    let notesString = "Your notes:"
    const notes = loadNotes()
    notes.forEach((note) =>{
        notesString += " \r\n Title: " + note.title
    })
    console.log(chalk.blue(notesString))
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    }
    else{
        console.log(chalk.inverse.red("Note not found!"))
    }
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }
    else{
        console.log(chalk.red.inverse('Sorry, note title taken!'))
    } 
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesFiltered = notes.filter((note) => note.title !== title )
    if(notes.length === notesFiltered.length || notesFiltered.length === 0){
        console.log(chalk.red.inverse('No note found!'))
    }
    else{
        console.log(chalk.green.inverse('Note has been removed!'))
        saveNotes(notesFiltered)
    }
    
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
    
}



module.exports = {
    readNote: readNote,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes
}
/*notes

    debugger node --inspect-brk 
    chrome://inspect

*/