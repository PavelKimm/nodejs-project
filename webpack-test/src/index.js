import sum from '../../test/sum'

function calcSum(a=4, b=8) {
    const result = sum(a, b)
    document.getElementById("sum").innerHTML = result
    console.log(result)
}
window.calcSum = calcSum