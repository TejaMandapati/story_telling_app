const model=require('../models/story');

exports.index=(req,res)=>{
    //res.send('Send all stories');
    //res.send(model.find());
    let stories=model.find();
    res.render('./story/index',{stories});
};

exports.new=(req,res)=>{
   // res.send('Send new HTML form');
    res.render('./story/new')

};


exports.create=(req,res)=>{
    //res.send('created a new story');
    //console.log(req.body);
    let story = req.body;
    model.save(story);
    res.redirect('/stories');
};

exports.show=(req,res,next)=>{
    //res.send('send story with id ' + req.params.id);
    let id=req.params.id;
    let story=model.findById(id);
    //res.send(story);
    if(story){
    res.render('./story/show', {story});
}else{
    //res.status(404).send('Cannot find story with id ' + id);
    let err =new Error('Cannot find story with id ' + id);
    err.status=404;
    next(err);
}
};

exports.edit=(req,res,next)=>{
    let id=req.params.id;
    let story=model.findById(id);
    if(story){
        res.render('./story/edit', {story});
    }else{
        //res.status(404).send('Cannot find story with id ' + id);
        let err =new Error('Cannot find story with id ' + id);
        err.status=404;
        next(err);
        
    }
    //res.send('send the edit form');
};


exports.update=(req,res,next)=>{
   // res.send('update story with id ' + req.params.id);
   let story=req.body;
   //console.log(story);
   let id=req.params.id;
   if(model.updateById(id,story)){
       res.redirect('/stories/' + id);
   }else{
       //res.status(404).send('Cannot find story with id ' + id);
        let err =new Error('Cannot find story with id ' + id);
        err.status=404;
        next(err);
   }
};

exports.delete=(req,res,next)=>{
    //res.send('delete story with id ' + req.params.id);
    let id=req.params.id;
    if(model.deleteById(id)){
        res.redirect('/stories');
    }else{
        //res.status(404).send('Cannot find story with id ' + id);
        let err =new Error('Cannot find story with id ' + id);
        err.status=404;
        next(err);
    }
};
