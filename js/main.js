var pageCounter = 1;
var animalContainer = document.getElementById('animal-info');
var btn = document.getElementById('btn');

btn.addEventListener('click',function () {
    var request = new XMLHttpRequest();
    request.open('GET','https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        var data = JSON.parse(request.responseText);
        renderHTML(data);
      } else {
        console.log('conextado al servidor, error en status');
      }
    };

    request.onerror = function() {
       console.log('error en request');
    };
    request.send();
    pageCounter++;
    if (pageCounter > 3) {
        btn.classList.add('hide-me');
    }
});

function renderHTML(data){
    var htmlString = '';

    for(i = 0; i < data.length; i++){
        htmlString += '<p>' + data[i].name + ' es un ' + data[i].species + ' que le gusta ';
        for(ii = 0; ii < data[i].foods.likes.length; ii++){
            if (ii == 0) {
                htmlString += data[i].foods.likes[ii];
            }else{
               htmlString += ' y ' + data[i].foods.likes[ii];
            }
        }
        htmlString += ' y no le gusta ';
        for(ii = 0; ii < data[i].foods.dislikes.length; ii++){
            if (ii == 0) {
                htmlString += data[i].foods.dislikes[ii];
            }else{
               htmlString += ' y ' + data[i].foods.dislikes[ii];
            }
        }
    }
    htmlString += '.</p>';
    animalContainer.insertAdjacentHTML('beforeend',htmlString);
}
