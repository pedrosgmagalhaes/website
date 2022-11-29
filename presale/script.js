
window.onscroll = function() {myFunction()};

var header = document.getElementById("Masthead");
var logo = document.getElementById("Logo-Update");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    logo.src="https://staging.playerzero.xyz/i/logo1.svg"
    
  } else {
    header.classList.remove("sticky");
    logo.src="https://staging.playerzero.xyz/i/logo2.svg"
  }
}