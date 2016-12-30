/**
 * Created by DMehta on 12/25/2016.
 */
(function(){
    "use strict";
    var myApp=angular.module('myApp');

    myApp.factory('dialogService',['$scope','ngDialog',function($scope,ngDialog){


        var propertyTypes=[
            {"Name":"Double","Value":"double"},
            {"Name":"Float","Value":"float"},
            {"Name":"Int","Value":"int"},
            {"Name":"String","Value":"string"},
        ];
        $scope.PropertyTypes=propertyTypes;
        $scope.Test="Test";
        console.log($scope.Test);
       var dialogOpen=function(templateUrl){
           ngDialog.open({
               template: templateUrl,
               className: 'ngdialog-theme-default',
               cache:false,
               scope:$scope
           });
           // example on checking whether created `new_dialog` is open
       }

        return{
            Open:function(Url){
                dialogOpen(Url);
            },
            PropertyTypes:propertyTypes
        }
    }])

})();