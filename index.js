const { json, select } = d3;

const source = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

const height = 500;
const width = 800;

const svg = select('svg')
    .attr('width', width)
    .attr('height', height);

json(source)
  .then(data => {
    document.getElementById('dummy').innerHTML = JSON.stringify(data)
  });



  console.log();





  