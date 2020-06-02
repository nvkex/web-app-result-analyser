/**
 * 
 * All JS functions defined here
 * 
 */


// Initialize stage
function initStage() {
    stage = localStorage.getItem('stage') != null ? localStorage.getItem('stage') : "0";
    currUsr = localStorage.getItem('loggedInUser') != null ? localStorage.getItem('loggedInUser') : null;
}


// Setting current stage
function setStage(level) {
    stage = level;
    localStorage.setItem('stage', stage);
}

// Login user and set current logged in user
function login(userID) {
    currUsr = userID;
    localStorage.setItem('loggedInUser', currUsr);
}

// Set current user to null
function logout() {
    localStorage.setItem('loggedInUser', null);
}

// Fill dashboard's input boxes with pre-loaded data
function fillDashboard() {
    previousData = JSON.parse(localStorage.getItem('subDat'));
    if (previousData != null) {
        const labels = Array.from(document.querySelectorAll('.label'));
        const marks = Array.from(document.querySelectorAll('.mrks'));
        labels.forEach((label, index) => {
            label.value = previousData[index].label;
            marks[index].value = previousData[index].y;
        })
    }
}

// Rendering document according to the stage
function renderDoc() {
    if (stage == "0") {
        $('.app-info').show();
        $(".login-container").show();
        $(".dashboard").hide();
        $('.final-stage').hide();
    }
    else if (stage == "1A") {
        $('.app-info').hide();
        $(".login-container").show();
        $(".dashboard").hide();
        $('.final-stage').hide();
    }
    else if (stage == "2") {
        $('.app-info').hide();
        $(".login-container").hide();
        $("#displayName").text(currUsr);
        fillDashboard();
        $(".dashboard").show();
        $('.final-stage').hide();

    }
    else if (stage == "3") {
        $('.app-info').hide();
        $(".login-container").hide();
        $(".dashboard").hide();
        previousData = JSON.parse(localStorage.getItem('subDat'));
        if(previousData != null){
            canvasCharts(previousData);
        }
        $('.final-stage').show();
    }
}

function canvasCharts(stuData){
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
}

function googlePie(stuData){
    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Subject', 'Score'],
          [stuData[0].label, parseInt(stuData[0].y)],
          [stuData[1].label, parseInt(stuData[1].y)],
          [stuData[2].label, parseInt(stuData[2].y)],
          [stuData[3].label, parseInt(stuData[3].y)],
          [stuData[4].label, parseInt(stuData[4].y)]
        ]);

        var options = {
          title: 'Student Report',
          backgroundColor: '#2C3A47',
          legend: {textStyle: {color: 'white',fontName: 'rubik'}},
          titleTextStyle: {color: 'white',fontSize: 30, fontName: 'rubik'},
        };

        var chart = new google.visualization.PieChart(document.getElementById('graphCanvas'));

        chart.draw(data, options);
      }
}

function googleDonut(stuData){
    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Subject', 'Score'],
          [stuData[0].label, parseInt(stuData[0].y)],
          [stuData[1].label, parseInt(stuData[1].y)],
          [stuData[2].label, parseInt(stuData[2].y)],
          [stuData[3].label, parseInt(stuData[3].y)],
          [stuData[4].label, parseInt(stuData[4].y)]
        ]);

        var options = {
          title: 'Student Report',
          pieHole: 0.4,
          backgroundColor: '#2C3A47',
          legend: {textStyle: {color: 'white', fontName: 'rubik'}},
          titleTextStyle: {color: 'white',fontSize: 30, fontName: 'rubik'},
        };

        var chart = new google.visualization.PieChart(document.getElementById('graphCanvas'));

        chart.draw(data, options);
      }
}