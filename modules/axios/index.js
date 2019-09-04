const axios = require ('axios');

// GET request for remote image
axios ({
  method: 'get',
  url: 'https://registry.npmjs.org/',
}).then (function (response) {
	console.log(response.data)
});
