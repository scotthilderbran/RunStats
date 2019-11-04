let metric = false;
$('#switch input:radio').change(function() { //Switch between metric and imperial and changes current input
    let currentInput = $("#distance").val();
    if($(this).val() === 'M'){
        metric = false;
        $("#distance").val(Math.round((currentInput*0.62137)*1000)/1000);
        calcPace();
    }else if($(this).val() === 'K'){
        metric = true;
        $("#distance").val(Math.round((currentInput*1.60934)*1000)/1000);
        calcPace();
    }
  });

$(".menuclick").click(function(){ //Dropdown menu for preset distances
    if(metric){
        $("#distance").val($(this).data("valuem"));
    }else{
        $("#distance").val($(this).data("value"));
    }
    $("#btninput").text($(this).text());
});

$(".refresh").keyup(function(){ //Refresh pace on input change
    calcPace();
});

$("#distance").keyup(function(){ //Reset distance button text on custom change
    $("#btninput").text("Choose distance or enter custom");
});

function calcPace(){ // Calculate pace
    $("#result").text("Your pace is: ");
    let hr = 0;
    let min = 0;
    let sec = 0;
    let brk = false;
    if($("#hr").val()){
        hr = parseFloat($("#hr").val()) * 60;
    }
    if($("#min").val()){
        min = parseFloat($("#min").val());
    }
    if($("#sec").val()){
        sec = parseFloat(($("#sec").val()) / 60);
    }
    if(hr < 0){
        $("#hr").addClass("is-invalid");
        invalid();
        brk = true;
    }else{
        $("#hr").removeClass("is-invalid");
    }
    if(min < 0){
        $("#min").addClass("is-invalid");
        invalid();
        brk = true;
    }else{
        $("#min").removeClass("is-invalid");
    }
    if(sec < 0){
        $("#sec").addClass("is-invalid");
        invalid();
        brk = true;
    }else{
        $("#sec").removeClass("is-invalid");
    }
    if(brk){
        return;
    }
    let currDist = parseFloat($("#distance").val());
    let total = hr + min + sec;
    let pace = total / currDist;
    let finMin = Math.floor(pace);
    let finSec = Math.round((pace - finMin) * 60);
    if(finSec < 10) {
		finSec = "0" + finSec;
    }
    if((finMin > 0 || finSec > 0) && currDist > 0){
        if(metric){ // Calculate for metric
            $("#result").text("Your pace is: " + finMin+":"+finSec + " Minutes per Kilometer");
        }else{ // Calculate for non metric
            $("#result").text("Your pace is: " + finMin+":"+finSec + " Minutes per Mile");
        }
    }
}

const invalid = () => $("#result").text("Please enter valid input");

function func(){
    console.log("A");
    setTimeout(console.log("B"),5000);
    console.log("C");
}
func();