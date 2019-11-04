let count = 2;
let curr = 1;
let metric = false;

$("#alerted").hide()//Hide alert message

$('#switch input:radio').change(function() { //Switch between metric and imperial and changes current input
    if($(this).val() === 'M'){
        metric = false;
        convertAll(metric);
    }else if($(this).val() === 'K'){
        metric = true;
        convertAll(metric);
    }
});

$(document).on('click','.menuclick', function () { //set value from distance dropdown and change title of dropdown           
    console.log("test");
    if(metric){
        $(this).parents(".input-group").find(".distancein").val($(this).data("valuem"));
        console.log("test");
    }else{
        $(this).parents(".input-group").find(".distancein").val($(this).data("value"));
    }
    $(this).parents(".input-group-prepend").find(".disttitle").text($(this).text());
});

$(document).on('keyup','.distancein', function () {  //reset title of dropdown from custom input
    console.log("test");
    $(this).siblings(".input-group-prepend").find(".disttitle").text("Choose preset or enter custom");
});


$("#addone").click(function(){ //Add another card for run input
    if(curr === 10){
        console.log(curr);
        $("#alerted").show();
        window.scrollTo(0,document.body.scrollHeight);
        setTimeout(function() { $("#alerted").hide("medium"); }, 2400);
        return;
    }
    $( "#output" ).append(`
    <div class="card mt-3 run${count} run">
        <div class="card-header text-center">
            <h5>Run ${count}</h5>
        </div>
        <div class="card-body">
            <div class="input-group">
                <div class="input-group-prepend">
                    <button id="btninput" type="button"
                        class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split disttitle"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Choose preset or enter custom
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item menuclick" id="marathon" href="#" data-value="26.219" data-valuem="42.195">Marathon</a>
                        <a class="dropdown-item menuclick" id="hmarathon" href="#" data-value="13.109" data-valuem="21.098">Half Marathon</a>
                        <a class="dropdown-item menuclick" id="20K" href="#" data-value="12.427" data-valuem="20">20K</a>
                        <a class="dropdown-item menuclick" id="15K" href="#" data-value="9.321" data-valuem="15">15K</a>
                        <a class="dropdown-item menuclick" id="10K" href="#" data-value="6.214" data-valuem="10">10K</a>
                        <a class="dropdown-item menuclick" id="5K" href="#" data-value="3.107" data-valuem="5">5K</a>
                    </div>
                </div>
                <input type="number" class="form-control distancein" id="dist${count}"
                    aria-label="Text input with segmented dropdown button">
            </div>
            <div class="input-group mt-2">
                <div class="input-group-prepend">
                    <span class="input-group-text">Total Time</span>
                </div>
                <input id="hr${count}" type="number" aria-label="hr" class="form-control" placeholder="Hours">
                <input id="min${count}" type="number" aria-label="min" class="form-control" placeholder="Minutes">
                <input id="sec${count}" type="number" aria-label="sec" class="form-control" placeholder="Seconds">
            </div>
        </div>
    </div>`
    );
    curr++;
    count++;
    window.scrollTo(0,document.body.scrollHeight);
})

$("#removeone").click(function(){ //remove single run card
    $(`.run${curr}`).remove();
    if(count != 2){
        curr--;
        count--;
    }
});

$("#clearruns").click(function(){ //clear all current run cards
    $(".run").remove();
    count = 2;
    curr = 1;
});

$("#calculate").click(function(){
    predict(curr);
});

//Non Listener Functions:

function convertAll(metric){
    if(metric){//convert imperial to metric
        for(let i = 0; i<count; i++){
            $(`#dist${i}`).val(Math.round(($(`#dist${i}`).val()*1.60934)*1000)/1000);
        }
    }else{ //convert metric to imperial
        for(let i = 0; i<count; i++){
            $(`#dist${i}`).val(Math.round(($(`#dist${i}`).val()*0.62137)*1000)/1000);
        }
    }
}

function predict(curr){ //prediction function
    let goal = parseFloat($("#dist0").val());
    let distances = [];
    let times = [];
    let predictionTimes = [];
    let sum = 0;
    for(let i = 1; i <= curr; i++){
        distances.push(parseFloat($(`#dist${i}`).val()));
    }
    for(let i = 1; i <= curr; i++){
        let hr = parseFloat($(`#hr${i}`).val() * 60);
        let min = parseFloat($(`#min${i}`).val());
        let sec = parseFloat($(`#sec${i}`).val() / 60);
        let total = hr+min+sec;
        times.push(total);
    }
    for(let i = 0; i < curr; i++){
        let T1 = times[i];
        let D2 = distances[i];
        predictionTimes.push(T1*Math.pow((goal/D2),1.06));
        console.log(predictionTimes);
    }
    for(let i = 0; i < curr; i++){
        sum += predictionTimes[i];
    }
    sum = sum / curr;
    console.log(sum);
    let hrfinal = Math.floor(sum/60);
    let remain = sum % 60;
    let minfinal = Math.floor(remain);
    let secremain = remain % 1;
    if(minfinal < 10) {
		minfinal = "0" + minfinal;
    }
    let secfinal = Math.round(secremain*60);
    if(secfinal < 10) {
		secfinal = "0" + secfinal;
    }
    if(isNaN(hrfinal)){
        console.log("test");
        $("#predictedlabel").text("Please fill all fields");
    }else{
        $("#predictedlabel").text("Your predicted time is "+hrfinal+":"+minfinal+":"+secfinal);
    }
}

