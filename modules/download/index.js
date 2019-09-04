const fs = require('fs');
const download = require('download');
// debugger
download('https://github.com/kevva/download/archive/master.zip', 'tpl/',{
	extract:true, // extracting the file using decompress
	filename:'ha'
}).then(() => {
	console.log('done!');
});

download('unicorn.com/foo.jpg', 'tpl/',{
	extract:true, // extracting the file using decompress
	filename:'h1a.jpg'
}).then(() => {
	console.log('done!');
});

// 必须保证目录存在
// download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));

/* Promise.all([
	'unicorn.com/foo.jpg',
	'cats.com/dancing.gif'
].map(x => download(x, 'dist'))).then(() => {
	console.log('files downloaded!');
}); */