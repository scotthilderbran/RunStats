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
//Functions to set preset distances
$("#marathon").click(function() {
    $("#btninput").text("Marathon");
    if(metric){
        $("#distance").val("42.195");
    }else{
        $("#distance").val("26.219");
    }
    calcPace();
});
$("#hmarathon").click(function() {
    $("#btninput").text("Half Marathon");
    if(metric){
        $("#distance").val("21.098");
    }else{
        $("#distance").val("13.109");
    }
    calcPace();
});
$("#20K").click(function() {
    $("#btninput").text("20K");
    if(metric){
        $("#distance").val("20");
    }else{
        $("#distance").val("12.427");
    }
    calcPace();
});
$("#15K").click(function() {
    $("#btninput").text("15K");
    if(metric){
        $("#distance").val("15");
    }else{
        $("#distance").val("9.321");
    }
    calcPace();
});
$("#10K").click(function() {
    $("#btninput").text("10K");
    if(metric){
        $("#distance").val("10");
    }else{
        $("#distance").val("6.214");
    }
    calcPace();
});
$("#5K").click(function() {
    $("#btninput").text("5K");
    if(metric){
        $("#distance").val("5");
    }else{
        $("#distance").val("3.107");
    }
    calcPace();
});

$("#hr").keyup(function(){
    calcPace();
})
$("#min").keyup(function(){
    calcPace();
})
$("#sec").keyup(function(){
    calcPace();
})
$("#distance").keyup(function(){
    $("#btninput").text("Choose preset or enter custom");
    calcPace();
})

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