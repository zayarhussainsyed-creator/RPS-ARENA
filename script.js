// ================= DIGITAL CLOCK =================


function updateClock() {


    let now = new Date();


    let timezone = document.getElementById("timezone").value;



    let time = new Date(
        now.toLocaleString("en-US", {
            timeZone: timezone
        })
    );



    let hours = time.getHours();

    let minutes = time.getMinutes();

    let seconds = time.getSeconds();



    let ampm = hours >= 12 ? "PM" : "AM";



    hours = hours % 12;


    if(hours === 0){

        hours = 12;

    }



    hours = hours.toString().padStart(2,"0");

    minutes = minutes.toString().padStart(2,"0");

    seconds = seconds.toString().padStart(2,"0");



    document.getElementById("time").innerHTML =

    `${hours}:${minutes}:${seconds} ${ampm}`;





    let day = time.toLocaleDateString("en-US",{

        weekday:"long"

    });



    let date = time.toLocaleDateString("en-US",{

        day:"numeric",

        month:"long",

        year:"numeric"

    });




    document.getElementById("date").innerHTML =

    `${day}, ${date}`;



}




// Run clock

updateClock();

setInterval(updateClock,1000);





// Change timezone

document.getElementById("timezone")
.addEventListener("change", updateClock);








// ================= STOPWATCH =================


let stopwatchSeconds = 0;

let stopwatchInterval = null;




function displayStopwatch(){



    let hrs = Math.floor(stopwatchSeconds / 3600);



    let mins = Math.floor(
        (stopwatchSeconds % 3600) / 60
    );



    let secs = stopwatchSeconds % 60;




    hrs = hrs.toString().padStart(2,"0");

    mins = mins.toString().padStart(2,"0");

    secs = secs.toString().padStart(2,"0");



    document.getElementById("stopwatch").innerHTML =

    `${hrs}:${mins}:${secs}`;


}






document.getElementById("start").onclick=function(){


    if(stopwatchInterval === null){


        stopwatchInterval=setInterval(()=>{


            stopwatchSeconds++;

            displayStopwatch();


        },1000);


    }


};






document.getElementById("pause").onclick=function(){


    clearInterval(stopwatchInterval);


    stopwatchInterval=null;


};






document.getElementById("reset").onclick=function(){


    clearInterval(stopwatchInterval);


    stopwatchInterval=null;


    stopwatchSeconds=0;


    displayStopwatch();


};








// ================= ALARM SYSTEM =================



let alarmTime = "";




document.getElementById("setAlarm").onclick=function(){



    let time = document.getElementById("alarmTime").value;



    let format = document.getElementById("alarmFormat").value;




    if(time){



        let parts = time.split(":");



        let hour = parseInt(parts[0]);

        let minute = parts[1];



        if(hour > 12){

            hour = hour - 12;

        }



        if(hour === 0){

            hour = 12;

        }




        hour = hour.toString().padStart(2,"0");



        alarmTime = `${hour}:${minute} ${format}`;





        document.getElementById("alarmStatus").innerHTML =

        "Alarm Set For: " + alarmTime;



    }



};








function checkAlarm(){



    if(alarmTime === ""){

        return;

    }





    let now = new Date();



    let hours = now.getHours();

    let minutes = now.getMinutes();



    let ampm = hours >= 12 ? "PM":"AM";




    hours = hours % 12;



    if(hours === 0){

        hours = 12;

    }





    hours = hours.toString().padStart(2,"0");

    minutes = minutes.toString().padStart(2,"0");





    let currentTime =

    `${hours}:${minutes} ${ampm}`;






    if(currentTime === alarmTime){



        alert("⏰ Alarm Ringing!");



        alarmTime="";



        document.getElementById("alarmStatus").innerHTML =

        "No Alarm Set";


    }



}



setInterval(checkAlarm,1000);









// ================= DARK MODE =================



document.getElementById("themeBtn").onclick=function(){


    document.body.classList.toggle("light");


};









// ================= FULLSCREEN =================



document.getElementById("fullscreenBtn").onclick=function(){



    if(!document.fullscreenElement){



        document.documentElement.requestFullscreen();



    }

    else{


        document.exitFullscreen();



    }



};