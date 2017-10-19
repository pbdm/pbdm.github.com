import { htmlDecode, loadFile } from './util.js';

const SQUENCE_PATH = [
  '//cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js',
  '//cdn.bootcss.com/raphael/2.2.1/raphael.min.js',
  '//cdn.bootcss.com/js-sequence-diagrams/1.0.6/sequence-diagram-min.js'
];

const MERMAID_PATH = [
  '//cdn.bootcss.com/mermaid/7.0.0/mermaid.min.js'
]

const FLOWCHART_PATH = ['//cdn.bootcss.com/flowchart/1.7.0/flowchart.min.js'];

const loadFiles = function(files) {
  return files.reduce((sequence, file) => {
    return sequence.then(function() {
      return loadFile(file, 'js', true);
    });
  }, Promise.resolve());
};

function parseGraph(element, index, type) {
  let diagram;
  if (type === 'mermaid') {
    loadFiles(MERMAID_PATH).then(() => {
      mermaid.initialize({startOnLoad:true});
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
