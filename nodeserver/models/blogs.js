const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    snippet: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    }
},{timestamps:true})

//it looks for Blogs(plural of 1st arg) in the db
//the arg shud be the singular form of the collection name
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog