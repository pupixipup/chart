// Load JSON data
const colors = {
  "Wii": "#DA8462",
  "Multiple": "#995D81",
  "NES": "#D8DC6A",
  "Wii U/Switch": "#6689A1"
}

d3.json("data.json").then(function(data) {

  document.getElementById("sortOption").addEventListener("change", function() {
  updateChart(this.value); // Call updateChart function with the selected sorting option
});

function updateChart(sortOption) {
    data = sortBy(data, sortOption);
  

  // Clear SVG
  svg.selectAll("*").remove();

  // Update scales
  xScale.domain(data.map(d => d.title));
  yScale.domain([0, d3.max(data, d => d.copies_sold_million)]).nice();

  // Add bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.title))
    .attr("y", d => yScale(d.copies_sold_million))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d.copies_sold_million))
    .attr("fill", d => colors[d.platform]);

  // Add labels
  svg.selectAll(".text")        
    .data(data)
    .enter()
    .append("text")
    .attr("class","label")
    .attr("x", (function(d) { return xScale(d.title); }  ))
    .attr("y", function(d) { return yScale(d.copies_sold_million) - 20; })
    .attr("dy", ".75em")
    .text(function(d) { return `${d.country_of_production}, ${d.release_year}`; }); 

  // Add x-axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));
}


// Function to sort bars by copies sold
function sortBy(data, prop) {
  data.sort((a, b) => {
const aProp = a[prop];
const bProp = b[prop];
if (!isNaN(Number(aProp))) {
  return bProp - aProp;
} else {
  return aProp.localeCompare(bProp)
}
  }
);
  return data;
}

  // Data processing (if necessary)

  // Set up chart dimensions
  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Create SVG element
  const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  // Create scales
  
  const xScale = d3.scaleBand()
      .domain(data.map(d => d.title))
      .range([margin.left, width - margin.right])
      .padding(0.1);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.copies_sold_million)])
      .nice()
      .range([height - margin.bottom, margin.top]);

      
  // Create bars
  svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.title))
      .attr("y", d => yScale(d.copies_sold_million))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.copies_sold_million))
      .attr("fill", d => colors[d.platform]);

      svg.selectAll(".text")        
      .data(data)
      .enter()
      .append("text")
      .attr("class","label")
      .attr("x", (function(d) { return xScale(d.title); }  ))
      .attr("y", function(d) { return yScale(d.copies_sold_million) - 20; })
      .attr("dy", ".75em")
      .text(function(d) { return `${d.country_of_production}, ${d.release_year}`; })
      .attr("font-family", () => "sans-serif")  
  // Add x-axis
  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

  // Add y-axis
  svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(yScale));
  var legend = d3.select("#my_dataviz")

      const circleX = 20;
      const textX = 40;
      legend.append("circle").attr("cx",circleX).attr("cy",130).attr("r", 6).style("fill", "#995D81")
      legend.append("circle").attr("cx",circleX).attr("cy",160).attr("r", 6).style("fill", "#DA8462")
      legend.append("text").attr("x", textX).attr("y", 130).text("Multiple").style("font-size", "15px").attr("alignment-baseline","middle")
      legend.append("text").attr("x", textX).attr("y", 160).text("Wii / Wii Fit").style("font-size", "15px").attr("alignment-baseline","middle")
      legend.append("circle").attr("cx",circleX).attr("cy",190).attr("r", 6).style("fill", "#D8DC6A")
      legend.append("circle").attr("cx",circleX).attr("cy",220).attr("r", 6).style("fill", "#6689A1")
      legend.append("text").attr("x", textX).attr("y", 190).text("NES").style("font-size", "15px").attr("alignment-baseline","middle")
      legend.append("text").attr("x", textX).attr("y", 220).text("Wii U/Switch").style("font-size", "15px").attr("alignment-baseline","middle")

      updateChart("copies_sold_million")
});