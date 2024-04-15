const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
     firstName: {type: String, required: [true, 'First Name cannot left blank']},
     lastName: {type: String, required: [true, 'Last Name cannot left blank']},
     email: {type: String, required: [true, 'Email field cannot be empty'], unique: true},
     password: {type: String, required: [true, 'Password cannot be empty']},
     
 });
 
 //replace plaintext password with hashed password before saving the document in the database
 //pre middleware

 userSchema.pre('save', function(next){
     let user  = this;
     if(!user.isModified('password'))
        return next;
     bcrypt.hash(user.password, 10)
     .then(hash=>{
         user.password = hash;
         next();
     })
     .catch(err=>next(err));

 });

 //implement a method to compare the login password and the hash stored in the password
 userSchema.methods.comparePassword = function(loginPassword){
     return bcrypt.compare(loginPassword, this.password);
 }
module.exports = mongoose.model('User', userSchema);