/**
 * Created by DMehta on 1/2/2017.
 */
var mongoose=require('mongoose');

var property=mongoose.model('Property',{
    Name:String,
    Type:String
});


module.exports=property;