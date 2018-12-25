const convict = require('convict');

const config = convict({
    req: {
        doc: 'req',
        format: function(value) {
            if(typeof value !== 'object') {
                throw new TypeError('expect object');
            }
        },
        default:{}
    }
})
let apiConfig = require('./config.js');
config.load(apiConfig);