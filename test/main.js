import sum from './sum.js'
function calcSum(a=4, b=8) {
    const result = sum(a, b)
    console.log(result)
}
window.calcSum = calcSum
