var tablaContenedor = document.getElementById('tabla-info');
var btn = document.getElementById('btn');

btn.addEventListener('click', function() {
   //borra contenido de tablaContenedor
   while(tablaContenedor.firstChild){
       tablaContenedor.removeChild(tablaContenedor.firstChild);
   }

   var req = new XMLHttpRequest();
    //file:///F:\Descargas\JSONAJAX\data2.json'
   req.open('GET','data2.json');  //se corre con web server for Chrome
    req.onreadystatechange = function() {
        if (req.readyState == 4){
            if (req.status === 200 || req.status == 0){
                //alert(req.responseText);
                var data = JSON.parse(req.responseText);
                renderHTML(data);
            }
        }
    }
    req.onerror = function() { alert('error en request'); }
    req.send(null);
});

function renderHTML(data) {
    var tabla = document.createElement('table');

    //agrega encabezados
    var keys = Object.keys(data[0]);
    var tr = document.createElement('tr');
    for(j = 0; j < keys.length; j++) {
        tr.appendChild( document.createElement('th'));
        tr.cells[j].appendChild(document.createTextNode(keys[j]));
    }
    tabla.appendChild(tr);


    for(i = 0; i < data.length ; i++) {
        keys = Object.keys(data[i]);
        var values = Object.values(data[i]);
        console.log(keys);
        console.log(values);
        //agreda datos
        tr = document.createElement('tr');
        for(j = 0; j < values.length; j++) {
            tr.appendChild( document.createElement('td'));
            tr.cells[j].appendChild(document.createTextNode(values[j]));
        }
        tabla.appendChild(tr);
    }
    tablaContenedor.appendChild(tabla);
}
