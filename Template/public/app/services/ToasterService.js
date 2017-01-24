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
                toaster.pop('success', "Information",msg,2000,'trustedHtml');

            },
            notifyError:function(err){
                toaster.pop('error',"Error!",err,2000,'trustedHtml');
            },
            notifyWarning:function(err){
                toaster.pop('warning',"Warning!",err,2000,'trustedHtml');
            }

        }


    }]);

})();