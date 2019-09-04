exports.isRunByNode = function (require,module) {
  if (require.main === module) {
    console.log ('run by node');
  }
};

this.isRunByNode(require,module);