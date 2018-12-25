const convict = require('convict');

const config = convict({
    req: {
        doc: 'req',
        format: function(value) {
            if(typeof value !== 'function') {
                throw new Error('adsf');
            }
        },
        default:{}
    },
    resp:{
        format:'*',
        default:null
    }
})

config.load({ req: ()=> 1}).validate({ allowed: 'strict' });