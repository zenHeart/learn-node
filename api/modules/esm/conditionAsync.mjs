process.nextTick(() => {
   console.log('nextTick');
});
Promise.resolve().then(() => {
   console.log('promise');
});
console.log('hello')