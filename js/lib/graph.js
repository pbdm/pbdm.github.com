import { htmlDecode, loadFile } from './util.js';
import { SQUENCE_PATH, MERMAID_PATH, FLOWCHART_PATH } from '../config.js';

const loadFiles = function(files) {
  return files.reduce((sequence, file) => {
    return sequence.then(function() {
      return loadFile(file, undefined, true);
    });
  }, Promise.resolve());
};

function parseGraph(element, index, type) {
  let diagram;
  if (type === 'mermaid') {
    loadFiles(MERMAID_PATH).then(() => {
      mermaid.init({noteMargin: 10}, ".mermaid");
    });
  } else if (type === 'seq') {
    loadFiles(SQUENCE_PATH).then(() => {
      diagram = Diagram.parse(htmlDecode(element.innerHTML));
      drawGraph(element, index, type, diagram);
    });
  } else {
    // flow
    loadFiles(FLOWCHART_PATH).then(() => {
      diagram = flowchart.parse(htmlDecode(element.innerHTML));
      drawGraph(element, index, type, diagram);
    });
  }
}

function drawGraph(element, index, type, diagram) {
  var canvas = document.createElement('div');
  canvas.setAttribute('id', type + index);
  element.innerHTML = '';
  element.appendChild(canvas);
  diagram.drawSVG(type + index, { theme: 'simple' });
}

export function setGraph() {
  const mermaids = document.getElementsByClassName('mermaid');
  Array.prototype.forEach.call(mermaids, function(element, index) {
    parseGraph(element, index, 'mermaid');
  });

  const seqs = document.getElementsByClassName('seq');
  Array.prototype.forEach.call(seqs, function(element, index) {
    parseGraph(element, index, 'seq');
  });

  const flows = document.getElementsByClassName('flow');
  Array.prototype.forEach.call(flows, function(element, index) {
    parseGraph(element, index, 'flow');
  });
}
