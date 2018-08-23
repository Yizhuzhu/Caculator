
window.onload = function(){
    clickFunction();
};

function clickFunction(){
	var canvas = document.getElementById("canvas");
    var calc = document.getElementById("calc");
    var spans = document.getElementById("toptool").getElementsByTagName("span");//toptoolbar
    var close = document.getElementById("close"),       //close window
        max = document.getElementById("max"),           //max window
        resize = document.getElementById("resize");     //resize window
   //About historybox
    var historyPanel = document.getElementById("historyPanel"),
        deleteAll = historyPanel.querySelector(".remove a");
    var historyUl = historyPanel.querySelector("ul"); 
    //Result Div
    var resultDiv = document.getElementById("result"); 
    var remove = document.getElementById("remove"); //Remove one number
    var equals = document.getElementById("equals"); //Equals

    //Close and Max button: Mouseover: Show content
    max.onmouseover = close.onmouseover = function(){
    	this.innerHTML = this.dataset.ico;
    };
    max.onmouseout = close.onmouseout = function(){
    	this.innerHTML = "&nbsp;";
    };

    //Close button: Close the calculator
    close.onclick = function(e){
        var h = calc.offsetHeight + 20;
        calc.style.transform = "translateY("+ h+"px)";
        calc.style.webkitTransform = "translateY("+ h+"px)";
        e.stopPropagation();
    };
    
    //Max button: Max calculator
    max.onclick = function(){
        maxCalculator();
    };
    
    function maxCalculator(){
    	var that = this;
    	var spans = document.querySelectorAll("#bottom .row");
        if(canvas.classList.contains("flexbox")){ //Max
            canvas.classList.remove("flexbox");
            calc.classList.remove("maxCalculator");
            for(var i=0; i<spans.length; i++){
            	spans[i].classList.remove("mb");
            }
            document.getElementsByTagName("html")[0].classList.remove("maxhtml");
            that.dataset["ico"] = "口";
            that.title = "Max";
        }else{          //Resize
            canvas.classList.add("flexbox");
            calc.classList.add("maxCalculator");
            for(var i=0; i<spans.length; i++){
            	spans[i].classList.add("mb");
            }
            document.getElementsByTagName("html")[0].classList.add("maxhtml");
            that.dataset["ico"] = "※";
            that.title = "Resize";
        }
        ResultTooLong("max");
    }
    

      
    
    /*Click Keyboard*/
    var keyboardpart = document.querySelectorAll("#bottom span");
    var express = document.getElementById("express");//expression
    var res =  document.getElementById("res"); //result
    var symbol = {"+":"+","-":"-","×":"*","÷":"/","%":"%","=":"="};//symbols
    var isFromHistory = false;  //From histroy
    var key = null;        //current single key
    var preKey = "";            //The single key clicked
    var presymbol = "";
    var currentsymbol ="";
    var oldres = '';

    //Keyboardpart
    for(var i=0; i <keyboardpart.length; i++){
        key = keyboardpart[i];
        key.onclick = function() {
            var number = this.dataset["number"];
            clickKey(number);
        };
    }
    
    //Click keys
    function clickKey(number){
        var exp = express.innerHTML;	//expression
        var resultV = res.innerHTML; //result
        //Last digit in expression
        var lastDigit = exp.substring(exp.length-1,exp.length);
        //Input when the key is not "←" or "AC"
        if(number !== "C" || number !== "←"){
        	//Dot existing? if it exists then can't enter the dot, and the previous character is not a symbol character
        	var hasDot = (resultV.indexOf('.') !== -1)?true:false;
        	if(hasDot && number === '.'){
        		//If the previous character is a symbol, it becomes a 0.xxx form.
        		if(symbol[preKey]){
        			res.innerHTML = "0";
        		}else{
        			return false;
        		}
        	}
            //Convert display symbol *->× 
            if(isNaN(number)){
                number = number.replace(/\*/g,"×").replace(/\//g,"÷");
            }
            //If the input is always a number, then the input cannot be entered again when it reaches a fixed length.12 numbers
            if(!symbol[number] && ResultTooLong(resultV.length+1)){
                return false;
            }
            //Click a symbol
            //Get the latest
            if(symbol[number]){
                presymbol = currentsymbol;
                currentsymbol = symbol[number];
                if(preKey !== "=" && symbol[preKey]){//The key clicked is not = or the symbol clicked 
                    express.innerHTML = exp.slice(0,-1) + number;
                }else{
                    if(exp == ""){
                        oldres = resultV;
                        express.innerHTML = resultV + number;
                    }else{
                        express.innerHTML += resultV + number;
                    }
                    if(symbol[lastDigit]){
                        exp = express.innerHTML.replace(/×/g,"*").replace(/÷/g,"/");
//                        res.innerHTML = newEval(exp.slice(0,-1));
                
                        if(presymbol == '-') {
                            var num = Number(oldres) - Number(resultV);
                        } else if(presymbol == '+') {
                            var num = Number(oldres) + Number(resultV);
                        } else if(presymbol == '*' || presymbol == '×') {
                            var num = Number(oldres) * Number(resultV);
                        } else if(presymbol == '/' || presymbol == '÷') {
                            var num = Number(oldres)/Number(resultV);
                        }
                        oldres = num;
                        res.innerHTML = num;
                    }
                }                  
            }else{
                //The first digit is a symbol,0
                if((symbol[number] || symbol[preKey] || resultV=="0") && number !== '.'){
                    res.innerHTML = "";
                }
                res.innerHTML += number;
            }
            preKey = number;
        }
    }

    //equals:get the result
    equals.onclick = function(){
        equalsR();
    };
    
    function equalsR(){
    	var expVal = express.innerHTML, val = "";
        var resultV = res.innerHTML;
        //LastDigit
        if(expVal){
            var lastDigit = expVal.substring(expVal.length-1,expVal.length);
            try{
                if(!isFromHistory){
                    var temp = "";
                    if(symbol[lastDigit] && resultV){
                        //temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
                        //temp = newEval(temp.slice(0,-1)) + symbol[lastDigit] + resultV;
                        presymbol = symbol[lastDigit];
                        if(presymbol == '-') {
                            var num = Number(oldres) - Number(resultV);
                        } else if(presymbol == '+') {
                            var num = Number(oldres) + Number(resultV);
                        } else if(presymbol == '*' || presymbol == '×') {
                            var num = Number(oldres) * Number(resultV);
                        } else if(presymbol == '/' || presymbol == '÷') {
                            var num = Number(oldres)/Number(resultV);
                        }
                    }else{
                        if(presymbol == '-') {
                            var num = Number(oldres) - Number(resultV);
                        } else if(presymbol == '+') {
                            var num = Number(oldres) + Number(resultV);
                        } else if(presymbol == '*' || presymbol == '×') {
                            var num = Number(oldres) * Number(resultV);
                        } else if(presymbol == '/' || presymbol == '÷') {
                            var num = Number(oldres)/Number(resultV);
                        }
                    }
                    //val = newEval(temp);
                }else{
                    val = resultV;
                }
            }catch(error){
                val = "<span style='font-size:0.5em;color:red'>Error：Bad Result</span>";
            }finally{
                express.innerHTML = "";
                res.innerHTML = num;
                preKey = "=";
                saveHistory(expVal+resultV+"="+num);
                ResultTooLong(resultV.length);
                isFromHistory = false;
            }
        }
    }
	
	
    //AC
   	var resetButton = document.getElementById("reset");    
    resetButton.onclick = function(){
        res.innerHTML = "0";
        oldres = "";
        express.innerHTML = "";
    };

    //Delete the last digit
    remove.onclick = function(){
        var tempResult = res.innerHTML;
        if(tempResult.length>1){
            tempResult = tempResult.slice(0,-1);
            res.innerHTML = tempResult;
        }else{
            res.innerHTML = 0;
        }
    };




    //History
    var history = document.getElementById("history"),
        historyPanel = document.getElementById("historyPanel");
    history.onclick = function(e){
        e = e || window.event;
        var target = e.target.id || window.event.srcElement.id;
        historyPanel.style.webkitTransform = "none";
        historyPanel.style.transform = "none";
        e.stopPropagation();
        if(target == "h"){
        	//Show delete all button
        	deleteAll.style.display = "inline-block";
            var keyArray = Mybry.wdb.getKeyArray();
            var separate = Mybry.wdb.constant.SEPARATE;
            keyArray.sort(function(a,b){
                var n = a.split(separate)[1];
                var m = b.split(separate)[1];
                return m - n;
            });
            var html = [],val = "";
            for(var j=0; j<keyArray.length; j++){
                val = Mybry.wdb.getItem(keyArray[j]);
                html.push("<li>"+val+"</li>");
            }
            if(html.length>0){
                historyUl.innerHTML = html.join("");
            }else{
                historyUl.innerHTML = "No History";
            }

            //Show a history in Calculator
            var hLis = historyUl.querySelectorAll("li");
            for(var i=0; i<hLis.length; i++){
                hLis[i].onclick = function(){
                    var express = this.innerHTML;
                    var exp = express.split("=")[0],
                        res = express.split("=")[1];
                    resultDiv.querySelector("#express").innerHTML = exp;
                    resultDiv.querySelector("#res").innerHTML = res;
                    isFromHistory = true;
                };
            }
        }

    };

     //Delete All history
    deleteAll.onclick = function(e){
        var e = e || window.event;
        e.stopPropagation();
        if(Mybry.wdb.deleteItem("*")){
            historyUl.innerHTML = "No history";
        }
    };
    
    window.onclick = function(e){
        var e = e || window.event;
        var target = e.target.className || e.target.nodeName;
        //If you click on the history botton or delete button, the panel will not be hidden.
        var notTarget =  {"con":"con","remove":"remove","UL":"UL","P":"P"};
        if(!notTarget[target]){
            //Mini
            var ts = historyPanel.style.transform || historyPanel.style.webkitTransform;
            if(ts && ts == "none"){
                historyPanel.style.webkitTransform = "translateY(102%)";
                historyPanel.style.transform = "translateY(102%)";
            }
        }
 
    };

    /*Save expression */
    function saveHistory(val){
        var key = Mybry.wdb.constant.TABLE_NAME + Mybry.wdb.constant.SEPARATE + Mybry.wdb.getId();
        window.localStorage.setItem(key,val);
    }

    //Too long: Covenant
    function ResultTooLong(leng){
        var calc = document.getElementById("calc");
        var w = calc.style.width || getComputedStyle(calc).width || calc.currentStyle.width;
            w = parseInt(w);
        return false;
    }

    
   

    
   
    
//    function newEval(exp) {
//        var rpnArr = outputR(exp);
//        return getExpR(rpnArr)
//    }
//    
//    function isOperator(value) {
//    var operatorString = '+-*/()×÷';
//    return operatorString.indexOf(value) > -1; //The first occurrence of the sub string in the parent string
//    }
//    
//    function getPrioraty(value) {
//        if(value == '-' || value == '+') {
//            return 1;
//        } else if(value == '*' || value == '/' || value == '×' || value == '÷' ) {
//            return 2;
//        } else{
//            return 0;
//        }
//    }
//
//    function prioraty(v1, v2) {
//        return getPrioraty(v1) <= getPrioraty(v2);
//    }
//
//    function outputR(exp) {
//        var inputStack = [];
//        var outputStack = [];
//        var outputQueue = [];
//        var firstIsOperator = false;
//        exp.replace(/\s/g,'');
//        if(isOperator(exp[0])){
//            exp = exp.substring(1);
//            firstIsOperator = true;
//        }
//        for(var i = 0, max = exp.length; i < max; i++) {
//            if(!isOperator(exp[i]) && !isOperator(exp[i-1]) && (i != 0)) {
//                inputStack[inputStack.length-1] = inputStack[inputStack.length-1] + exp[i] + '';
//            } else {
//                inputStack.push(exp[i]);
//            }
//        }
//        if(firstIsOperator) {
//            inputStack[0] = -inputStack[0] 
//        }
//        while(inputStack.length > 0) {
//            var cur = inputStack.shift();
//            if(isOperator(cur)) {
//                if (cur == '(') {
//                    outputStack.push(cur);
//                } else if (cur == ')') {
//                    var po = outputStack.pop();
//                    while(po != '(' && outputStack.length > 0) {
//                        outputQueue.push(po);
//                        po = outputStack.pop();
//                    }
//                } else {
//                    while(prioraty(cur,outputStack[outputStack.length - 1]) && outputStack.length > 0) {
//                        outputQueue.push(outputStack.pop());
//                    }
//                    outputStack.push(cur)
//                } 
//            } else {
//                outputQueue.push(Number(cur));
//            }
//        }
//        if(outputStack.length > 0){
//            while (outputStack.length > 0) {
//                outputQueue.push(outputStack.pop());
//            }
//        }
//        return outputQueue;
//    }
//
//    function getExpR(rpnArr) {
//        var stack = [];
//        for(var i = 0, max = rpnArr.length; i < max; i++) {
//            if(!isOperator(rpnArr[i])) {
//                stack.push(rpnArr[i]);
//            } else {
//                var num1 = stack.pop();
//                var num2 = stack.pop();
//                if(rpnArr[i] == '-') {
//                    var num = num2 - num1;
//                } else if(rpnArr[i] == '+') {
//                    var num = num2 + num1;
//                } else if(rpnArr[i] == '*' || rpnArr[i] == '×') {
//                    var num = num2 * num1;
//                } else if(rpnArr[i] == '/' || rpnArr[i] == '÷') {
//                    var num = num2/num1;
//                }
//                stack.push(num);
//            }
//        } 
//        return stack[0];
//    }

    
}





