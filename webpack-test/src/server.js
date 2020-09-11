import _ from 'lodash'
import sum from './libSum'
import axios from 'axios'
import moment from 'moment'

function lodashJoin(first, second) {
    const res = _.join([first, second], ' ');
    console.log(res)
}
lodashJoin("hello", "world")

function calcSum(a=4, b=8) {
    const result = sum(a, b)
    console.log(result)
}
calcSum(1, 3)

function momendCheck() {
    const res = moment(new Date()).format('DD/MM/YYYY hh:mm')
    console.log(res)
}
momendCheck()

function getJoke() {
    axios.get('http://api.icndb.com/jokes/random')
    .then((response) => {
        const res = response.data
        const joke = res.value.joke
        console.log(joke)
    })
    .catch((error) => {
        console.log(error)
    })
}
getJoke()
