const express = require('express');
const jws = require('jws');
const mongoose = require('mongoose');
const cors = require('cors');
const sha256 = require('sha256');
const User = require('./models/userModel');
const Note = require('./models/noteModel');
const checkUserExist = require('./middlewares/IsUserExistMiddleware');
const checkUserCorrect = require('./middlewares/isUserCorrectMiddleware');
const config = require('./config');
const {port, secret, token_algorithm} = config;

const app = express();
app.listen(port, console.log('Express server running on port ', port));
mongoose.connect("mongodb://localhost:27017/jwtpsotsdb", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('DB connected');
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        res.send(users);
    })
});
app.delete('/users', (req, res) =>{
    User.remove({}, (err, result) => {
        Note.remove({}, (err, result) => {
            res.send('DB was cleaned');
        })
    });
});

app.get('/posts', (req, res, next) => {
    if(req.query.page && req.query.count){
        let startIndex = 0;
        let startPage = 1;
        let notesOnPage = req.query.count;
        req.query.page <= 0 ? startIndex = 0 : startIndex = (req.query.page - 1) * notesOnPage;	
        Note.find({}, function(err, notes){ 
            if (err) next(err);         
            else {
                notes.reverse();
                if (notes.length <= startIndex) startIndex = 0;
                startPage = (startIndex / 5) + 1;
                delete notes.text;
                const response = {
                    notes: notes.slice(startIndex, startIndex + notesOnPage),
                    length: notes.length,
                    page: startPage
                }
                res.send(response);
            }
        });
    }
    else res.sendStatus(400);
});
app.get('/posts/:id', (req, res, next) => {
    Note.findById(req.params.id, (err, note) => {
        if(err) next (err);
        else if(!note) res.send({error:'Invalid note ID'});
        else res.send(note);
    });
});
app.post('/posts', 
    (req, res, next ) => {checkUserExist(req, res, next)}, 
    (req, res, next) => {
    let newNote = new Note({
        author: req.body.author,
        title: req.body.title,
        text: req.body.text,
        createdAt: +new Date()
    });
    newNote.save(function (err, newNote) {
        if (err) next(err);
        else {
            res.send(newNote);				
        }
    });
});
app.put('/posts/:id', 
    (req, res, next ) => {checkUserExist(req, res, next)},
    (req, res, next ) => {checkUserCorrect(req, res, next)},
    (req, res, next) => {
    if(!req.body) return res.sendStatus(400);
    if(!req.params.id) return res.sendStatus(400);
    noteID = req.params.id;
    newAuthor = req.body.author;
    newTitle = req.body.title;
    newText = req.body.text;
    Note.findByIdAndUpdate(noteID, {
        author: newAuthor,
        title: newTitle,
        text: newText
    }, function(err, result) {
        if(err) next(err);
        else res.send(result);
    })
});
app.delete('/posts/:id', 
    (req, res, next ) => {checkUserExist(req, res, next)},
    (req, res, next ) => {checkUserCorrect(req, res, next)},
    (req, res, next) => {
    if(req.params.id){
        const NoteID = req.params.id
        Note.findById(NoteID, function(err, note){
            if(err) next(err);
            else {
                note.remove();
                res.send(`Note ${note.title} deleted`);
            }
        });
    }
    else res.sendStatus(400);
});

app.post('/SignUp', (req, res, next) => {
    if(!req.body.login || !req.body.password) return res.sendStatus(400);
    let {login, password} = req.body;
    const token = jws.sign({
        header: { alg: token_algorithm, typ: "JWT" },
        payload: {userName: login},
        secret: secret,
    });
    User.findOne({userName: login}, (err, user) => {
        if (err) next(err);
        if (!user) {
            let hashedPassword = sha256(password);
            let newUser = new User ({
                userName: login,
                password: hashedPassword,
            });
            newUser.save((err, user) => {
                if (err) next(err);
                else {
                    let responce = {
                        login: login,
                        token: token
                    }
                    res.send(responce);
                }
            });
        }
        else {
           res.send({error:'This username already taken'});
        }
    });
});
app.post('/SignIn', (req, res, next) => {
    if(!req.body.login || !req.body.password) return res.sendStatus(400);
    let {login, password} = req.body;
    User.findOne({userName: login}, (err, user) => {
        if (err) next(err);
        if (!user) {res.send({error:'Invalid username'});}
        else {
            if(sha256(password) == user.password){
                let token = user.token;
                let responce = {
                    login: login,
                    token: token
                }
                res.send(responce);
            }
            else res.send({error:'Invalid password'});				
        }
    });
});


app.use('/articles',(err, req, res, next) => {
    console.log(err.message);
    if(~err.message.indexOf('Cast to ObjectId failed')) res.sendStatus(500);
    else res.sendStatus(404);
});