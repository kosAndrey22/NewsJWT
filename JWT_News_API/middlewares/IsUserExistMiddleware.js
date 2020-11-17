const jws = require('jws');
const config = require('../config');
const User = require('../models/userModel');
const { secret, token_algorithm} = config;


function checkUserExist (req, res, next) {
    if(!req.body.token) return res.sendStatus(400);
    const token = req.body.token;
    const isValid = jws.verify(token, token_algorithm, secret);
    if(isValid) {
        const decodedToken = jws.decode(token);
        let userName = decodedToken.payload.userName;
        User.findOne({userName: userName}, (err, user) => {
            if(!user) res.send({error:"please, logIn"});
            else {
                req.body.author = userName;
                next();
            }
        });
    } 
    else res.send({error:"invalid Token"});
};
module.exports = checkUserExist;