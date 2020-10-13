function chromosom(x){ //pembentukan cromosom random memiliki 6 array
	let chromosom = [];
	for(let i = 0; i < x; i++){
		chromosom.push(Math.round(Math.random()))
  }
  return chromosom;
}

function initialPopulasi(x){ //pembentukan populasi angka 6 merupakan arraynya
  let populasi = []
  for(let i = 0; i < x; i++){
    populasi.push(chromosom(6))
  }
  return populasi
}

function binaryEncoding(rMin,rMax,x){ //implementasi rumus binary encoding
  let total = 0;
  for(let i = 1; i <= x.length ; i++){
    total += Math.pow(2,-i)
  }

  let kanan = 0;
  for(let i = 1 ; i <= x.length ; i++){
    kanan += x[i-1] * Math.pow(2,-i)
  }

  return rMin + (rMax - rMin) / total *(kanan)
}

function decode(x){ //implementasi decode 3 to 1 dan memecah array menjadi x1 dan x2
  let x1 = x.slice(0, x.length/2);
  console.log("[ "+x1+" ] => " + "x1 : " + binaryEncoding(-1,2,x1))
  let x2 = x.slice(x.length/2, x.length);
  console.log("[ "+x2+" ] => " + "x2 : " + binaryEncoding(-1,1,x2))
  console.log(" ")
  x1 = binaryEncoding(-1,2,x1)
  x2 = binaryEncoding(-1,1,x2)
  let temp = []
  temp.push(x1)
  temp.push(x2)
  return temp
}

function loopingPopulasi(n){ //push angka yang sudah dicode ke dalam populasi
  let x = []
  for(let i = 0 ; i < n.length ; i++ ){
    x.push(decode(n[i]))
  }
  return x
}

function fungsiH(x1,x2){
  return (Math.cos(x1)*Math.sin(x2)) - (x1/(Math.pow(x2,2) + 1))
}

function fitness(n){
  let f = []
  for(let i = 0 ; i < n.length ; i++){
    temp = 1 / (fungsiH(n[i][0],n[i][1]) + 0.01)
    f.push(temp)
  }
  return f
}

function nilaiMin (fitbar){
  console.log(fitbar)
  console.log(fitbar[0])
  let min = 2;
  for(let i = 0 ; i < fitbar.length ; i ++){
    console.log(fitbar[i])
    if(fitbar[i] < min){
      min = fitbar[i];
    }
  }
  return min
}

function RouletteWheelSelection (fitbar){
  let total = 0;
  for(let i = 0 ; i < fitbar.length ; i++ ){
    total += fitbar[i] + Math.abs(min) + 0.01
  }
  let r = Math.random()
  let indv = 0
  while((r > 0) && (indv < (fitbar.length-1))){
    r -= fitbar[indv]/total
    indv += 1
  }
  return indv
}

console.log(" ")
console.log("Initial Populasi : ")
let populasi = initialPopulasi(6)
console.log(" ")
console.log(populasi)


console.log(" ")
console.log("Setelah Docode : ")
console.log(" ")
let afterDecode = loopingPopulasi(populasi)
console.log(" ")
console.log("Populasi setelah di decode : ")
console.log(" ")
console.log(afterDecode)

console.log("Fitness")
console.log(" ")
let fitbar = fitness(afterDecode)
console.log(fitbar)
let min = nilaiMin(fitbar)
// console.log("min : "+min);
console.log(" ")
console.log("Index Populasi :  ")
console.log(" ")
let roulette1 = RouletteWheelSelection(fitbar)
let roulette2 = RouletteWheelSelection(fitbar)
console.log(roulette1,roulette2)
// console.log(roulette2)

console.log(" ")
console.log("Populasi dari index yang di dapat :  ")
console.log(" ")
console.log(populasi[roulette1])
console.log(populasi[roulette2])

const main = () =>{

}

main();
