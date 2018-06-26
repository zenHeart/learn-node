/**
 * Created by lockepc on 2017/7/5.
 */

const prodConf= require('./config/prod')
const developConf = require('./config/develop')

module.exports = (env,argc) => {

    if(argc.mode = "development") {
        return developConf
    } else {
        return prodConf;
    }
};
