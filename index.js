// eslint-disable-next-line no-undef
const { json, select } = d3;

const source = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const height = 500;
const width = 800;

const svg = select('svg')
  .attr('width', width)
  .attr('height', height);

json(source)
  .then((data) => {
    // x axis
    svg.append('g')
      .attr('id', 'x-axis');

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
