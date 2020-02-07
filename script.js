//queryURL details variables
var queryURL = "https://api.spacexdata.com/v3/launches/";
var standard = "next";

//selector variables
var $timerContainer = $(".timer");

//loaded details variables
var upcoming;
var details;
var launch_date_unix;

//current time variables
var currentEpoch = moment().format("X");

//function that will load an input launch
function loadInfo(launch){
    $.ajax({
    url: queryURL + launch,
    method: "GET"
    }).then(function(response){
        upcoming = response.upcoming;
        details = response.details;
        launch_date_unix = parseInt(response.launch_date_unix);

        //call the start timer function
        startTimer(currentEpoch, launch_date_unix);
    });
}

//start timer function will be called AFTER the server responds
function startTimer(currentTime, launchTime){
    //initialize # of seconds left for the timer
    var secondsLeft = launchTime - currentTime;
    
    //calculate number of days
    var daysLeft = Math.floor(secondsLeft/86400);
    secondsLeft = calculateDays(secondsLeft);

    //calculate number of hours
    var hoursLeft = Math.floor(secondsLeft/3600);
    secondsLeft = calculateHours(secondsLeft);

    //calculate the number of minutes left
    var minutesLeft = Math.floor(secondsLeft/60);
    secondsLeft = calculateMinutes(secondsLeft);

    //Determine what happens happens when we get to the end of a minute, hour, or day
    interval = setInterval(function(){
        secondsLeft--;
        if(secondsLeft<0){
            minutesLeft--;
            secondsLeft = 60;
        }
        if(minutesLeft<0){
            hoursLeft--;
            minutesLeft = 60;
        }
        if(hoursLeft<0){
            daysLeft--;
            hoursLeft = 24;
        }
        //console.log("Days: "+daysLeft);
        //console.log("Hours: "+hoursLeft);
        //console.log("Minutes: "+minutesLeft);
        //console.log("Seconds: "+secondsLeft);
        updateTimer(daysLeft,hoursLeft,minutesLeft,secondsLeft);
    }, 1000);
}

//uses a mod function to find leftover seconds after calculating days
function calculateDays(seconds){
    return seconds % 86400;
}

//uses mod function to find leftover seconds after calculating hours, use after calculateDays(seconds)
function calculateHours(seconds){
    return seconds % 3600;
}

//uses mod function to find leftover seconds after calculating minutes, use after calculateHours(seconds)
function calculateMinutes(seconds){
    return seconds % 60;
}

//creates boxes for the time intervals
function setupTimer(){
    var labels = ["Days:", "Hours:", "Minutes:", "Seconds:"];
    for(i=0; i<labels.length; i++){
        //setup the boxes for the numbers
        var $newBox = $("<div>");
        $newBox.addClass("timer");
        $newBox.attr("id","box-"+i);
        $timerContainer.append($newBox);

        //setup the numbers in the boxes
        var $newNum = $("<h1>");
        $newNum.addClass("number");
        $newNum.attr("id", "num-"+i);
        $newBox.append($newNum);

        //setup the boxes for the names
        var $newName = $("<h2>");
        $newName.addClass("label");
        $newName.attr("id", "label-"+i);
        $newBox.prepend($newName);
    }
    for (i=0; i<labels.length; i++){
        var $currentLabel = $("#label-"+i);
        $currentLabel.text(labels[i]);
    }
}

//update timer function will fill in the content of the boxes
function updateTimer(days, hours, minutes, seconds){
    var $dayNum = $("#num-0");
    var $hourNum = $("#num-1");
    var $minuteNum = $("#num-2");
    var $secondNum = $("#num-3");

    $dayNum.text(days);
    $hourNum.text(hours);
    $minuteNum.text(minutes);
    $secondNum.text(seconds);
}

//calling functions
setupTimer();
loadInfo(standard);