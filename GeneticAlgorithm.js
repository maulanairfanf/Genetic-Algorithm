function initialChromosom(x){ //pembentukan cromosom random memiliki 6 array
	let chromosom = [];
	for(let i = 0; i < x; i++){
		chromosom.push(Math.round(Math.random(x)))
  }
  return chromosom;
}

function initialPopulasi(x){ //pembentukan populasi angka 6 merupakan arraynya
  let populasi = []
  for(let i = 0; i < x; i++){
    populasi.push(initialChromosom(x))
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

function nilaiMin (x){
  let min = 2;
  for(let i = 0 ; i < x.length ; i ++){
    if(x[i] < min){
      min = x[i];
    }
  }
  return min
}

function RouletteWheelSelection (x){
  let total = 0;
  for(let i = 0 ; i < x.length ; i++){ // jadi nilai positif
    x[i] = x[i] + Math.abs(nilaiMin(x)) + 0.01
  }

  for(let i = 0 ; i < x.length ; i++ ){ // hitung total
    total += x[i] 
  }
  
  let r = Math.random()
  let indv = 0
  while((r > 0) && (indv < (x.length-1))){ //ini buat roulette
    r -= x[indv]/total
    indv += 1
  }
  return indv
}

function crossOVer(roulette1,roulette2,change){
  let pointer = Math.floor(Math.random() * roulette1.length);
  let child1 = roulette1 ;
  let child2 = roulette2 ;
  let ganti = Math.random() 
  if (ganti <= change){ //terjadi persilangan di antara parent
    console.log("terjadi persilangan")
    console.log(" ")

    console.log("pointer : " + pointer )
    console.log(" ")

    let parent1Slide1 = roulette1.slice(0,pointer)
    console.log("parent 1 slide 1 : " + parent1Slide1)
    console.log(" ")

    let parent1Slide2 = roulette1.slice(pointer,roulette1.length)
    console.log("parent 1 slide 2 : " + parent1Slide2)
    console.log(" ")

    let parent2Slide1 = roulette2.slice(0,pointer)
    console.log("parent 2 slide 1 : " + parent2Slide1)
    console.log(" ")

    let parent2Slide2 = roulette2.slice(pointer,roulette1.length)
    console.log("parent 2 slide 2 : " + parent2Slide2)
    console.log(" ")

    child1 = parent1Slide1.concat(parent2Slide2);
    child2 = parent2Slide1.concat(parent1Slide2);
  }
  let temp = []
  temp.push(child1)
  temp.push(child2)
  console.log("Hasil Persilangan : ")
  console.log(" ")
  return temp
}

function mutation(child1,child2,probMut){
  for(i = 0 ; i < child1.length ; i ++){
    let random = Math.random()
    if (random <= probMut){
      if(child1[i] == 0){
        child1[i] = 1;
      }else{
        child1[i] = 0;
      }
      if(child2[i] == 0){
        child2[i] = 1;
      }else{
        child2[i] = 0;
      }
    }
  }
  let temp = []
  temp.push(child1)
  temp.push(child2)
  return temp
}

function sorting(populasi,fitness,afterDecode){
  let gabungan = [populasi,fitness,afterDecode]
  let fitnessSort = [];
  for(let i = 0; i < fitness.length ; i++){
    console.log(fitness[i])
    for( let j = i + 1 ; j < fitness.length ; j++){
      if(fitness[j] < fitness[i]){
        let min = fitness[j]
        fitness[i] = fitness[j];
        fitnessSort.push(fitness[i])
      }
    }
  }
  // fitness.sort()
  console.log(fitnessSort)
  
}


// console.log(" ")
// console.log("Initial Chromosome : ")
// let chromosom = initialChromosom(5)
// console.log(" ")
// console.log(chromosom)

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
let Fitness = fitness(afterDecode)
console.log(Fitness)
let min = nilaiMin(Fitness)
// console.log("min : "+min);
console.log(" ")
console.log("Index Populasi :  ")
console.log(" ")
let roulette1 = RouletteWheelSelection(Fitness)
let roulette2 = RouletteWheelSelection(Fitness)
console.log(roulette1,roulette2)

console.log(" ")
console.log("Populasi dari index yang di dapat :  ")
console.log(" ")
console.log(populasi[roulette1])
console.log(populasi[roulette2])

console.log(" ")
let child = crossOVer(populasi[roulette1],populasi[roulette2],0.5)
console.log(child)

console.log(" ")
console.log("Hasil mutasi : ")
let childMutation = mutation(child[0],child[1],0.5)
console.log(childMutation)

Fitness = fitness(afterDecode) //untuk mendapata fitnss awal
console.log("Hasil concat : ")
sorting(populasi,Fitness,afterDecode)






const main = () =>{

}

main();
