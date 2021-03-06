const {
  json,
  select,
  scaleLinear,
  scaleTime,
  max,
  min,
  axisBottom,
  axisLeft,
// eslint-disable-next-line no-undef
} = d3;

const source = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const height = 500;
const width = 1000;
const padding = 50;

const formatDate = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  let quarter;

  if (month === '01') {
    quarter = 'Q1';
  } else if (month === '04') {
    quarter = 'Q2';
  } else if (month === '07') {
    quarter = 'Q3';
  } else {
    quarter = 'Q4';
  }

  return `${year}, ${quarter}`;
};

const formatDollars = (dollars) => {
  if (dollars > 1000) {
    return `${(dollars / 1000).toPrecision(3)} Trillion`;
  }
  return `${dollars} Billion`;
};

const svg = select('svg')
  .attr('width', width)
  .attr('height', height);

json(source)
  .then((data) => {
    const dataset = data.data;

    // scale for x axis
    const xScale = scaleTime()
      .domain(
        // todo: declare callback function elsewhere to make this more readable...
        [min(dataset, (d) => new Date(d[0])),
          max(dataset, (d) => new Date(d[0])),
        ],
      )
      .range([padding, width - padding]);
    const xAxis = axisBottom(xScale);

    // scale for y axis
    const yScale = scaleLinear()
      .domain([0, max(dataset, (d) => d[1])])
      .range([height - padding, padding]);
    const yAxis = axisLeft(yScale);

    // define a target for tooltip
    const tooltip = select('#overlay')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('top', `${height * 0.7}px`)
      .style('display', 'none')
      .style('text-align', 'center')
      .style('height', '50px')
      .style('width', '120px')
      .style('background-color', '#D7A491')
      .style('color', 'black')
      .style('padding', '5px')
      .style('line-height', '20px');

    // x axis
    svg.append('g')
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height - padding})`)
      .call(xAxis);

    // y axis
    svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding}, 0)`)
      .call(yAxis);

    // bars
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('data-date', (d) => `${d[0]}`)
      .attr('data-gdp', (d) => d[1])
      .attr('height', (d) => (height - yScale(d[1]) - padding))
      .attr('width', ((width - padding * 2) / dataset.length) * 0.9)
      .attr('x', (_d, i) => ((width - padding * 2) / dataset.length) * i + padding)
      .attr('y', (d) => yScale(d[1]))
      .attr('class', 'bar')

      // Tooltip values here
      .on('mouseover', (d, i) => {
        tooltip.style('display', 'block')
          .attr('data-date', () => `${d[0]}`)
          .style('left', () => `${(((width - padding * 2) / dataset.length) * i + padding) + 10}px`)
          .html(`<p>${formatDate(d[0])}</p><p>${formatDollars(d[1])}</p>`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
  });
