/*Local Storage*/
window.Mybry = {};

Mybry.transitionEnd  = function(dom,callback){
    if(!dom || typeof dom != 'object' ) return false;

    dom.addEventListener('transitionEnd',function(){
        callback && callback();
    });
    dom.addEventListener('webkitTransitionEnd',function(){
        callback && callback();
    });
};


Mybry.wdb = {
    //custom key
    constant : {
        TABLE_NAME:"calc",     //table name
        SEPARATE:"-"            //
    },
    //the latest id, increment
    getId : function(){
        var id = 0;  //key id
        var appDataKey = this.getKeyArray();
        var spearate = this.constant.SEPARATE;
        if(appDataKey.length>0){
            var indexArray = [];    //all id
            for(var i=0; i<appDataKey.length; i++){
                indexArray.push(parseInt(appDataKey[i].split(spearate)[1]));
            }
            id = this._maxId(indexArray) + 1;
        }
        return id;
    },
    //get the single key
    getItem : function(value){
        if(!value) return false;
        if(isNaN(value)){
            return localStorage.getItem(value);
        }else{
            var key = localStorage.key(parseInt(value));
            return localStorage.getItem(key);
        }
    },
    deleteItem : function(value){
        if(!value) return false;
        if(isNaN(value)){
            //if *, delete all
            if(value === "*"){
                var appDataKey = this.getKeyArray();
                for(var i=0; i<appDataKey.length; i++){
                    localStorage.removeItem(appDataKey[i]);
                }
            }else{
                localStorage.removeItem(value);
            }
        }else{
            var key = localStorage.key(parseInt(value));
            localStorage.removeItem(key);
        }
        return true;
    },
    _maxId : function(array){
        if(!array) return false;
        if(!Array.isArray(array)) return false;
        array.sort(function(a,b){
            return a - b;
        });
        return array[array.length-1];
    },
    getKeyArray : function(){
        var localStorage = window.localStorage;
        var storageLen = localStorage.length;
        var spearate = this.constant.SEPARATE,
            tableName = this.constant.TABLE_NAME;
        //all data
        var appDataKey = [];
        if(storageLen>0){
            var itemKey = "";
            for(var i=0; i<storageLen; i++){
                //calc-0
                itemKey = localStorage.key(i);
                //use data?
                var flagIndex = itemKey.indexOf(spearate);
                if(flagIndex != -1 ){
                    var startWord = itemKey.split(spearate)[0];
                    if(startWord == tableName){
                        appDataKey.push(itemKey);
                    }
                }
            }
        }
        return appDataKey;
    }
};


