document.addEventListener('DOMContentLoaded', function() {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
         .then(response => response.json())
         .then(data => {
             document.getElementById('dummy').innerHTML = JSON.stringify(data);
         })
})