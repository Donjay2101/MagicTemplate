/**
 * Created by DMehta on 12/25/2016.
 */
(function(){
    "use strict";
    var myApp=angular.module('myApp');

    myApp.factory('dialogService',['ngDialog',function(ngDialog){


      /*  var propertyTypes=[
            {"Name":"Double","Value":"double"},
            {"Name":"Float","Value":"float"},
            {"Name":"Int","Value":"int"},
            {"Name":"String","Value":"string"},
        ];
        $scope.PropertyTypes=propertyTypes;
        $scope.Test="Test";
        console.log($scope.Test);*/
       var dialogOpen=function(templateUrl,scope){
           ngDialog.open({
               template: templateUrl,
               className: 'ngdialog-theme-default',
               cache:false,
               scope:scope,
               height:530,
               width:800
           });
           // example on checking whether created `new_dialog` is open
       }


        return{
            popup:function(Url,scope){
                dialogOpen(Url,scope);
            }
        }
    }])

})();