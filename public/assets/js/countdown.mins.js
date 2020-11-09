// Set the date we're counting down to
var now = new Date();
now.setMinutes(now.getMinutes() + 1); // timestamp
countDownDate = new Date(now); // Date object
// var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    $('#countdown').html('');
    $('#countdown').append(`${minutes}:${(seconds<10)?('0'+seconds):seconds}`);

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    // document.getElementById("demo").innerHTML = "EXPIRED";
    $('#countdown').html('');
    $('#countdown').append(`EXPIRED`);
    // let backUrl = $('.back-button').attr('href');
    // setTimeout(function(){ window.location.replace(`${backUrl}`); }, 1000);
  }
}, 1000);