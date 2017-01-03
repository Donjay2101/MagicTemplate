/**
 * Created by DMehta on 1/2/2017.
 */
var modalClass=require('./modals/Class');
var bodyParser = require('body-parser');

var parser=bodyParser.urlencoded({extended:false});
module.exports=function(app){

    app.get('/api/Classes',function(req,res){
        modalClass.find(function(err,clsObjects){

            if(err)
                res.send(err);

            res.json(clsObjects);
        });
    });

    app.post('/api/Class',parser,function(req,res){
        modalClass.create({
            Name:req.body.Name,
            Properties:req.body.Properties
        },function(err,mClass){
            if(err)
            {
                console.log(err);
                res.send(err);
            }
            modalClass.find(function(err,clsObjects){
                if(err)
                    res.send(err);
                res.json(clsObjects);
            });
        });


    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
}


