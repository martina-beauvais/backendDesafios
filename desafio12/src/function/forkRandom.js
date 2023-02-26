function calcularAleatorio(numAleatorio){
    const randoms = Array.from({length : numAleatorio}, () => Math.floor(Math.random()* 1001))
    const res = {}
    for (const num of randoms){
        res[num] = res[num] ? res[num]+1 : 1
    }
    return res
}
process.on('message', numAleatorio => {
    const res = calcularAleatorio(numAleatorio)
    process.send(res)
})
