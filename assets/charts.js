charts = {};
(function(){
  if (!charts) {
    charts = {};
  }

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  var margin = {
      top: 0,
      right: 100,
      bottom: 0,
      left: 100
  };

  var width = 420 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // function to create charts
  charts.create = function(id, data, parentSelector, colorMin, colorMax) {
      var svg = parentSelector.append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear()
          .range([0, width])
          .domain([0, d3.max(data, function (d) {
              return d.value;
          })]);

      var y = d3.scaleBand()
          .rangeRound([height, 0], .1)
          .domain(data.map(function (d) {
              return d.name;
          }));

      //make y axis to show bar names
      var yAxis = d3.axisLeft()
          .scale(y)
          //no tick marks
          .tickSize(0)

      var gy = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)

      var colorScale = d3.scaleLinear().domain([0, 5]).range([colorMin, colorMax]);
      var bars = svg.selectAll(".bar")
          .data(data)
          .enter()
          .append("g")
          .style("fill", function(d, i) { return colorScale(d.value); })

      //append rects
      bars.append("rect")
          .attr("class", "bar")
          .attr("y", function (d) {
              return y(d.name);
          })
          .attr("height", y.bandwidth() - 2)
          .attr("x", 0)
          .attr("width", function (d) {
              return 0; // initially zero - not visible
          });

      //retriev the proficiency string based on the stored value
      var getProficiencyStr = function(value) {
          var strOut = "";
          switch(value) {
              case 5:
                  strOut = "Expert";
                  break;
              case 4:
                  strOut = "Advanced";
                  break;
              case 3:
                  strOut = "Intermediate";
                  break;
              case 2:
                  strOut = "Novice";
                  break;
              case 1:
                  strOut = "Basic knowledge";
                  break;
              default:
                  strOut = "Invalid enum";
          }
          return strOut;
      };

      //add a value label to the right of each bar
      bars.append("text")
          .attr("class", "label")
          //y position of the label is halfway down the bar
          .attr("y", function (d) {
              return y(d.name) + y.bandwidth() / 2 + 4;
          })
          //x position is 3 pixels to the right of the bar
          .attr("x", function (d) {
              return x(d.value) + 3;
          })
          .attr("fill-opacity", function(d) {
            return 0; // initially invisible
          })
          .text(function (d) {
              return getProficiencyStr( Number(d.value) );
          });

      // transitions set to trigger when the relevant section becomes active.
      // each section will trigger an 'active' event when scrolled to, but
      // only the ones containing rect and label types will actually have
      // transitions triggered.
      d3.graphScroll()
          .container(d3.select('.page-content'))
          .graph(d3.select('.page-content .container'))
          .eventId(id)
          .sections(d3.selectAll('.page-content .container'))
          .on('active', function(i) {
              // transition width to 100% of x value
              d3.selectAll(".graph-scroll-active rect")
                  .transition()
                  .duration(500)
                  .ease(d3.easeExp)
                  .attr("width", function(d) { return x(d.value); })
                  .delay(function(d,i) { return(i*100); } );

              // transition opacity to 1.0
              d3.selectAll(".graph-scroll-active .label")
                  .transition()
                  .duration(500)
                  .ease(d3.easeExp)
                  .attr("fill-opacity", function(d) { return 1.0; })
                  .delay(function(d,i) { return(i*100); } );
          });
    }
})();


