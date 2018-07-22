const _ = require('lodash');

var a1 = ['Oded', 'Carmit'];
var a2 = ['Kfir', 'Tomer', 'Lilach'];

const concatArrays = () => {
    return _.concat(a1, a2);
};



module.exports = {
    concatArrays,
    getChildren : () => a2
};