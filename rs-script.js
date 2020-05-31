/**
 * APP ROUTE:
 * 
 *               Signup
 *                 ||
 * About page --> Login --> Dashboard --> Result Display
 * 
 * APP STAGES:
 * 0 --> About Page
 * 1A --> Login Page
 * 1B --> SignUp Page
 * 2 --> Dashboard
 * 3 --> Result Display
 */

const dashboardTable = document.querySelector('#subjectData');
var stage;
var studentNameArray = ["A B"];
var studentRollNoArray = [1810991169];
var studentPassword = ["123456"];
var currentStudentIndex = 0;
var currentStudent = studentNameArray[currentStudentIndex];
$(document).ready(function () {
    
    // Initialize stage
    function initStage(){
        stage = localStorage.getItem('stage') != null ? localStorage.getItem('stage') : "0";
    }

    // Setting current stage
    function setStage(level){
        stage = level;
        localStorage.setItem('stage', stage);
    }

    // Rendering document according to the stage
    function renderDoc(){
        if(stage == "0"){
            $('.app-info').show();
            $(".login-container").show();
            $(".dashboard").hide();
            $('.result-container').hide();
        }
        else if(stage == "1A"){
            $('.app-info').hide();
            $(".login-container").show();
            $(".dashboard").hide();
            $('.result-container').hide();
        }
        else if(stage == "2"){
            $('.app-info').hide();
            $(".login-container").hide();
            $(".dashboard").show();
            $('.result-container').hide();
        }
        else if(stage == "3"){
            $('.app-info').hide();
            $(".login-container").hide();
            $(".dashboard").hide();
            $('.result-container').show();
        }
    }

    // only login page visible initially
    $("#error-msg").hide();
    initStage();
    renderDoc();

    // switch to login page
    $('#getStarted').click(() => {
        $('.about').css("transform", "rotateX(100deg)");
        $('.app-info').fadeOut(800);
        setStage("1A");
    });

    // on successful login switch to dashboard
    $("#loginBtn").click(function () {
        if ($("#studentPass").val() == studentPassword[0]) {
            $(".login-container").fadeOut(200);
            $("#displayName").text(currentStudent.split(" ")[0]);
            $(".dashboard").fadeIn(3000);
            setStage("2");
        }
        else {
            $('#error-msg').fadeIn();
        }
    });

    $('#submitData').click(() => {

        // switch from dashboard to graph canvas
        $(".dashboard").fadeOut(200);
        $('.result-container').fadeIn(3000);

        setStage("3");
        console.log(localStorage.getItem('stage'));
        // Get user data
        const labels = Array.from(document.querySelectorAll('.label'));
        const marks = Array.from(document.querySelectorAll('.mrks'));
        const stuData = labels.map( (lbl, index) => {
            return {y: marks[index].value, label: lbl.value}
        });

        /**
         * Render Graph in Canvas
         * 
         * Current Libraries: CanvasJS
         * Options: Google Charts, D3JS
         * 
         */

        //CanvasJS
        var chart = new CanvasJS.Chart("graphCanvas", {
            animationEnabled: true,
            theme: "dark2",
            title: {
                text: "Student Report"
            },
            axisY: {
                title: "Marks"
            },
            data: [{
                type: "column",
                dataPoints: [
                   {y: parseInt(stuData[0].y), label: stuData[0].label},
                   {y: parseInt(stuData[1].y), label: stuData[1].label},
                   {y: parseInt(stuData[2].y), label: stuData[2].label},
                   {y: parseInt(stuData[3].y), label: stuData[3].label},
                   {y: parseInt(stuData[4].y), label: stuData[4].label}
                ]
            }]
        });
        chart.render();

        //Google Charts

    });


});