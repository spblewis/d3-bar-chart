const {
  json,
  select,
  scaleLinear,
  max,
  axisBottom,
// eslint-disable-next-line no-undef
} = d3;

const source = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const height = 500;
const width = 800;
const padding = 30;

const svg = select('svg')
  .attr('width', width)
  .attr('height', height);

json(source)
  .then((data) => {
    // scale for x axis
    const xScale = scaleLinear()
      .domain([0, max(data.data, (d) => d[0])])
      .range([padding, width - padding]);

    const xAxis = axisBottom(xScale);
    // x axis
    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height - padding})`)
      .call(xAxis);

    // y axis
    svg.append('g')
      .attr('id', 'y-axis');

    // bars
    svg.selectAll('rect')
      .data(data.data)
      .enter()
      .append('rect')
      .style('fill', 'blue')
      .attr('height', '200')
      .attr('width', '2')
      .attr('x', (x, i) => i * 3)
      .attr('class', 'bar');
  });
