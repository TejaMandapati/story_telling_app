const User = require('../models/user');

exports.index = (req, res)=>{
    res.render('../index');
};
//get the sign up form
exports.new = (req, res)=>{
    res.render('./user/new');
};

//create a new uer
exports.create = (req, res, next)=>{
    let user = new User(req.body);
    user.save()
    .then(()=> res.render('./user/login'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            res.redirect('/users/new');
        }
        if(err.code === 11000){
            req.flash('error', 'email address is already in use');
            res.redirect('/users/new');
        }
        next(err);
    });
};

//get the login form
exports.login = (req, res)=>{
    res.render('./user/login');
};

//process login request
exports.loginUser = (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    //get the user that matches the mail
    User.findOne({email: email})
    .then(user=>{
        if(user){
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id; //store user's id in session
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
                }else{
                    req.flash('error', 'You have entered Wrong Password!');
                    res.redirect('/users/login');
                }
            })
            .catch(err=>next(err));
        } else{
            //console.log('wrong email address');
            req.flash('error', 'You have provided Wrong Email address!');
            res.redirect('/users/login');
        }
    })
    .catch(err=>next(err));
};

//get profile
exports.profile = (req, res, next)=>{
    let id = req.session.user;
    // console.log(req.flash());
    User.findById(id)
    .then(user=>res.render('./user/profile', {user}))
    .catch(err=>next(err));
};

//logout the user
exports.logout = (req, res, next)=>{
    req.session.destroy(err=> {
        if(err)
            return next(err);
        else 
            res.redirect('/');
    });
};


