let a = require ('./a');
let b = require ('./b');

setInterval (() => {
  a ();
  b ();
  clearCache ();
}, 2000);

let clearCache = (function () {
  let i = 1;

  return () => {
    if (i++ % 3 === 0) {
	  delete require.cache[require.resolve ('./a')];
	  a = require('./a')
      console.log ('clear module a success');
    }
  };
}) ();
