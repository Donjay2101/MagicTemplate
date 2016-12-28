/**
 * Created by DMehta on 12/24/2016.
 */
(function(){
    var myApp=angular.module('myApp',['ngRoute','ngDialog','angular.filter']);
    myApp.config(['$routeProvider','$locationProvider','ngDialogProvider',function($routeProvider,$locationProvider,ngDialogProvider){

        //$locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('');
        $routeProvider
            .when('/',{templateUrl:'app/views/Home.html',controller:"homeController"})
            .when('/Forms',{templateUrl:'app/views/Forms.html',controller:"formController"});

        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
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








