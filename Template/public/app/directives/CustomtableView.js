/**
 * Created by DMehta on 12/25/2016.
 */
(function(){
    "use strict";
        var myApp=angular.module('myApp');


    myApp.directive('customTable',function(){
        return{
            restrict:'E',
            templateUrl:'app/views/CustomTable.html',
            /*scope:{
                modal:"=data",
            },
            link:function(scope,element,attrs){

            }*/
        }

    });



})();