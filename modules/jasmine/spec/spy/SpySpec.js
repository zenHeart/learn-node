debugger
describe('A spy', function () {
  let foo, bar = null;

  beforeEach(function () {
    debugger;
    foo = {
      setBar: function (value) {
        bar = value;
      }
    };

    spyOn(foo, 'setBar');
    foo.setBar(123);
    foo.setBar(456, 'another param');
  });


  it("tracks that the spy was called", function () {
    expect(foo.setBar).toHaveBeenCalled();
  });

  it("tracks that the spy was called x times", function () {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });


  it("tracks all the arguments of its calls", function () {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
  });

  it("stops all execution on a function", function () {
    expect(bar).toBeNull();
  });

})