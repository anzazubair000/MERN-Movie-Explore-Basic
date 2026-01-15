import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Genre:String,
    Released:String,
    Plot:String,
    Poster:String
})

const movieModel = mongoose.model('Movie', movieSchema)
export default movieModel