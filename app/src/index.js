import './css/style.scss';
import flowchart from 'flowchart.js';

function htmlDecode(input) {
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}

function parseGraph(element, index, type) {
  var diagram;
  if (type === 'seq') {
    diagram = Diagram.parse(htmlDecode(element.innerHTML));
  } else { // flow
    diagram = flowchart.parse(htmlDecode(element.innerHTML));
  }
  var canvas = document.createElement('div');
  canvas.setAttribute("id", type + index);
  element.innerHTML = '';
  element.appendChild(canvas)
    diagram.drawSVG(type + index, {theme: 'simple'});
}

var seqs = document.getElementsByClassName('seq');
Array.prototype.forEach.call(seqs, function( element, index ) {
  parseGraph(element, index, 'seq');
});

var flows = document.getElementsByClassName('flow');
Array.prototype.forEach.call(flows, function( element, index ) {
  parseGraph(element, index, 'flow');
});
