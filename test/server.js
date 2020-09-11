const _ = require('lodash');
function join() {
    const res = _.join(['Hello', 'webpack', 'I'], ' world ');
    return res;
}
console.log(join());


const moment = require('moment')
function momendCheck() {
    const res = moment(new Date()).format('DD/MM/YYYY hh:mm')
    return res
}
console.log(momendCheck())

const axios = require('axios')
axios.get('http://api.icndb.com/jokes/random')
    .then(function (response) {
        res = response.data
        joke = res.value.joke
        console.log(joke)
    })
    .catch(function(error) {
        console.log(error)
    })
