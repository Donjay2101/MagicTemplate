/**
 * Created by DMehta on 12/29/2016.
 */
(function(){
    "use strict";

    var app=angular.module('myApp');

    app.controller('classController',['$scope','$window','ngDialog','ClassService','FormService','ToasterService',function($scope,$window,ngDialog,ClassService,FormService,ToasterService){


       //initial data to show......

            $scope.Prop=ClassService.createProperty();

        //end of initial data to show......



        //Class Code

            //Save Class
           /* $scope.submit=function(){
                  ClassService.save($scope.class);
            };*/
            //end of Save Class


        //end of class code


        // Property  add delete and edit Code
        $scope.ButtonTitle="Add";
        $scope.isEdit=false;

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
                controller:'classController',
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
                    var ID=$scope.class.Properties.length+1;
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

        // End of Property  add delete and edit Code

    }]);
})();