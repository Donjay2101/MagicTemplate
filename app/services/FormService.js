/**
 * Created by DMehta on 12/28/2016.
 */
(function(){
        "use strict";


    var app=angular.module('myApp');

    app.factory('FormService',function(){

        var objects=[
            {ID:1,Name:"Class A",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:2,Name:"Class B",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:3,Name:"Class C",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:4,Name:"Class D",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:5,Name:"Class E",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:6,Name:"Class F",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:7,Name:"Class G",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:8,Name:"Class H",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:9,Name:"Class I",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:10,Name:"Class J",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:11,Name:"Class K",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:12,Name:"Class L",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:13,Name:"Class M",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:14,Name:"Class N",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:15,Name:"Class O",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
            {ID:16,Name:"Class P",Properties:[{ID:1,Name:'P1',Type:'float'},{ID:2,Name:'P2',Type:'int'},{ID:3,Name:'p3',Type:'string'}]},
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