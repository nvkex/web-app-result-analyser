var loginBox = true;
var studentDashboard = false;
var resultArea = false;
var studentNameArray = ["A B"];
var studentRollNoArray = [1810991169];
var studentPassword = ["123456"];
var currentStudentIndex = 0;
var currentStudent = studentNameArray[currentStudentIndex];
$(document).ready(function () {

    $(".error-msg").hide();
    $(".dashboard").hide();

    $("#loginBtn").click(function () {
        if ($("#studentPass").val() == studentPassword[0]) {
            $(".login-container").fadeOut();
            $("#displayName").text(currentStudent.split(" ")[0]);
            $(".dashboard").fadeIn(3000);
        }
        else {
            $('#error-msg').fadeIn();
        }
    });
});