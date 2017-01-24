/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');
    function resourceErrorHandler(response) {
        console.log('error'+response);
    }

    app.factory('ClassService',['$resource','ToasterService',function($resource,ToasterService){

             var ClassResource = $resource('/api/Classes/:param/:By',null,
                     {
                         'update':{method:'PUT',isArray:true,interceptor : {responseError : resourceErrorHandler}},
                         'save':   {method:'POST',isArray:true,interceptor : {responseError : resourceErrorHandler}},
                         'delete':   {method:'DELETE',isArray:true,interceptor : {responseError : resourceErrorHandler}},
                         'remove': {method:'DELETE',isArray:true,interceptor : {responseError : resourceErrorHandler}}

                     });
        /*,
            {
                'get':    {method:'GET',params: {Id: '@id'},
                    interceptor : {responseError : resourceErrorHandler}},
                'update':    {method:'PUT',
                    interceptor : {responseError : resourceErrorHandler}},
                'save':   {method:'POST'},
                'query':  {method:'GET',isArray:true,
                    interceptor : {responseError : resourceErrorHandler}},
                'remove': {method:'DELETE'},
                'delete': {method:'DELETE'}
            });*/
        //var arrClass=[];
        //var obj={};



        var classes=ClassResource.query();
        var getClass=function(ID,callback){
            var nclass={};
            //var ID=ID+'?SearchBy="ID"';
            var obj= ClassResource.get({param:ID,By:'ID'},function(){
                angular.copy(obj,nclass);
                callback(nclass);
            });
        }

        var createClass=function(){
            var nclass={};
            nclass.Name="";
            nclass.Properties=[];
            return nclass;
        }


        var searchClassByName=function(name,callback){
           // var classes=FormService.getObjects();
            var found=null;
            //var name=name+'?SearchBy="Name"';
          var s= ClassResource.get({param:name,By:'Name'},function(){
               found=s;
              callback(found);
                console.log(found);
           });
           /* angular.forEach(classes,function(sclass){
                if(sclass.Name.toUpperCase()==name.toUpperCase()) {
                    found=sclass;
                }
            });
            return found;*/
        }

        var removeClass=function(ID,callback){

            ClassResource.delete({param:ID},function(classes){
                callback(classes);
                ToasterService.notify('class deleted successfully.');
            });

           /* var obj=ClassResource.get(ID);''

            var index=arr.indexOf(obj);

            arr.splice(index,1);*/

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
               // console.log();
                return classes;
            },
            getClass:function(ID,callBack){
                return getClass(ID,callBack);
            },
            createClass:function(){
                return createClass();
            },
            save:function(object,callback){
                searchClassByName(object.Name,function(obj){
                    console.log(obj);
                    if(obj!=null && obj.ID!=undefined && obj.ID!=object.ID)
                    {
                        ToasterService.notifyError('class with same name already exist.use another one.');
                        return;
                    }

                    if(object.ID==null)
                    {
                        ClassResource.save(object,function(classes){
                            callback(classes);
                            ToasterService.notify('class added successfully.');
                        });
                        //arr.push(object);
                    }
                    else
                    {

                        ClassResource.update(object,function(classes){
                            callback(classes);
                            ToasterService.notify('class updated successfully.');
                        })
                        //var obj=FormService.getObject(object.ID);
                       /* var searchedObject=searchClassByName(object.Name);
                        if(searchedObject!=null && obj.ID!=searchedObject.ID){
                            ToasterService.notifyError('class with same exists.please use another name.');
                            return;
                        }
                        var index=arr.indexOf(obj);
                        arr[index]=object;*/

                    }


                });



            },
            removeClass:function(ID,callback){
                    removeClass(ID,callback);
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
                    Property.TypeName="";
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