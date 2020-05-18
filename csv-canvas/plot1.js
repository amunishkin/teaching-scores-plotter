/* --- Function defns --- */
// Histogram ploting ------------------------------------------------
function makeHistogram1() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("https://raw.githubusercontent.com/amunishkin/teaching-scores-plotter/master/data/plot-1.csv", 
        function(data){ processHistogramData1(data) } 
        );
}
function processHistogramData1( allRows ) 
{
    console.log(allRows);
    var x = [];
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        x.push( row['Current Score'] );
    }
    console.log( 'X',x );
    makeHistogramPlotly1( x );
}
function makeHistogramPlotly1( x ){
    var plotDiv = document.getElementById("hist-plot-area1");
    var traces = [{
      x: x,
      type: 'histogram',
      xbins: {
        end: 100,
        size: 3,
        start: 60
      }
    }];
    Plotly.newPlot(plotDiv, traces);
}

// Pie chart ploting ------------------------------------------------
function makePieChart1() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("https://raw.githubusercontent.com/amunishkin/teaching-scores-plotter/master/data/plot-1.csv", 
        function(data){ processPieData1(data) } 
        );
}
function processPieData1( allRows ) 
{
    console.log(allRows);
    var val = 0;
    var values = [0,0,0,0,0]; // A,B,C,D,F
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        val = row['Current Score'];
        if      (val >= 90) { values[0]++ }
        else if (val >= 80) { values[1]++ }
        else if (val >= 70) { values[2]++ }
        else if (val >= 60) { values[3]++ }
        else                { values[4]++ }
        // sort into bins...
        console.log( 'VAL',val );
    }
    makePiePlotly1( values );
}
function makePiePlotly1( values ){
    var plotDiv = document.getElementById("pie-plot-area1");
    var data = [{
        type: 'pie',
        values: values,
        labels: ["A", "B", "C", "D", "F"],
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
    }];
    var layout = {
        height: 400,
        width: 500
    };
    Plotly.newPlot(plotDiv, data, layout);
}

//-------------------------------------------------------------------
/* --- MAIN CODE HERE --- */
makeHistogram1();
makePieChart1();

// Current Plotly.js version
console.log( Plotly.BUILD );