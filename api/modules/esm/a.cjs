Promise.resolve().then(() => {
   console.log('Promise.resolve 1'); // 3
   process.nextTick(() => {
      console.log('nextTick nest'); // 5
   });
   Promise.resolve().then(() => {
      console.log('Promise.resolve nest'); // 4
   });
});
process.nextTick(() => {
   console.log('nextTick'); // 6
});