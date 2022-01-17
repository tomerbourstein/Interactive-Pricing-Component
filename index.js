// 1. make the range bar change color before (left) the range thumb.
// 2. when input from the range bar is selected, change number of PAGEVIEWS.
// 3. when input from the range bar is selected, change the PRICE.
// 4. when the YEARLY BILLING toggle is selected, subtract 25% from all PRICES.

// PAGEVIEWS Array and Prices Array
var pageViewsChange = ["10K", "50K", "100K", "500K", "1M"];
var priceRangeChange = [8, 12, 16, 24, 36];
// the starting value of priceRange when loading the page.
var currentValue = 16;
// discount variables
var discount = false;
const DISCOUNT_RATE = 0.75;
// media query. fixing a bug: on refresh the default price was 8$ on mobile.
var x = window.matchMedia("(max-width: 600px)");
//calling mediaFunction on page reload.
mediaFunction(x);
x.addListener(mediaFunction);

// checking if the screen width is under 600px, than calling changePrice().
function mediaFunction(x) {
  if (x.matches) {
   changePrice();
}}
// changing the PAGEVIEWS "string" number per click on range.
function changeText(string) {
  $(".viewChange").text(string);
}

// changing the price per click on range. if switch toggle is "checked", DISCOUNT_RATE is on
function changePrice() {
  let calculatedNumber = discount?currentValue*DISCOUNT_RATE:currentValue;
  $(".priceChange, .priceChangeMobile").text("$" + calculatedNumber + ".00");
}

// click event listener on the switch toggle.
$("#switchMode").click(function() {
    discount = $(this).prop("checked");
    changePrice();
    });

//when choosing one of the range values,changing currentValue to the input changed
// calling the changeText() and changePrice().
// variable with a formula that changed the input into a number between 0-1,
// that changes that color left to  the range thumb.
$("#customRange").on("change input", function() {
  currentValue = priceRangeChange[$(this).val()];
  changeText(pageViewsChange[$(this).val()]);
  changePrice();
    var val = ($(this).val() - $(this).attr("min")) / ($(this).attr("max") - $(this).attr("min"));
    $(this).css("background-image", "-webkit-gradient(linear, left top, right top," + "color-stop(" + val + ", hsl(174, 77%, 80%))," + "color-stop(" + val + ", hsl(224, 65%, 95%))" +
    ")"
  );
});
