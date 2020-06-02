/**
 * 
 * JQuery Handlers defined here
 * 
 */

$(document).ready(function () {
    
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
    * Default Chart: CanvasJS Bar Chart
    * Current Libraries: CanvasJS, Google Charts
    * Options:  D3JS
    * 
    */
    $('#submitData').click(() => {

        // Switch from dashboard to graph canvas
        $(".dashboard").fadeOut(200);
        $('.final-stage').fadeIn(3000);

        setStage("3");
        
        // Get user data
        const labels = Array.from(document.querySelectorAll('.label'));
        const marks = Array.from(document.querySelectorAll('.mrks'));
        const stuData = labels.map( (lbl, index) => {
            return {y: marks[index].value, label: lbl.value}
        });

        // Store the input data locally
        localStorage.setItem('subDat', JSON.stringify(stuData));

        // Load Default Chart
        canvasCharts(stuData);

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

    $('#barChartBtn').click(() => {
        previousData = JSON.parse(localStorage.getItem('subDat'));
        canvasCharts(previousData);
    });

    $('#pieChartBtn').click(() => {
        previousData = JSON.parse(localStorage.getItem('subDat'));
        googlePie(previousData);
    });

    // Reset to initial stage
    $(resetBtn).click( () => {
        setStage('0');
        logout();
        location.reload();
    });

});