/**
 * javascript 二叉树遍历
 * 2014-07-16
 */
function Node() {
  this.text = '';
  this.leftChild = null;
  this.rightChild = null;
}
var buildTree = function (node, i) {
  var
    leftIndex = 2*i+1,
    rightIndex = 2*i+2;
  if(leftIndex < charecters.length) {
    var childNode = new Node();
    childNode.text = charecters[leftIndex];
    node.leftChild = childNode;
    buildTree(childNode, leftIndex);
  }
  if(rightIndex < charecters.length) {
    var childNode = new Node();
    childNode.text = charecters[rightIndex];
    node.rightChild = childNode;
    buildTree(childNode, rightIndex);
  }
}
var charecters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var node = new Node();
node.text = charecters[0];
buildTree(node, 0);
var preorder = function (node) {
  console.log(node.text);
  node.leftChild ? preorder(node.leftChild) : '';
  node.rightChild ? preorder(node.rightChild) : '';
}
//preorder(node);
var inorder = function (node) {
  node.leftChild ? inorder(node.leftChild) : '';
  console.log(node.text);
  node.rightChild ? inorder(node.rightChild) : '';
}
//inorder(node);
var postorder = function (node) {
  node.leftChild ? postorder(node.leftChild) : '';
  node.rightChild ? postorder(node.rightChild) : '';
  console.log(node.text);
}
//postorder(node);
var iterativePreorder = function (node){ //非递归前序遍历
  var stack=[];
  while( node || stack.length ) {
    if ( node ) {
      console.log(node.text);
      stack.push(node);
      node = node.leftChild;
    } else {
      node = stack.pop();
      node = node.rightChild
    }
  }
}
//iterativePreorder(node);
var iterativeInorder = function (node){ //非递归中序遍历
  var stack=[];
  while( node || stack.length ) {
    if ( node ) {
      stack.push(node);
      node = node.leftChild;
    } else {
      node = stack.pop();
      console.log(node.text);
      node = node.rightChild
    }
  }
}
//iterativeInorder(node);
