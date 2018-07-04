module.exports =  function loaderA(source) {
    console.log(source);
    source = source  + 'loader a';

    return source;
}