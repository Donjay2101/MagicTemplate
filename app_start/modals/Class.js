/**
 * Created by DMehta on 1/2/2017.
 */
var mongoose=require('mongoose');
//var Property=require('/app_start/modals/Property.js');

var Class=mongoose.model('Class',{
    Name:String,
    Properties:[]
});

module.exports=Class;