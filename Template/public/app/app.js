/**
 * Created by DMehta on 12/24/2016.
 */
(function(){
    var myApp=angular.module('myApp',['ngRoute','ngDialog','angular.filter','ngAnimate','toaster','ngResource']);

    myApp.config(['$provide',function($provide){

        $provide.decorator('$exceptionHandler',['$delegate',function($delegate){
            return function(exception,cause){
                $delegate(exception,cause);
                console.log(cause);
                alert(exception.message);
            };
        }]);
    }]);

    myApp.config(['$routeProvider','$locationProvider','ngDialogProvider',function($routeProvider,$locationProvider,ngDialogProvider){

        //$locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/',{templateUrl:'app/views/Home.html',controller:"homeController"})
            .when('/Forms',{templateUrl:'app/views/Forms.html',controller:"classController"});

        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            cache:false,
            showClose: true,
            closeByDocument: false,
            closeByEscape: true,
            appendTo: false,
            preCloseCallback: function () {
                console.log('default pre-close callback');
            }
        });
    }]);
})();








