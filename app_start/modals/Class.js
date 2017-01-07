/**
 * Created by DMehta on 1/2/2017.
 */
var mongoose= require('mongoose');
var  autoIncrement = require('mongoose-auto-increment');
//var Property=require('/app_start/modals/Property.js');

var classSchema=new mongoose.Schema(
    {
        ID:{type:Number,  default: 0, unique:true},
        Name:String,
        Properties:[]
    }
);
var Class=mongoose.model('Class',classSchema);
module.exports=Class;

classSchema.plugin(autoIncrement.plugin,{model:"Class",field:'ID',
    startAt:1,
    incrementBy:1});

