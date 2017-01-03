/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.factory('ClassService',['$resource','FormService','ToasterService',function($resource,FormService,ToasterService){

        var ClassResource = $resource('/api/Classes', null,
            {
                'update': { method: 'PUT' }
            });
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

        var searchPropertyByID=function(properties,ID){
            var found=null;
            angular.forEach(properties,function(prop){
                if(ID==prop.ID){
                    found=prop;
                }
            });
            return found;
        }
        var searchPropertyByName=function(properties,searchName){
            var found=null;
            angular.forEach(properties,function(prop){
                if(searchName.toUpperCase()==prop.Name.toUpperCase()){
                    found=prop;
                }
            });
            return found;
        }

        var addProperty=function(nclass,property){
            var properties=nclass.Properties;
            var temp={};
            angular.copy(property,temp);
            var getProp=searchPropertyByName(properties,temp.Name);
            if(getProp!=null && getProp.ID!=property.ID)
            {
                ToasterService.notifyError('Property with  this name added already.');
                return;
            }
            if(property.ID!=null && property.ID !=0)
            {
                var prop=searchPropertyByID(nclass.Properties,property.ID);
                if(prop!=null){
                    var index=nclass.Properties.indexOf(prop);
                    nclass.Properties[index]=property;
                    /*prop=property;*/
                }
                else{
                    ToasterService.notifyError('Property not found.');
                    return;
                }
            }
            else {
                var ID=1;
                if(nclass.Properties.length>0 && nclass.Properties!=null)
                {
                    ID=nclass.Properties.length+1;
                }

                temp.ID=ID;
                nclass.Properties.push(temp);
                ToasterService.notify('property added successfully.');

            }


        }

        var removeProperty=function(nclass,ID){
            var properties=nclass.Properties;
            var prop=searchPropertyByID(properties,ID);
            nclass.Properties.splice(nclass.Properties.indexOf(prop),1);
        }


        return{
            getClasses:function(){
                return ClassResource.query();
            },
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
            createProperty:function(nclass,property){
                if(property == null){
                    var Property={};
                    Property.ID=0;
                    Property.Name="";
                    Property.Type="";
                    return Property;
                }
                else{
                    addProperty(nclass,property);
                }

            },
            removeProperty:function(nclass,ID){
                removeProperty(nclass,ID);
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
                return searchPropertyByName(properties,searchName);
            },
            searchPropertyByID:function(properties,ID){
                    return searchPropertyByID(properties,ID)
            }
        }

    }]);

})();