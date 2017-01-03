/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.controller('classController',['$scope','$window','ngDialog','ClassService','FormService','ToasterService',function($scope,$window,ngDialog,ClassService,FormService,ToasterService){


       //initial data to show......
        var propertyTypes=[
            {"Name":"Double","Value":"double"},
            {"Name":"Float","Value":"float"},
            {"Name":"Int","Value":"int"},
            {"Name":"String","Value":"string"},
        ];


        $scope.PropertyTypes=propertyTypes;

            $scope.Prop=ClassService.createProperty();

        //$scope.classes=ClassService.getClasses();

        //end of initial data to show......



        //Class Code

            //Save Class
           /* $scope.submit=function(){
                  ClassService.save($scope.class);
            };*/
            //end of Save Class


        //end of class code


        // Property  add delete and edit Code
        $scope.ButtonTitle="Add";
        $scope.isEdit=false;

        $scope.editProperty=function(ID){
            $scope.isEdit=true;
            var properties=$scope.class.Properties;
            var prop=ClassService.searchPropertyByID(properties,ID);

            var oldProp={},Prop={};

            angular.copy(prop,Prop);
            $scope.Prop=Prop;
            $scope.ButtonTitle="Edit";

          /*  angular.copy(prop,oldProp);
            $scope.OldProp=oldProp;*/

        }

        $scope.removeProperty=function(ID){
            $scope.message="you are about to delete a property.are you sure?";
            var confirmDialog=ngDialog.openConfirm({
                template:'app/views/confirmDialog.html',
                className:'ngdialog-theme-default',
                controller:'classController',
                cache:false,
                scope:$scope,
                controllerAs:'class',
            }).then(function(){
                var properties=$scope.class.Properties;
                var prop=ClassService.searchPropertyByID(properties,ID);
                $scope.class.Properties.splice($scope.class.Properties.indexOf(prop),1);
            },function(reason){
                    //at the time of cancellation
            });
        }

        $scope.addProperty=function(isValid){
            var temp={};

            if(isValid)
            {

                var properties=$scope.class.Properties;
                angular.copy($scope.Prop,temp);
                var getProp=ClassService.searchPropertyByName(properties,temp.Name);

                if($scope.isEdit)
                {

                    var _oldprop=ClassService.searchPropertyByID(properties,$scope.Prop.ID);
                    if(getProp!=null && getProp.ID!=_oldprop.ID)
                    {
                        ToasterService.notifyError('Property with  this name added already.');
                        return;
                    }
                    var index=$scope.class.Properties.indexOf(_oldprop);
                    $scope.class.Properties[index]=temp;
                    $scope.isEdit=false;
                    $scope.ButtonTitle="Add";
                }
                else
                {
                    if(getProp!=null)
                    {
                        ToasterService.notifyError('Property with  this name added already.');
                        return;
                    }
                    var ID=$scope.class.Properties.length+1;
                    temp.ID=ID;
                    $scope.class.Properties.push(temp);
                    ToasterService.notify('property added successfully.');
                }

                $scope.Prop=null;

                // $window.alert($scope.class.Name);

                //  $window.alert('ee');
                //ClassService.SaveProperty(prop);
            }

        }

        $scope.objects=ClassService.getClasses();

        $scope.Prop=ClassService.createProperty();





        $scope.ButtonTitle="Add";
        $scope.isEdit=false;

        var createClass=function(ID){
            $scope.class=ClassService.createClass(ID);
        }
        createClass();
        $scope.editProperty=function(ID){
            $scope.isEdit=true;
            var properties=$scope.class.Properties;
            var prop=ClassService.searchPropertyByID(properties,ID);

            var oldProp={},Prop={};

            angular.copy(prop,Prop);
            $scope.Prop=Prop;
            $scope.ButtonTitle="Edit";

            /*  angular.copy(prop,oldProp);
             $scope.OldProp=oldProp;*/

        }

        $scope.removeProperty=function(ID){
            $scope.message="you are about to delete a property.are you sure?";
            var confirmDialog=ngDialog.openConfirm({
                template:'app/views/confirmDialog.html',
                scope:$scope,
                controllerAs:'class',
            }).then(function(){
                ClassService.removeProperty($scope.class,ID);
            },function(reason){
                //at the time of cancellation
            });
        }

        $scope.addProperty=function(isValid){
            if(isValid)
            {
                ClassService.createProperty($scope.class,$scope.Prop);

                if($scope.isEdit){
                    $scope.isEdit=false;
                    $scope.ButtonTitle="Add";
                }
                $scope.Prop={ID:0,Name:"",Type:""};
            }

        }

        $scope.open=function(ID){
            createClass(ID);
            //dialogService.open('app/views/edit.html',$scope);
            ngDialog.open({
                template: 'app/views/edit.html',
                className: 'ngdialog-theme-default',
                cache:false,
                scope:$scope,
                height:530,
                width:800
            });
        };

        $scope.saveClass=function(){
            if($scope.class.Properties!=null && $scope.class.Properties.length>0){
                ClassService.save($scope.class);
            }
            else
                ToasterService.notifyError("no properties defined for class");


        };

        $scope.removeClass=function(ID){
            $scope.message="you are about to delete a property.are you sure?";
            var confirmDialog=ngDialog.openConfirm({
                template:'app/views/confirmDialog.html',
                className:'ngdialog-theme-default',
                cache:false,
                scope:$scope,
                controllerAs:'class',
            }).then(function(){
                ClassService.removeClass(ID);
            },function(reason){
                //at the time of cancellation
            });
        }

        // End of Property  add delete and edit Code

    }]);
})();