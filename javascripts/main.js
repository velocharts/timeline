// Code goes here

var data = [{"startDate":19350101,"endDate":19541201,"name":"Gino Bartali","surname":"Bartali","wins":34,"nation":"Italy","nColour":"#FF69b4","baseHeight":0,"tourWins":2},
{"startDate":19390101,"endDate":19591201,"name":"Fausto Coppi","surname":"Coppi","wins":40,"nation":"Italy","nColour":"#FF69b5","baseHeight":34,"tourWins":2},
{"startDate":19480101,"endDate":19591201,"name":"Louison Bobet","surname":"Bobet","wins":19,"nation":"France","nColour":"#0824F6","baseHeight":74,"tourWins":3},
{"startDate":19540101,"endDate":19691201,"name":"Jaques Anquetil","surname":"Anquetil","wins":32,"nation":"France","nColour":"#0824F6","baseHeight":93,"tourWins":5},
{"startDate":19650101,"endDate":19781201,"name":"Felice Gimondi","surname":"Gimondi","wins":23,"nation":"Italy","nColour":"#FF69b5","baseHeight":125,"tourWins":1},
{"startDate":19680101,"endDate":19781201,"name":"Eddy Merckx","surname":"Merckx","wins":103,"nation":"Belgium","nColour":"#7EC0EE","baseHeight":148,"tourWins":5},
{"startDate":19750101,"endDate":19861201,"name":"Bernard Hinault","surname":"Hinault","wins":61,"nation":"France","nColour":"#0824F6","baseHeight":251,"tourWins":5},
{"startDate":19810101,"endDate":19901201,"name":"Greg Lemond","surname":"Lemond","wins":11,"nation":"United States","nColour":"red","baseHeight":312,"tourWins":3},
{"startDate":19820101,"endDate":19931201,"name":"Laurent Fignon","surname":"Fignon","wins":20,"nation":"France","nColour":"#0824F6","baseHeight":323,"tourWins":2},
{"startDate":19850101,"endDate":19961201,"name":"Miguel Indurain","surname":"Indurain","wins":27,"nation":"Spain","nColour":"orange","baseHeight":343,"tourWins":5},
{"startDate":19920101,"endDate":20111201,"name":"Lance Armstrong","surname":"Armstrong","wins":14,"nation":"United States","nColour":"red","baseHeight":370,"tourWins":7},
{"startDate":20030101,"endDate":20150201,"name":"Alberto Contandor","surname":"Contador","wins":57,"nation":"Spain","nColour":"orange","baseHeight":384,"tourWins":3}];


// Parse date
var parseDate = d3.time.format("%Y%m%d");

//Default to attributed
var ybuttonid = "Attributed";
//Set size of graphic
var margin = {top: 10, right: 10, bottom: 30, left: 30},
    width = 700 - margin.left - margin.right,
    height = 490 - margin.top - margin.bottom;
//Scale for the xaxis
var x = d3.time.scale()
    .range([0, width]);
//scale for the y axis 0.2 is the padding between bars
var y = d3.scale.linear()
    .range([height, 0]);
//decalre xaxis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");    
//set up the svg within the viz div
var svg = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

data.forEach(function(d) {
    d.startDate = String(d.startDate);
    d.startDate = parseDate.parse(d.startDate);
 
  });
  
data.forEach(function(d) {
    d.endDate = String(d.endDate);
    d.endDate = parseDate.parse(d.endDate);
  });  
  var fullRange = 0;
data.forEach(function(d) {
    
    fullRange = d.wins + fullRange;
 
  });    

//find out the extent of the data
x.domain([d3.min(data, function(d) { return d.startDate; }),d3.max(data, function(d) { return d.endDate; })]);

  y.domain([0, fullRange]);
    
// add the labels
var startPoint = 0;


//add the bars!
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("fill",function(d) {return d.nColour; })
      .attr("x", function(d) { return x(d.startDate); })
      .attr("y", function(d) {  return  y(d.wins + d.baseHeight); })
      .attr("width", function(d) {return x( d.endDate) - x(d.startDate); })
      .attr("height", function(d) { return height - y(d.wins) ; });
	
	  
//add the axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
     
    
  svg.append("g")
   .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Pro Wins");
     
     
     svg.selectAll(".bartext")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
.attr("fill", "white")
.attr("dy",".35em")
.attr("x", function(d,i) {
    return x(d.startDate) + (x( d.endDate) - x(d.startDate)) / 2 ;
})
.attr("y", function(d,i) {
    return y(d.wins + d.baseHeight) + (height - y(d.wins)) / 2;
})
.text(function(d){
     return d.surname;
});
     
//run it
//function type(d) {
 // return d;
//}
