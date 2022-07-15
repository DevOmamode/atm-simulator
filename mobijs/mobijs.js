HTMLButtonElement.prototype.clicked = false;
function uCWord(string){
if (string !== undefined && string != "" && typeof(string) == "string"){
var str = "";
for (let i = 0; i < string.length; i++)
{
if (i == 0){
str += string.charAt(i).toUpperCase();
}
else
{
str += string.charAt(i);
}
}
return str;
}
else
{
return string;
}
}

/*
JAVASCRIPT FOR mobiJS TOAST
*/
function _toast(text, length, bg, color){
this.text = (text !== undefined?text:"");
this.length = (length !== undefined?length:"1000");
this.bg = (bg !== undefined?bg:"rgba(0,0,0,0.6)");
this.color = (color !== undefined?color:"white");
this.verticalAlign = "bottom";
this.horizontalAlign = "center";
this.textAlign = "center";
this.borderRadius = "25px";
this.padding = "2%";
this.fontWeight = "normal";
/*
 ***
  METHOD TO SHOW
 ***
*/
this.show = function (){
this.customStyle = "background-color:"+this.bg+"; color:"+this.color+"; border-radius:"+this.borderRadius+"; padding:"+this.padding+"; font-weight:"+this.fontWeight+";";
this.toastClasses = "_toast"+uCWord(this.horizontalAlign)+" _toast"+uCWord(this.verticalAlign)+" _toastText"+uCWord(this.textAlign);

if (this.text != ""){
var containerEl = document.createElement("div");
var mainEl = document.createElement("div");
containerEl.setAttribute("class","_toastContainer");
mainEl.setAttribute("class", "_toast "+this.toastClasses);
mainEl.style = this.customStyle;
mainEl.innerHTML = this.text;        
containerEl.appendChild(mainEl);
var toastEls = document.getElementsByClassName("_toast");
 for (var i = 0; i < toastEls.length; i++)
                {
                toastEls[i].style.display = "none";
            }
document.body.appendChild(containerEl);
 setTimeout(() => {
       for (var i = 0; i < toastEls.length; i++)
                {
                 toastEls[i].style.display = "none";
   }
        }, this.length);
}
                };
}

/*
JAVASCRIPT FOR mobiJS MODAL
*/
function _modal(content, id){
this.display = "block";
this.verticalAlign = "top";
this.horizontalAlign = "center";
this.content = content;
this.id = id;

this.show = function(){
if (typeof(this.id) == "string"){
if (this.content !== undefined){
var container_div = document.createElement("div");
var container_box = document.createElement("div");
var modal_dialog = document.createElement("div");
container_div.setAttribute("id", this.id);
container_div.setAttribute("class", "_modalContainer");
container_box.setAttribute("class", "_modalContainerBox");
modal_dialog.setAttribute("class", "_modal _modal"+uCWord(this.display)+" _modal"+uCWord(this.verticalAlign)+" _modal"+uCWord(this.horizontalAlign));
modal_dialog.innerHTML = this.content;
container_box.appendChild(modal_dialog);
container_div.appendChild(container_box);
document.body.appendChild(container_div);
container_div.style.display = "block";
}
}
else
{
console.log("Exception:: Modal ID must be a String.");
}
};
}

var _modals = document.getElementsByClassName("_modalContainer");
    
window.onclick = function(e){
for (var i = 0; i < _modals.length; i++){
if (e.target === _modals[i]){
close_Modal(_modals[i]);
}
}
};

var _closeModals = document.getElementsByClassName("_modalClose");
for (var i = 0; i < _closeModals.length; i++)
{
_closeModals[i].addEventListener("click", function(){
close_Modal(document.getElementById(this.getAttribute("close-target")));
});
}

var _displayModals = document.getElementsByClassName("_displayModal");
for (var i = 0; i < _displayModals.length; i++)
{
_displayModals[i].addEventListener("click", function(){
display_Modal(this);
});
}

function display_Modal(el){
var target = el.getAttribute("modal-target");
document.getElementById(target).style.display="block";
}

function close_Modal(el){
el.style.display = "none";
}

function remove_Modal(el){
 var el = document.getElementById(el);
 el.style.display = "none";
 el.innerHTML = "";
 el.setAttribute("id","");
}


function _confirm(content, title, trueText, falseText){
 var _confirmContainer = document.createElement("div");
 _confirmContainer.setAttribute("class","_confirmContainer");
 var _confirm = document.createElement("div");
 _confirm.setAttribute("class","_confirm");
 var _confirmTitle = document.createElement("div");
 _confirmTitle.setAttribute("class","_confirmTitle");
 var _confirmBody = document.createElement("div");
 _confirmBody.setAttribute("class","_confirmBody");
 _confirmTitle.innerHTML = (title !== undefined && title != "" && typeof(title) == "string"?title: "Confirm:");
 _confirmBody.innerHTML = content+"\n\n\n\n<div style='position:absolute; right:10%; bottom:5px;'><p><button id='_confirmInput'>"+(falseText !== undefined && falseText != "" && typeof(falseText) == "string"?falseText:"CANCEL")+"</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span onclick='_confirmInput(true)'>"+(trueText !== undefined && trueText != "" && typeof(trueText) == "string"?trueText:"OK")+"</span></p></div>";
 _confirm.appendChild(_confirmTitle);
 _confirm.appendChild(_confirmBody);
 _confirmContainer.appendChild(_confirm);
 var ex_confirm = document.getElementsByClassName("_confirmContainer");
 for (let i = 0; i < ex_confirm.length; i++)
  {
  ex_confirm[0].innerHTML = "";
  ex_confirm[0].setAttribute("class", "");
 }
 document.body.appendChild(_confirmContainer);
 var input = document.getElementById("_confirmInput");
}

function _confirmInput(input){
 var ex_confirm = document.getElementsByClassName("_confirmContainer");
 for (let i = 0; i < ex_confirm.length; i++)
  {
  ex_confirm[0].innerHTML = "";
  ex_confirm[0].setAttribute("class", "");
 }
 return input;
 }

window._alert = function (content, title, closeText){
 var _alertContainer = document.createElement("div");
 _alertContainer.setAttribute("class","_alertContainer");
 var _alert = document.createElement("div");
 _alert.setAttribute("class","_alert");
 var _alertTitle = document.createElement("div");
 _alertTitle.setAttribute("class","_alertTitle");
 var _alertBody = document.createElement("div");
 var _alertContent = document.createElement("div");
 _alertContent.setAttribute("class","_alertContent");
_alertContent.innerHTML = content;
 _alertBody.setAttribute("class","_alertBody");
 _alertTitle.innerHTML = (title !== undefined && title != "" && typeof(title) == "string"?title: "Alert:");
 _alertBody.appendChild(_alertContent);
 var _alertFooter = document.createElement("div");
 _alertFooter.innerHTML = "<br/><br/><div style='position:absolute; right:10%; bottom:5px;' onclick='_closeAlert()'><p>"+(closeText !== undefined && closeText != "" && typeof(closeText) == "string"?closeText:"OK")+"</p></div>";
_alertBody.appendChild(_alertFooter);
 _alert.appendChild(_alertTitle);
 _alert.appendChild(_alertBody);
 _alertContainer.appendChild(_alert);
 var ex_alert = document.getElementsByClassName("_alertContainer");
 for (let i = 0; i < ex_alert.length; i++)
  {
  ex_alert[0].innerHTML = "";
  ex_alert[0].setAttribute("class", "");
 }
 document.body.appendChild(_alertContainer);
}

function _closeAlert(){
 var ex_alert = document.getElementsByClassName("_alertContainer");
 for (let i = 0; i < ex_alert.length; i++)
  {
  ex_alert[0].innerHTML = "";
  ex_alert[0].setAttribute("class", "");
 }
 }

function isset(value){
return value !== undefined && value !== null && value != "";
}