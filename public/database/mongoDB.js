const mongoose = require('mongoose');

const dbURL = 'mongodb://0.0.0.0:27017/userDB'

mongoose.set('strictQuery',false);
mongoose.connect(dbURL).then(()=>{
    console.log("Conect . . .");
})

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    email : String
})

const user = mongoose.model('users',userSchema)

module.exports = user