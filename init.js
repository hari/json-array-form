/**
 * Initial global variables and other initial functions.
 */

var users = [];
var outputNode = document.getElementById('output');
var nextId = 0;

document.getElementById('file').onchange = function (event) {
  var files = event.target.files;
  if (files.length === 0) {
    return alert('Please select a file.');
  }
  document.getElementById('info').innerText = '"' + files[0].name + '" selected.';
  clearNode(outputNode);
  var reader = new FileReader();
  reader.onload = function(){
    parse(outputNode, reader.result);
  };
  reader.readAsText(files[0]);
}

document.getElementById('download').onclick = function (event) {
  var dataTable = document.getElementById('output');
  if (dataTable.children.length == 0) {
    return alert('I think there is no data.');
  }
  downloadObjectAsJson(users, 'users');
}

form.addEventListener('click', function (event) {
  event.stopPropagation();
});

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
