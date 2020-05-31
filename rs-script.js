var loginBox = true;
var studentDashboard = false;
var resultArea = false;
var studentNameArray = ["A B"];
var studentRollNoArray = [1810991169];
var studentPassword = ["123456"];
var currentStudentIndex = 0;
var currentStudent = studentNameArray[currentStudentIndex];
$(document).ready(function () {

    // only login page visible initially
    $("#error-msg").hide();
    $(".dashboard").hide();

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

        // Get graphical representation of data from canvasjs
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
                    { y: 60, label: "DM" },
                    { y: 30, label: "DBMS" },
                    { y: 75, label: "AWT" },
                    { y: 21, label: "JAVA" },
                    { y: 87, label: "OS" }
                ]
            }]
        });
        chart.render();

    });


});