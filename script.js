// triggers
let triggerRobobot = document.getElementById("Data-Robobot-Trigger");
let triggerOpenSource = document.getElementById("Data-Open-Source-Trigger");
let triggerCyberBrokers = document.getElementById("Data-Cyber-Brokers-Trigger");

// trigger functions
triggerRobobot.onclick = function () {
  $("#Data-Robobot").addClass("active").siblings().removeClass("active");
  $("#Graphic-Cyber-Brokers2").addClass("active").siblings().removeClass("active");
  $(this).addClass("active").siblings().removeClass("active");
};
triggerOpenSource.onclick = function () {
  $("#Data-Open-Source").addClass("active").siblings().removeClass("active");
  $("#Graphic-Open-Source").addClass("active").siblings().removeClass("active");
  $(this).addClass("active").siblings().removeClass("active");
};
triggerCyberBrokers.onclick = function () {
  $("#Data-Cyber-Brokers").addClass("active").siblings().removeClass("active");
  $("#Graphic-Cyber-Brokers").addClass("active").siblings().removeClass("active");
  $(this).addClass("active").siblings().removeClass("active");
};

window.onscroll = function() {myFunction()};

var header = document.getElementById("Masthead");
var logo = document.getElementById("Logo-Update");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    logo.src="https://playerzero.xyz/i/logo1.svg"
    
  } else {
    header.classList.remove("sticky");
    logo.src="https://playerzero.xyz/i/logo2.svg"
  }
}