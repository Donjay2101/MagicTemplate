/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.factory('ClassService',['FormService','ToasterService',function(FormService,ToasterService){

        //var arrClass=[];
        var obj={};


        var createClass=function(ID){
            var nclass={};
            if(ID==null) {
                nclass.Name="";
                nclass.Properties=[];
            }
            else {
                var obj=FormService.getObject(ID);
                angular.copy(obj,nclass);
            }


            return nclass;
        }
        var arr=FormService.getObjects();

        var searchClassByName=function(name){
            var classes=FormService.getObjects();
            var found=null;
            angular.forEach(classes,function(sclass){
                if(sclass.Name.toUpperCase()==name.toUpperCase()) {
                    found=sclass;
                }
            });
            return found;
        }

        var removeClass=function(ID){

            var obj=FormService.getObject(ID);

            var index=arr.indexOf(obj);

            arr.splice(index,1);
            ToasterService.notify('class deleted successfully.');
        }


        return{
            createClass:function(ID){
                return createClass(ID);
            },
            save:function(object){

                if(object.ID==null)
                {

                    object.ID=arr.length+1;
                    arr.push(object);
                    ToasterService.notify('class added successfully.');
                }
                else
                {
                    var obj=FormService.getObject(object.ID);
                    var searchedObject=searchClassByName(object.Name);
                    if(searchedObject!=null && obj.ID!=searchedObject.ID){
                            ToasterService.notifyError('class with same exists.please use another name.');
                        return;
                    }
                    var index=arr.indexOf(obj);
                    arr[index]=object;
                    ToasterService.notify('class updated successfully.');
                }

                object=null;
            },
            removeClass:function(ID){
                    removeClass(ID);
            },
            searchClassByName:function(name){
                    return searchClassByName(name);
            },
            searchClassByID:function(ID){
                var classes=FormService.getObjects();
                var found=null;
                angular.forEach(classes,function(sclass){
                    if(sclass.ID==ID) {
                        found=sclass;
                    }
                });
                return found;
            },
            createProperty:function(){
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
        }

    }]);

})();