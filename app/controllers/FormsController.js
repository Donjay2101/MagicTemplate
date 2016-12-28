/**
 * Created by DMehta on 12/25/2016.
 */

(function(){
        "use strict";
        var myApp=angular.module("myApp");
    myApp.controller('formController',['$scope','ngDialog',function($scope,ngDialog){




        var propertyTypes=[
            {"Name":"Double","Value":"double"},
            {"Name":"Float","Value":"float"},
            {"Name":"Int","Value":"int"},
            {"Name":"String","Value":"string"},
        ];
        $scope.PropertyTypes=propertyTypes;

        $scope.Test="test";
        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        $scope.Open=function(){
            ngDialog.open({
                template: 'app/views/edit.html',
                className: 'ngdialog-theme-default',
                cache:false,
                scope:$scope,
                height:530,
                width:750
            });
        };
    }]);
})();