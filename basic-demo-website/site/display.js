var div = document.getElementById("dom-target");
var inputData = JSON.parse(div.textContent);

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

///////////////////

function asteroidsDataToArray(input) {

  var plotPoints = []; //declare empty array

  plotPoints.push(['','',{role: 'annotation'}]);

  for(i=0; i<input.length; i++){
    plotPoints.push([parseInt(input[i].playtime), parseInt(input[i].score), input[i].playername]);
  }

  return plotPoints;
}

///////////////////

function drawChart() {

  var data = asteroidsDataToArray(inputData);

  console.log(data);

  var chartData = google.visualization.arrayToDataTable(data);

  var chartSettings = {
    title: 'Orbitasteroids: records of games',
    hAxis: {title: 'Game Time (ticks)', minValue: 0, maxValue: 15},
    vAxis: {title: 'Score', minValue: 0, maxValue: 15},
    legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

  chart.draw(chartData, chartSettings);
}
