/**
 * Created by DMehta on 12/25/2016.
 */

(function(){
        "use strict";
        var myApp=angular.module("myApp");
    myApp.controller('formController',['$scope','$window','ngDialog','FormService','ClassService','ToasterService',function($scope,$window,ngDialog,FormService,ClassService,ToasterService){


        var propertyTypes=[
            {"Name":"Double","Value":"double"},
            {"Name":"Float","Value":"float"},
            {"Name":"Int","Value":"int"},
            {"Name":"String","Value":"string"},
        ];


        $scope.PropertyTypes=propertyTypes;



        /*$scope.Test="test";
        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];*/

        $scope.objects=FormService.getObjects();

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
            if($scope.class.properties!=null && $scope.class.properties.length>0){
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

    }]);
})();