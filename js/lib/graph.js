import { htmlDecode, loadFile } from './util.js';
import { SQUENCE_PATH, MERMAID_PATH, FLOWCHART_PATH } from '../config.js';

const loadFiles = async function(files) {
  // can't use forEach here!!
  for (let file of files) {
    await loadFile(file, undefined, true);
  }
};

async function parseGraph(element, index, type) {
  let diagram;
  if (type === 'mermaid') {
    await loadFiles(MERMAID_PATH);
    mermaid.init({ noteMargin: 10 }, '.mermaid');
  } else if (type === 'seq') {
    await loadFiles(SQUENCE_PATH);
    diagram = Diagram.parse(htmlDecode(element.innerHTML));
    drawGraph(element, index, type, diagram);
  } else {
    await loadFiles(FLOWCHART_PATH);
    diagram = flowchart.parse(htmlDecode(element.innerHTML));
    drawGraph(element, index, type, diagram);
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
  ['mermaid', 'seq', 'flow'].forEach((type) => {
    const dom = document.getElementsByClassName(type);
    Array.prototype.forEach.call(dom, function(element, index) {
      parseGraph(element, index, type);
    });
  })
}
