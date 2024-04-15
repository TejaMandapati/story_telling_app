const{ObjectId} = require('mongodb');

let stories; //Instance of the collection class
exports.initCollection = (db) =>{
    stories = db.collection('stories');
}
exports.find = () => stories.find().toArray();

//exports.findById = id => stories.find(story=>story.id === id);
exports.findById = id => stories.findOne({_id: ObjectId(id)});
// exports.save = function (story) {
//     story.id = uuidv4();
//     story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
//     stories.push(story);
// };

exports.save = (story) => stories.insertOne(story);

/*exports.updateById = function(id, newStory) {
    let story = stories.find(story=>story.id === id);
    if(story) {
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
    }
 
}*/

exports.updateById = (id, newStory) => stories.findOneAndUpdate({_id: ObjectId(id)}, {$set: {title: newStory.title, content: newStory.content}});

exports.deleteById = id => stories.deleteOne({_id: ObjectId(id)});


/*exports.deleteById = function(id) {
    let index = stories.findIndex(story =>story.id === id);
    if(index !== -1) {
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
}*/