/**
 * APP ROUTE:
 * 
 *      Signup
 *        ||
 *      Login --> Dashboard --> Result Display
 *   
 * 
 */

const dashboardTable = document.querySelector('#subjectData');
var studentNameArray = ["A B"];
var studentRollNoArray = [1810991169];
var studentPassword = ["123456"];
var currentStudentIndex = 0;
var currentStudent = studentNameArray[currentStudentIndex];
$(document).ready(function () {

    // only login page visible initially
    $("#error-msg").hide();
    $(".dashboard").hide();
    $('.result-container').hide();

    // on successful login switch to dashboard
    $("#loginBtn").click(function () {
        if ($("#studentPass").val() == studentPassword[0]) {
            $(".login-container").fadeOut(200);
            $("#displayName").text(currentStudent.split(" ")[0]);
            $(".dashboard").fadeIn(3000);
        }
        else {
            $('#error-msg').fadeIn();
        }
    });

    $('#submitData').click(() => {
        // switch from dashboard to graph canvas
        $(".dashboard").fadeOut(200);
        $('.result-container').fadeIn(3000);
        
        // Get user data
        const labels = Array.from(document.querySelectorAll('.label'));
        const marks = Array.from(document.querySelectorAll('.mrks'));
        const stuData = labels.map( (lbl, index) => {
            return {y: marks[index].value, label: lbl.value}
        });

        // render graph in canvas
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

    });


});