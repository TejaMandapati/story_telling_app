const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {type: String, required: [true, 'title is requird']},
    author: {type: String, required: [true, 'author is requird']},
    content: {type: String, required: [true, 'content is requird'], minLength: [10, 'the content should have atleast 10 characters']}
 },
 {timestamps: true}
 );

 /*collection name is stories in database
 const Story = mongoose.model('Story', storySchema);

 let story = new Story ({
     title: 'test',
     author: 'Lijuan',
     content: 'test'
 });

 story.validate()
 .then(()=>{
     console.log('validated successfully');
 })
 .catch(err=>console.log(err.message));
 console.log(story);
 */

 //collection name is stories in database
 module.exports  = mongoose.model('Story', storySchema);