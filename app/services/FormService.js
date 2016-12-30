/**
 * Created by DMehta on 12/28/2016.
 */
(function(){
        "use strict";


    var app=angular.module('myApp');

    app.factory('FormService',function(){

        var objects=[
            {ID:1,Name:"Class A",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:2,Name:"Class B",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:3,Name:"Class C",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:4,Name:"Class D",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:5,Name:"Class E",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:6,Name:"Class F",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:7,Name:"Class G",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:8,Name:"Class H",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:9,Name:"Class I",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:10,Name:"Class J",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:11,Name:"Class K",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:12,Name:"Class L",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:13,Name:"Class M",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:14,Name:"Class N",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:15,Name:"Class O",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]},
            {ID:16,Name:"Class P",Properties:[{Name:'P1',Type:'float'},{Name:'P2',Type:'int'},{Name:'p3',Type:'string'}]}
        ];


        return{
            getObjects:function(){
                return objects;
            },
            getObject:function(ID){
                var obj=null;
                angular.forEach(objects,function(object){
                    if(object.ID==ID){
                        obj=object;
                    }
                });
                return obj;
            }
        }

    });


})();