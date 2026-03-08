document.addEventListener("DOMContentLoaded", function(){
let result = 0;
let display = document.getElementById("display")
let buttons =document.querySelectorAll(".butt")

buttons.forEach(function(button){
  button.addEventListener("click",
    function(){
      let value = button.innerText;
      doCal(value);
      document.querySelector(".doraemon").classList.add("jump");
    });
});

let expression = "";
function doCal(value){
   if (value === "AC") {
     expression = "";
     display.value=0;
   }
  
   else if(value==="="){
    if (expression === "") {
      display.value=0;
    }
     else{
       let result = eval(expression = expression.replaceAll("^","**"))
    display.value= result;
    expression = String(result);
    }
   }
    else if(value==="<3"){
    display.value="Whats Up Cutiee";
  }
   
    
   else if (value==="Del") {
    expression = expression.slice(0,-1)
    display.value= expression
   }
   else{
      if(display.value === "0"){
        expression = value; 
      } else {
        expression += value;  
      }
      display.value = expression;
   }
}
});