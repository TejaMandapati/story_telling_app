const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   // name: {type: String, required: true}, If we want to print our own customized message use below format
    name: {type: String, required: [true, 'name field is required']},
    age: {type: Number, 
          required: [true, 'Age field is required'], 
          min : [1, 'minimum age is 1'], 
          max: [120, 'maximum age is 120']},
    //for enum testing
    rank: {type: String,
            required: [true, 'rank is requird'],
            enum: ['private', 'sergeant', 'captain', 'major']
        },
    //for match testing
    phone: {type:  String, 
            required: [true, 'phone is required'],
            match: [/\d{3}-\d{3}-\d{4}/, 'Phone number is not valid']}
});

const User = mongoose.model('User', userSchema);
const user = new User({
    name: 'Navakanth',
    age: 25,
    rank: 'major',
    phone: '682-246-8146' 
});
console.log(user);

user.validate()
.then(()=> console.log('Document is validated'))
.catch(err=>console.log(err.message))
//console.log(user);