const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const stories=[
    {
        id: '1',
        title: 'A funny story',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        author: 'Lijuan',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '2',
        title: 'It is raining',
        content:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
        author: 'Michael',
        createdAt: DateTime.local(2022, 6, 1, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
    }
];
//console.log(stories[1]);

// exports.find=function(){
//     return stories;
// }

exports.find=() => stories;

// exports.findById=function(id){
//     return stories.find(story=>story.id==id);
// };
exports.findById=id => stories.find(story=>story.id===id);

exports.save =function (story){
    story.id=uuidv4();
    story.createdAt=DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById=function(id,newStory){
    let story = stories.find(story=>story.id===id);
    if(story) {
        story.title=newStory.title;
        story.content=newStory.content;
        return true;
    } else {
        return false;
    }
};

exports.deleteById=function(id){
    let index=stories.findIndex(story=>story.id===id)
    if(index !== -1){
        stories.splice(index,1);
        return true;
    }else{
        return false;
    }
}