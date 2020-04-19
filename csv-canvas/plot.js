/* --- Function defns --- */
// Histogram ploting ------------------------------------------------
function makeHistogram() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("../data/2020Spring_Grades-CSE-20-01.csv", 
        function(data){ processHistogramData(data) } 
        );
}
function processHistogramData( allRows ) 
{
    console.log(allRows);
    var x = [];
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        x.push( row['Current Score'] );
    }
    console.log( 'X',x );
    makeHistogramPlotly( x );
}
function makeHistogramPlotly( x ){
    var plotDiv = document.getElementById("hist-plot-area");
    var traces = [{
      x: x,
      type: 'histogram',
      xbins: {
        end: 100,
        size: 3,
        start: 60
      }
    }];
    Plotly.newPlot(plotDiv, traces,
      {title: 'Histogram Plot'});
}

// Pie chart ploting ------------------------------------------------
function makePieChart() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("../data/2020Spring_Grades-CSE-20-01.csv", 
        function(data){ processPieData(data) } 
        );
}
function processPieData( allRows ) 
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
    makePiePlotly( values );
}
function makePiePlotly( values ){
    var plotDiv = document.getElementById("pie-plot-area");
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
        width: 500,
        
    };
    Plotly.newPlot(plotDiv, data, layout);
}

//-------------------------------------------------------------------
/* --- MAIN CODE HERE --- */
makeHistogram();
makePieChart();

// Current Plotly.js version
console.log( Plotly.BUILD );