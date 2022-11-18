$("#FAQ .item").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
});

window.onscroll = function() {myFunction()};

var header = document.getElementById("Masthead");
var logo = document.getElementById("Logo-Update");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    logo.src="https://playerzero-27d4b.ondigitalocean.app/i/logo1.svg"
    
  } else {
    header.classList.remove("sticky");
    logo.src="https://playerzero-27d4b.ondigitalocean.app/i/logo2.svg"
  }
}