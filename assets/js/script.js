$(document).ready(function () {

        //current date and time
        var dateString = moment().format("dddd, MMMM Do YYYY, h:mm a");
        $("#current-date").html(dateString);

        
        //html timeblocks
        var scheduleHours = [];

        for (var hour = 9; hour < 18; hour++) {
                scheduleHours.push(moment({
                        hour
                }).format('h  a'));
                $('.container').append(`<div class="row hour-block" data-time="${hour}">
        <!--hour column-->
        <div class="col-sm col-md-2 hour">
          <p class=dailyHour>${moment({ hour }).format('h  a')}</p>
        </div>

        <!--text container-->
        <textarea class="col-sm col-md-8 d-flex description">
        </textarea>

        <!--bootstrap saveBtn-->
        <div class="col-sm col-md-2 saveBtn">
        <i class="fa-solid fa-cloud-arrow-down"></i>
        </div>`);

        }
        //checking with HTML data for css style 
        var m = moment();
        $.each($(".hour-block"), function (index, value) {
                let dayHour = $(value).attr("data-time");
                if (Number(dayHour) === m.hour()) {
                        $(this).find("textContainer").addClass('current');
                } else if (Number(dayHour) < m.hour()) {
                        $(this).find("textContainer").addClass('past');
                } else {
                        $(this).find("textContainer").addClass('future');
                }
        });

        //local storage
        let timeObject = {};
        if (localStorage.getItem('timeObject')) {
                timeObject = JSON.parse(localStorage.getItem('timeObject'));
        } else {
                timeObject = {
                        '9': { time: "9", value: "" },
                        '10': { time: "10", value: "" },
                        '11': { time: "11", value: "" },
                        '12': { time: "12", value: "" },
                        '13': { time: "13", value: "" },
                        '14': { time: "14", value: "" },
                        '15': { time: "15", value: "" },
                        '16': { time: "16", value: "" },
                        '17': { time: "17", value: "" }
                };
        }

        //set value of timeObject for user input 
        $(".hour-block").each(function () {
                $(this).find(".textContainer").val(timeObject[$(this).attr("data-time")].value);
        });

        //save to local storage
        $(".saveBtn").on('click', function (event) {
                //set timeObject time attribute
                var timeValue = $(this).closest(".hour-block").attr("data-time");
                //set timeObject value attribute
                var textValue = $(this).closest(".hour-block").find(".textContainer").val();
                timeObject[timeValue].value = textValue;
   
                //save user input in each object to local storage
                localStorage.setItem('timeObject', JSON.stringify(timeObject));
   
        });

});