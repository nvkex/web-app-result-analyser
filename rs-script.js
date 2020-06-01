/**
 * APP ROUTE:
 * 
 *               Signup
 *                 ||
 * About page --> Login --> Dashboard --> Result Display
 * 
 * APP STAGES:
 * 0 --> About Page
 * 1A --> Login
 * 1B --> SignUp
 * 2 --> Dashboard
 * 3 --> Result Display
 */

const dashboardTable = document.querySelector('#subjectData');
const backBtn = document.querySelector('#back');
const resetBtn = document.querySelector('#resetDoc');
var stage;
var currUsr = null;
var studentNameArray = ["A B"];
var studentRollNoArray = [1810991169];
var studentPassword = ["123456"];
var currentStudentIndex = 0;
var currentStudent = studentNameArray[currentStudentIndex];
$(document).ready(function () {
    
    // Initialize stage
    function initStage(){
        stage = localStorage.getItem('stage') != null ? localStorage.getItem('stage') : "0";
        currUsr = localStorage.getItem('loggedInUser') != null ? localStorage.getItem('loggedInUser') : null;
    }

    // Setting current stage
    function setStage(level){
        stage = level;
        localStorage.setItem('stage', stage);
    }

    // Login user and set current logged in user
    function login(userID){
        currUsr = userID;
        localStorage.setItem('loggedInUser', currUsr);
    }

    // Set current user to null
    function logout(){
        localStorage.setItem('loggedInUser', null);
    }

    // Fill dashboard's input boxes with pre-loaded data
    function fillDashboard(){
        previousData = JSON.parse(localStorage.getItem('subDat'));
        if(previousData != null){
            const labels = Array.from(document.querySelectorAll('.label'));
            const marks = Array.from(document.querySelectorAll('.mrks'));
            labels.forEach( (label,index) => {
                label.value = previousData[index].label;
                marks[index].value = previousData[index].y;
            })
        }
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
            $("#displayName").text(currUsr);
            fillDashboard();
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

    // About page visible initially
    $("#error-msg").hide();
    initStage();
    renderDoc();

    // Switch to login page
    $('#getStarted').click(() => {
        $('.about').css("transform", "rotateX(100deg)");
        $('.app-info').fadeOut(800);
        setStage("1A");
    });

    // On successful login, switch to dashboard
    $("#loginBtn").click(function () {
        if ($("#studentPass").val() == studentPassword[0]) {
            $(".login-container").fadeOut(200);
            login(currentStudent.split(" ")[0]);
            $("#displayName").text(currUsr);
            $(".dashboard").fadeIn(3000);
            setStage("2");
        }
        else {
            $('#error-msg').fadeIn();
        }
    });

    // Clear data from input boxes 
    $('#clearData').click(() => {
        localStorage.removeItem('subDat');
        location.reload();
    });

    /**
    * Render Graph in Canvas
    * 
    * Current Libraries: CanvasJS
    * Options: Google Charts, D3JS
    * 
    */
    $('#submitData').click(() => {

        // Switch from dashboard to graph canvas
        $(".dashboard").fadeOut(200);
        $('.result-container').fadeIn(3000);

        setStage("3");
        
        // Get user data
        const labels = Array.from(document.querySelectorAll('.label'));
        const marks = Array.from(document.querySelectorAll('.mrks'));
        const stuData = labels.map( (lbl, index) => {
            return {y: marks[index].value, label: lbl.value}
        });

        // Store the input data locally
        localStorage.setItem('subDat', JSON.stringify(stuData));

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

        // Google Charts

    });

    // Go back to previous stage
    $(backBtn).click( () => {
        if(stage == '1A')
            setStage('0');
        else if(stage == '2')
            setStage('1A');
        else if(stage == '3')
            setStage('2');
        location.reload();
    });

    // Reset to initial stage
    $(resetBtn).click( () => {
        setStage('0');
        logout();
        location.reload();
    });

});