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
        $('.result-container').hide();
    }
    else if (stage == "1A") {
        $('.app-info').hide();
        $(".login-container").show();
        $(".dashboard").hide();
        $('.result-container').hide();
    }
    else if (stage == "2") {
        $('.app-info').hide();
        $(".login-container").hide();
        $("#displayName").text(currUsr);
        fillDashboard();
        $(".dashboard").show();
        $('.result-container').hide();

    }
    else if (stage == "3") {
        $('.app-info').hide();
        $(".login-container").hide();
        $(".dashboard").hide();
        $('.result-container').show();
    }
}
