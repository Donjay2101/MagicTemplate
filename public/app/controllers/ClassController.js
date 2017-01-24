/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.controller('classController',['$scope','$window','ngDialog','ClassService','ToasterService',function($scope,$window,ngDialog,ClassService,ToasterService){


       //initial data to show......






        $scope.Prop=ClassService.createProperty();

        //$scope.classes=ClassService.getClasses();

        //end of initial data to show......
        //$scope.class=ClassService.createClass(ID);


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



        $scope.objects=ClassService.getClasses();


       // $window.console.log($scope.objects);






        $scope.ButtonTitle="Add";
        $scope.isEdit=false;
        $scope.class=ClassService.createClass();



        //createClass();
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
            ClassService.getProperties(function(arr){
                // propertyTypes=arr;
                $scope.PropertyTypes=arr;
                if(ID==undefined)
                {
                    $scope.class=ClassService.createClass();
                    ngDialog.open({
                        template: 'app/views/edit.html',
                        className: 'ngdialog-theme-default',
                        cache:false,
                        scope:$scope,
                        height:530,
                        width:800
                    });
                }
                else
                {
                    ClassService.getClass(ID,function(nClass){
                        $scope.class=nClass;
                        ngDialog.open({
                            template: 'app/views/edit.html',
                            className: 'ngdialog-theme-default',
                            cache:false,
                            scope:$scope,
                            height:530,
                            width:800
                        });
                    });
                }

            });




            /*if(ID==undefined)
             {

             }
             else
             {

             }
             */

            //dialogService.open('app/views/edit.html',$scope);

        };

        $scope.saveClass=function(){
            if($scope.class.Properties!=null && $scope.class.Properties.length>0){

                ClassService.save($scope.class,function(classes){

                    //add class to objects...
                    $scope.objects=classes;

                    //add class to property types...
                    ClassService.getProperties(function(arr){
                        $scope.PropertyTypes=arr;
                    });
                });
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
                ClassService.removeClass(ID,function(classes){
                    $scope.objects=classes;
                });
            },function(reason){
                //at the time of cancellation
            });
        }

        // End of Property  add delete and edit Code

    }]);
})();