window.onload = function(){
    clickFunction();
};

function clickFunction(){

    var keyboardpart = document.querySelectorAll("#bottom span");
    //Keyboardpart
    for(var i=0; i <keyboardpart.length; i++){
        key = keyboardpart[i];
        key.onclick = function() {
            var clickedbutton = this.dataset["number"];
            clickKey(clickedbutton);
        };
    }

    var expression = document.getElementById("expression");//expression
    var result =  document.getElementById("result"); //result
    var symbol = {"+":"+","-":"-","×":"*","÷":"/","%":"%","=":"="};//symbols
    var equals = document.getElementById("equals"); //Equals
    var presymbol = ""; //The penultimate symbol
    var currentsymbol =""; //Countdown first symbol
    var oldres = '';
    var preKey = "";            //The single key clicked
    var key = null;        //current single key

    function clickKey(clickedbutton){

        var exp = expression.innerHTML;	//expression
        var res = result.innerHTML; //result
        var lastDigit = exp.substring(exp.length-1,exp.length);  //Last digit in expression
        //Input when the key is not "AC"
        if(clickedbutton !== "AC"){
            //Convert display symbol *->×
            if(isNaN(clickedbutton)){
                clickedbutton = clickedbutton.replace(/\*/g,"×").replace(/\//g,"÷");
            }
            //Click a symbol
            //Get the latest
            if(symbol[clickedbutton]){
                presymbol = currentsymbol;
                currentsymbol = symbol[clickedbutton];
                if(preKey !== "=" && symbol[preKey]){//The key clicked is (not =) and (the previous key is not a symbol).
                    expression.innerHTML = exp.slice(0,-1) + clickedbutton; //example: 9+
                }else{  //is = or the previous key is a symbol
                    if(exp == ""){  //the beginning or the previous key is =, then click +
                        oldres = res; //the beginning is ""; oldres records the latest result
                        expression.innerHTML = res + clickedbutton; // example: 9+15=+
                    }else{ //example: 9+15-
                        expression.innerHTML += res + clickedbutton;
                    }
                    if(symbol[lastDigit]){ //example: 9+15-  ->  24 Calculate here. Like updating
                        //exp = express.innerHTML.replace(/×/g,"*").replace(/÷/g,"/");
                        if(presymbol == '-') {
                            var num = Number(oldres) - Number(res);
                        } else if(presymbol == '+') {
                            var num = Number(oldres) + Number(res);
                        } else if(presymbol == '*' || presymbol == '×') {
                            var num = Number(oldres) * Number(res);
                        } else if(presymbol == '/' || presymbol == '÷') {
                            var num = Number(oldres)/Number(res);
                        }
                        oldres = num;
                        result.innerHTML = oldres;
                    }
                }
            }else{//Clicked button is a number
                if(symbol[clickedbutton] || symbol[preKey] || res=="0"){ //
                    result.innerHTML = "";
                }
                result.innerHTML += clickedbutton; //example:99 res is 99    9+9 res is 9
            }
            preKey = clickedbutton;
        }
    }

    //equals:get the result
    equals.onclick = function(){
        equalsR();
    };

    function equalsR(){
        var exp = expression.innerHTML;
        var res = result.innerHTML;
        if(exp){
            var lastDigit = exp.substring(exp.length-1,exp.length);
            try{
                if(symbol[lastDigit] && res){ //9+15+=
                        presymbol = symbol[lastDigit];
                        if(presymbol == '-') {
                            var num = Number(oldres) - Number(res);
                        } else if(presymbol == '+') {
                            var num = Number(oldres) + Number(res);
                        } else if(presymbol == '*' || presymbol == '×') {
                            var num = Number(oldres) * Number(res);
                        } else if(presymbol == '/' || presymbol == '÷') {
                            var num = Number(oldres)/Number(res);
                        }
                    }else{ //general 9+15*4=
                        if(presymbol == '-') {
                            var num = Number(oldres) - Number(res);
                        } else if(presymbol == '+') {
                            var num = Number(oldres) + Number(res);
                        } else if(presymbol == '*' || presymbol == '×') {
                            var num = Number(oldres) * Number(res);
                        } else if(presymbol == '/' || presymbol == '÷') {
                            var num = Number(oldres)/Number(res);
                        }
                    }
            }catch(error){
                result.innerHTML = "<span style='font-size:0.5em;color:red'>Error：Bad Result</span>";
            }finally{
                expression.innerHTML = "";
                result.innerHTML = num;
                preKey = "=";
            }
        }
    }

    var resetButton = document.getElementById("reset");
    resetButton.onclick = function(){
        result.innerHTML = "0";
        oldres = "";
        expression.innerHTML = "";
    };






}
