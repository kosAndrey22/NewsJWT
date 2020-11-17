const Note = require('../models/noteModel');

function checkUserCorrect (req, res, next) {
    let userName = req.body.author;
    let noteID = req.params.id;
    Note.findById(noteID, (err, note) => {
        console.log(note);
        if(note.author == userName){
            console.log('true');
            next();
        }
        else {
            res.send({error:"You don't have permission to this"});
        }
    })
}
module.exports = checkUserCorrect;