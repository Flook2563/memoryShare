const mongoose = require('mongoose');

const dbURL = 'mongodb://0.0.0.0:27017/userDB'

mongoose.set('strictQuery',false);
mongoose.connect(dbURL).then(()=>{
    console.log("Conect Memory. . .");
})

const memorySchema = new mongoose.Schema({
    title : String,
    detail : String,
    writer : String,
    status : String
})

const memory = mongoose.model('memory',memorySchema)

module.exports = memory