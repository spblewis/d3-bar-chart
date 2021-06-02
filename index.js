const source = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
const { json } = d3;


json(source)
  .then(data => {
      document.getElementById('dummy').innerHTML = JSON.stringify(data)
    });
