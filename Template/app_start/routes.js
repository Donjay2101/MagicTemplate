/**
 * Created by DMehta on 1/2/2017.
 */
var modalClass=require('./modals/Class');
var bodyParser = require('body-parser');
var path=require('path');
var mongoose= require('mongoose');
var parser=bodyParser.urlencoded({extended:false})

module.exports=function(app){

    //Get all Classes.....
    app.get('/api/Classes',function(req,res){
            modalClass.find({},function(err,clsObjects){
                if(err)
                {
                    res.send(err);
                }
                // console.log(clsObjects);
                res.json(clsObjects);
            });
    });

    //Get all Class By Name or ID.....
    app.get('/api/Classes/:param/:By',function(req,res){
        var name=req.params.param;
        var by=req.params.By;

        var query = {};
        if(by.toUpperCase()=="ID"){
            query = { "ID":name };
        }
        else {
            query = { "Name": name };
        }

        modalClass.findOne(query,function(err,obj){
            if(err)
            {
                console.log(err);
                res.send(err);
            }

           // console.log(obj);
            res.json(obj);
        });
    });

    app.post('/api/Classes',parser,function(req,res){

        modalClass.create({
            Name:req.body.Name,
            Properties:req.body.Properties
        },function(err,newClass){
            if(err)
            {
                console.log(err);
                res.send(err);
            }
            else{
                ///send newly added data.
               // res.send(newClass);
                //If send all data  to response
                modalClass.find({}, function(err,clsObjects) {
                   // if (err) throw err; /*res.send(err);*/
                    // object of all the users
                    //console.log(clsObjects);
                    res.json(clsObjects);
                });
            }




        });


    });

    app.put('/api/Classes',parser,function(req,res){
            //var ID=req.params.param;
        var gClass=req.body;
        //console.log(gClass);
        gClass._id="";
        var ID=gClass.ID;
        var update={
            Name:gClass.Name,
            ID:gClass.ID,
            Properties:gClass.Properties
        };
        modalClass.findOneAndUpdate({ID:gClass.ID},update,{upsert:true,new:true},function(err,d){
            if(err)
            {
                res.send(err);
            }
            //console.log(d);

            modalClass.find({}, function(err,clsObjects) {
                // if (err) throw err; /*res.send(err);*/
                // object of all the users
                //console.log(clsObjects);
                res.json(clsObjects);
            });

        });


       /* modalClass.find({ID:gClass.ID},function(err,user){
            if(err)
            {
                console.log(err);
                res.send(err);
            }

            user= _.extend(user,gClass);
            //user=data;
            user.update({ID:user},function(err){
                if(err) {
                    console.log(err);
                    res.send(err);
                }
                console.log("data added successfully")
            });
        });
*/
    });

    app.delete('/api/Classes/:param',function(req,res){

        var ID=req.params.param;
        //console.log(ID);
        modalClass.remove({ID:ID},function(err){
            if(err)
            {
                console.log(err);
                res.send(err);
            }

            modalClass.find({}, function(err,clsObjects) {
                // if (err) throw err; /*res.send(err);*/
                // object of all the users
                //console.log(clsObjects);
                res.json(clsObjects);
            });

        })
    });

    app.get('*', function(req, res) {

        res.sendfile('.public/index.html');
       // res.sendFile('index.html',{root: __dirname}); // load the single view file (angular will handle the page changes on the front-end)
    });
}


