var cardDetails = {"cardHolder":"J. Omamode", "PIN":"2022", "type":"Current", "balance":120000}, incorrectPIN = 0, disabledCard = false, ads = ["one.jpg", "two.jpg", "three.jpg", "four.png", "five.jpg", "six.jpg","seven.jpg","eight.jpg","nine.jpg","ten.jpg","eleven.jpg","twelve.png"], activity = {"activity":"", value:""}, cardIn = false;
        const opBtns = document.querySelectorAll(".btn-holder button");
        opBtns.forEach((item) => {
item.addEventListener("click", function(){
if (isset(activity.activity) && isset(activity.value))
{
callActivity(activity.activity, activity.value, item.getAttribute("val"));
}
});
});

const allbtns = document.querySelectorAll(".sidebtns button, .bottom-pane .mainbtns .holder button");
allbtns.forEach((item) => {
  item.addEventListener("click", function(){
    playSound("files/click.mp3");
  });
});

const sidebtns = document.querySelectorAll(".btn-holder button");
sidebtns.forEach((item) => {
  item.addEventListener("click", function(){
    playSound("files/click1.mp3");
  });
});

function enter(){
if (isset(activity.activity) && isset(activity.value))
{
callActivity(activity.activity, activity.value, 6);
}
}

const numBtns = document.querySelectorAll(".holder button");
numBtns.forEach((item) => {
  item.addEventListener("click", function(){
  var scrn = document.querySelectorAll(".dataInput")[0];
  if (isset(scrn))
  {
    scrn.value += item.innerText;
  }
  });
});

function isset(data)
{
  return (data != "" && data !== undefined);
}

function callActivity(activity, param, btn){
activity(param,btn);
}

function verifyPIN(param, key){
  if (key == 6)
  {
   var pin = document.querySelectorAll(".dataInput")[0].value;
  if (isset(pin) && pin == cardDetails.PIN)
  {
    clrScreen();
    loadScreenData("<div class='centerData'>WELCOME "+cardDetails.cardHolder+"<p><i class='fa fa-spinner fa-spin'></i></p></div>");
    setTimeout(function(){
    clrScreen();
    functionalText([["before", 3, "Transfer"],["after",1,"Quickteller"],["after",2,"Balance"],["after",3,"Withdrawal"]]);
 activity.activity = userAction;
 activity.value = 1;
    }, 3000);
  }
  else
  {
    incorrectPIN += 1;
    if (incorrectPIN >= 3)
    {
    reject("Card seized due to ownership suspicion!", removeCard);
    disabledCard = true;
    }
    else
    {
    reject("Incorrect PIN!!!", init);
  }
destroyActivity();
  }
  }
}

function reject(text, callback){
  clrScreen();
  loadScreenData("<div class='reject centerData'>"+text+"</div>");
  if (isset(callback))
  {
    setTimeout(function(){
    callback();
    }, 3000);
  }
}

function userAction(val, btn){
  destroyActivity();
  if (btn == 3 || btn == 4 || btn == 5 || btn == 6)
  {
    switch(btn)
    {
      case "3":
         transfer();
         break;
      case "4":
        quickTeller();
        break;
      case "5":
        balance();
        break;
      default:
        withDrawal();
        break;
    }
  }
}

function transfer(){
  clrScreen();
  displayInput("Destination Account Num:");
  functionalText([["after", 3, "Next"]]);
  activity.activity = bankName;
  activity.value = 1;
}

function bankName(value, btn){
  if (btn == 6)
  {
  var acc = document.querySelectorAll(".dataInput")[0].value;
  if (!isNaN(acc))
  {
    clrScreen();
    functionalText([["before",1,"ECOBANK"],["before",2,"FCMB"],["before", 3, "FirstBank"],["after", 1, "GTBANK"], ["after", 2, "iBank"], ["after",3,"Zenith"]]);
    activity.activity = function(value, btn){
      transferAmt(acc, value, btn);
    };
  }
  else
  {
    reject("Invalid Acc. Num.", transfer);
  }
}
}

function transferAmt(acc, value, btn){
var bank = "";
switch(btn)
    {
      case "1":
        bank = "ECOBANK";
        break;
        case "2":
          bank = "FCMB";
          break;
          case "3":
            bank = "FirstBank";
            break;
            case "4":
              bank = "GTBANK";
              break;
              case "6":
                bank = "Zenith";
                break;
                default:
                bank = "iBank";
    }
    clrScreen();
    displayInput("Amount:");
    functionalText([["after", 3, "Proceed"]]);
    activity.activity = function (value, btn)
    {
      confirmTransfer(acc, bank, btn);
    };
    activity.value = 1;
}

function confirmTransfer(acc, bank, btn){
  if (btn == 6)
  {
    var amt = document.querySelectorAll(".dataInput")[0].value;
    if (!isNaN(amt) && amt > 0)
    {
      clrScreen();
      loadScreenData("<div class='centerData'>Confirm you want to transfer <b>&#8358;"+Number(amt).toLocaleString()+"</b> to "+bank+"'s account with number, <b>"+acc+"</b>.</div>");
      functionalText([["after", 3, "YES"]]);
      activity.activity = function (value, btn)
      {
        if (btn == 6)
        {
          processTransfer(acc, bank, amt);
        }
    }
  }
}
}

function processTransfer(acc, bank, amt){
  clrScreen();
  loadScreenData("<div class='centerData'><i class='fa fa-spinner fa-spin'></i><p>PROCESSING</p></div>");
  setTimeout(function(){
    if (amt <= cardDetails.balance)
    {
      cardDetails.balance -= amt;
      loadScreenData("<div class='centerData'><p class='blinkText'>Transfer Successful!</p>Another Transaction?</div>");
      functionalText([["after", 2, "YES"], ["after", 3, "NO"]]);
      activity.activity = nextTrans;
      activity.value = 1;
    }
    else
    {
      reject("Insufficient Funds!", transfer);
    }
    }, 2000);
}

function verifyAccType(value, btn){
  clrScreen();
  loadScreenData("<div class='centerData'><i class='fa fa-spinner fa-spin'></i><p>Verifying...</p></div>");
  if (btn == 4 || btn == 5 || btn == 6)
  {
    var type = "";
    switch (btn)
    {
      case "4":
        type = "Savings";
        break;
        case "5":
          type = "Current";
          break;
          case "6":
            type = "Domicilliary";
            break;
            default:
            type = "";
    }
    setTimeout(function(){
    if (type == cardDetails.type)
    {
    selectAmt();
    }
    else
    {
      reject("Failed!!!", init);
destroyActivity();
    }
    }, 2000);
  }
}

function selectAmt(){
  clrScreen();
  functionalText([["before", 1, "500"],["before", 2, "1,000"], ["before", 3, "5,000"], ["after", 1, "10,000"], ["after", 2, "20,000"], ["after", 3, "Others"]]);
activity.activity = acceptAmt;
activity.value = 1;
}

function acceptAmt(value, btn)
{
  if (btn == 6)
  {
    clrScreen();
    displayInput("Amount:");
    functionalText([["after", 3, "Okay"]]);
    activity.activity = userAmt;
    activity.value = 1;
  }
  else
  {
    value = 0;
    switch(btn)
    {
      case "1":
        value = 500;
        break;
        case "2":
          value = 1000;
          break;
          case "3":
            value = 5000;
            break;
            case "4":
              value = 10000;
              break;
              case "5":
                value = 20000;
                break;
                default:
                value = 0;
    }
    withDraw(value);
  }
  }

function userAmt(value, btn)
{
  if (btn == 6)
  {
var amt = document.querySelectorAll(".dataInput")[0].value;
if (!amt.isNaN && amt > 0)
{
  if (amt % 500 == 0 || amt % 1000 == 0)
  {
  withDraw(amt);
  }
  else
  {
    clrScreen();
    reject("The machine can only dispense amounts in &#8358;500 & &#8358;1000 denomination.", selectAmt);
  }
}
  }
}

function giveCash(amt)
{
  var cash = document.querySelectorAll(".cash img")[0];
  if ((amt % 1000) == 0)
  {
    cash.src = "files/1000naira.jpg";
  }
  else
  {
    cash.src = "files/500naira.jpg";
  }
  document.querySelectorAll(".cash")[0].classList.add("cashOut");
  setTimeout(function(){
  document.querySelectorAll(".cash")[0].classList.remove("cashOut");
  }, 4000);
}

function withDraw(amt){
  clrScreen();
  loadScreenData("<div class='centerData'><i class='fa fa-spinner fa-spin'></i><p>In Progress...</p></div>");
  setTimeout(function(){
    if (amt <= cardDetails.balance)
    {
    cardDetails.balance -= amt;
    playSound("files/dispense.mp3");
    setTimeout(function(){
    giveCash(amt);
    loadScreenData("<div class='centerData'><p class='blinkText'>Please, take your cash!</p><p>Another Transaction?</p></div>");
    functionalText([["after", 2, "YES"], ["after", 3, "NO"]]);
    activity.activity = nextTrans;
    activity.value = 1;
    }, 17000);
    }
    else
    {
      reject("Insufficient Funds!", selectAmt);
    }
  }, 2000);
}

function withDrawal(){
  clrScreen();
  functionalText([["after", 1, "Savings"], ["after", 2, "Current"], ["after", 3, "Domicilliary"]]);
  activity.activity = verifyAccType;
  activity.value = 1;
}

function balance(){
  clrScreen();
  loadScreenData("<div class='centerData'><i class='fa fa-spinner fa-spin'></i><p>PLS WAIT...</p></div>");
    setTimeout(function(){
    clrScreen();
    loadScreenData("<div class='middleData centerData'>Your account balance is &#8358;<b>"+cardDetails.balance.toLocaleString()+"</b> only.<p>Do you want to perform another transaction?</p></div>");
    functionalText([["after", 1,""], ["after", 2, "YES"], ["after", 3, "NO"]]);
    activity.activity = nextTrans;
    activity.value = 1;
  },1000);
}

function quickTeller(){
  clrScreen();
  loadScreenData("<div class='centerData'><i class='fa fa-spinner fa-spin'></i><p>PLS WAIT...</p></div>");
    setTimeout(function(){
    clrScreen();
    loadScreenData("<div class='middleData centerData'><b class='blinkText'>Service Currently Not Available!</b><p>Do you want to perform another transaction?</p></div>");
    functionalText([["after", 1,""], ["after", 2, "YES"], ["after", 3, "NO"]]);
    activity.activity = nextTrans;
    activity.value = 1;
  },1000);
}

_alert("This is a realtime ATM Machine simulator\n\nTap on the ATM Card to begin a transaction.\n\n<b>Author</b>: Joseph Omamode Israel (+234 81 2119 3434)","Guide:","<p style='font-weight:bold; color:yellow;'>Okay</p>");

function nextTrans(value, btn){
  if (btn == 5 || btn == 6)
  {
    if (btn == 6)
    {
      setTimeout(function(){
      removeCard();
      }, 3000);
      destroyActivity();
    }
    else
    {
      init();
    }
  }
}

function loadScreenData(data, style){
  if (isset(data))
  {
  var screen = document.querySelectorAll(".screen")[0]
  screen.innerHTML = data;
  if (isset(style))
  {
   }
  }
}

function clrScreen(){
var screen = document.querySelectorAll(".screen")[0];
clrScrBtns();
screen.innerHTML = "";
}

function clrScr(){
var str = "", input = document.querySelectorAll(".dataInput")[0];
for (i = 0; i < input.value.length - 1; i++)
{
  str += input.value.charAt(i);
}
input.value = str;
}

function displayInput(text, blinkText){
  loadScreenData("<div class='centerData'>"+(isset(text)?"<p class='"+(isset(blinkText) && blinkText == true?"blinkText":"")+"'>"+text+"</p>":"")+"<input class='dataInput' type='text' disabled/></div>");
}

window.onload = init();

function init(){
clrScreen();
if (cardIn)
{
loadScreenData("<div class='middleData centerData'><i class='fa fa-spinner fa-spin'></i><p>PLS WAIT...</p></div>");

setTimeout(function(){
displayInput("Input PIN:", true);
functionalText([["after",3,"ENTER"]]);
activity.activity = verifyPIN;
activity.value = 1;
},5000);
}
else
{
    clrScreen();
    loadScreenData("<p class='insertCard'>INSERT CARD!</p>");
}
}

function clrScrBtns(){
  functionalText([["before", 1,""], ["before", 2, ""], ["before", 3, ""], ["after", 1, ""], ["after", 2, ""], ["after", 3, ""]]);
}

function functionalText(data){
  for (x in data)
  {
  var el = document.querySelectorAll(".btn-holder."+data[x][0]+" :nth-child("+data[x][1]+")")[0];
  el.setAttribute("content",data[x][2]);
  }
}

setInterval(function(){
  if (!cardIn)
  {
    clrScreen();
    loadScreenData("<p class='insertCard'>INSERT CARD!</p>");
    var i = parseInt(Math.random() * 12);
    var img = ads[i];
    var screen = document.querySelectorAll(".screen")[0];
    screen.style = "background:url('files/"+img+"'); background-position:center; background-size:cover;";
  }
},5000);

function insertCard(e)
{
  if (disabledCard != true)
  {
  e.classList.add("cardIn");
  incorrectPIN = 0;
  document.querySelectorAll(".cardEntry")[0].classList.remove("cardEntryNoCard");
  playSound("files/atminout.mp3");
  if (cardIn == false)
  {
  clrScreen();
  _alert("<div><b>HOLDER</b>: "+cardDetails.cardHolder+"\n<b>PIN</b>: "+cardDetails.PIN+"\n<b>TYPE</b>: "+cardDetails.type+"\n<b>BALANCE</b>: &#8358;"+cardDetails.balance.toLocaleString()+"</div>", "<div style='color:orange;'>CARD DETAILS:</div>", "<p style='font-weight:bold; color:yellow;'>Got It</p>");
  cardIn = true;
  var screen = document.querySelectorAll(".screen")[0];
  screen.style = "background:url('bg.png'); background-position:center; background-size:cover;";
  init();
  }
  }
}

function removeCard(){
  if (cardIn == true)
  {
  clrScreen();
  if (disabledCard != true)
  {
  playSound("files/atminout.mp3");
  setTimeout(function(){
  document.querySelectorAll(".atmcard")[0].classList.remove("cardIn");
  loadScreenData("<div class='centerData blinkText'>Please take your card!!!</div>");
cardIn = false;
  },3000);
  }
setTimeout(function(){
  document.querySelectorAll(".cardEntry")[0].classList.add("cardEntryNoCard");
cardIn = false;
},3000);
}
}

function playSound(file){
var el = document.querySelectorAll(".btnBeat")[0];
if (el.src != file)
{
el.src = file;
}
el.play();
}

function destroyActivity(){
  activity.activity = "";
  activity.value = "";
}