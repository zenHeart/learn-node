const vm = require ('vm');

function parent () {
  let b = 1;
  function childrenFunc () {
    console.log ('b:', b);
  }
  let funcBody = `
		console.log('b:',b)
`;
  let res =  new Function(funcBody);// vm.compileFunction (funcBody);
  console.log (res.toString ());
  childrenFunc();
  res ();
}

parent ();
