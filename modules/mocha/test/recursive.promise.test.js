const {assert, should, expect} = require ('chai');

describe ('测试 promise', function () {
  it ('promise resolve', function (done) {
     Promise.resolve ()
      .then (() => {
        return Promise.resolve ().then (() => {
          expect (1).to.equal (2);
          done ();
        });
      })
      .catch (done);
  });
  it ('promise resolve 不使用 done', function () {
	return Promise.resolve ()
	 .then (() => {
	   return Promise.resolve ().then (() => {
		 expect (1).to.equal (1);
	   });
	 })
 });
});
