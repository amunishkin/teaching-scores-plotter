/* --- Function defns --- */
// Histogram ploting ------------------------------------------------
function makeHistogram3() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("https://raw.githubusercontent.com/amunishkin/teaching-scores-plotter/master/data/plot-3.csv", 
        function(data){ processHistogramData3(data) } 
        );
}
function processHistogramData3( allRows ) 
{
    console.log(allRows);
    var x = [];
    for (var i=0; i<allRows.length; i++) {
        row = allRows[i];
        x.push( row['Current Score'] );
    }
    console.log( 'X',x );
    makeHistogramPlotly3( x );
}
function makeHistogramPlotly3( x ){
    var plotDiv = document.getElementById("hist-plot-area3");
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
function makePieChart3() 
{
    // Plotting CSV data from AJAX call
    Plotly.d3.csv("https://raw.githubusercontent.com/amunishkin/teaching-scores-plotter/master/data/plot-3.csv", 
        function(data){ processPieData3(data) } 
        );
}
function processPieData3( allRows ) 
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
    makePiePlotly3( values );
}
function makePiePlotly3( values ){
    var plotDiv = document.getElementById("pie-plot-area3");
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
makeHistogram3();
makePieChart3();

// Current Plotly.js version
console.log( Plotly.BUILD );