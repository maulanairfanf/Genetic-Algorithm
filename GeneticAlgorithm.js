function random(x){ //random math chromosom
	let chromosom = [];
	for(let i = 0; i < x; i++){
		chromosom.push(Math.round(Math.random()))
  }
  return chromosom;
  // console.log(chromosom)
}

function initialPopulasi(x){ //random populasi
  let populasi = []
  for(let i = 0; i < x; i++){
    populasi.push(random(4))
  }
  console.log(populasi);
}

function binaryToReal(rMin,rMax,x){
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

function decode(x){
  let x1 = x.slice(0, x.length/2);
  console.log(x1)
  let x2 = x.slice(x.length/2, x.length);
  console.log(x2)
  console.log("x1 : " + binaryToReal(-1,2,x1))
  console.log("x2 : " + binaryToReal(-1,1,x2))
  x1 = binaryToReal(-1,2,x1)
  x2 = binaryToReal(-1,1,x2)
  return {x1,x2}
}

console.log(decode(random(6)))

// decode(random(6))

// initialPopulasi(5)

function fungsiH(x1,x2){
  return (Math.cos(x1)*Math.sin(x2)) - (x1/(Math.pow(x2,2) + 1))

}

const main = () =>{
  let test = new fungsiH(2,3);
}

main();
