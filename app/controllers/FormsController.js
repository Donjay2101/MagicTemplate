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
                    className:'ngdialog-theme-default',
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
                    var ID=1;
                    if($scope.class.Properties!=null)
                    {
                        ID=$scope.class.Properties.length+1
                    }

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
            ClassService.save($scope.class);
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