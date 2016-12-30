/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.factory('ClassService',['FormService','ToasterService',function(FormService,ToasterService){

        //var arrClass=[];
        var obj={};

        return{
            CreateClass:function(){
               obj={};
                obj.Name="";
                obj.Properties=[];
               return obj;
            },
            Save:function(object){
                var arr=FormService.getObjects();
                arr.push(object);
                ToasterService.notify('class added successfully.');
                object=null;
            },
            CreateProperty:function(){
                    var Property={};
                return Property;
            },
            searchPropertyInClass:function(properties,searchElement){
                var found=null;
                    angular.forEach(properties,function(prop){
                            if(searchElement.Name==prop.Name){
                                found=prop;
                            }
                    });
                return found;
            },
            searchPropertyByName:function(properties,searchName){
                var found=null;
                angular.forEach(properties,function(prop){
                    if(searchName.toUpperCase()==prop.Name.toUpperCase()){
                        found=prop;
                    }
                });
                return found;
            },
            searchPropertyByID:function(properties,ID){
                var found=null;
                angular.forEach(properties,function(prop){
                    if(ID==prop.ID){
                        found=prop;
                    }
                });
                return found;
            }
            /*SaveProperty:function(prop){
               // obj.Property.push(prop);
            }*/
        }

    }]);

})();