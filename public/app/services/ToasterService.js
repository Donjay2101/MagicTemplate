/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.factory('ToasterService',['toaster',function (toaster){


        return{
            notify:function(msg){
                //return msg;
                toaster.pop('success', "Information",msg,3000,'trustedHtml');

            },
            notifyError:function(err){
                toaster.pop('error',"Error!",err,3000,'trustedHtml');
            },
            notifyWarning:function(err){
                toaster.pop('warning',"Warning!",err,3000,'trustedHtml');
            }

        }


    }]);

})();