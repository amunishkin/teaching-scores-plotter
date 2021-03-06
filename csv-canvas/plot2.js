/* --- Function defns --- */
// Histogram ploting ------------------------------------------------
function makeHistogram2() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("https://raw.githubusercontent.com/amunishkin/teaching-scores-plotter/master/data/plot-2.csv", 
        function(data){ processHistogramData2(data) } 
        );
}
function processHistogramData2( allRows ) 
{
    console.log(allRows);
    var x = [];
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        x.push( row['Current Score'] );
    }
    console.log( 'X',x );
    makeHistogramPlotly2( x );
}
function makeHistogramPlotly2( x ){
    var plotDiv = document.getElementById("hist-plot-area2");
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
function makePieChart2() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("https://raw.githubusercontent.com/amunishkin/teaching-scores-plotter/master/data/plot-2.csv", 
        function(data){ processPieData2(data) } 
        );
}
function processPieData2( allRows ) 
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
    makePiePlotly2( values );
}
function makePiePlotly2( values ){
    var plotDiv = document.getElementById("pie-plot-area2");
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
makeHistogram2();
makePieChart2();

// Current Plotly.js version
console.log( Plotly.BUILD );