// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  function pAequorFactory(specimenNum, dna) {
    return {
      specimenNum,
      dna,
      mutate () {
        const currentBaseIndex = Math.floor(Math.random() * 15);
        const currentBase = this.dna[currentBaseIndex];
        let newRandomBase = returnRandBase();
        while (newRandomBase === currentBase) {
          newRandomBase = returnRandBase();
        }
        this.dna[currentBaseIndex] = newRandomBase;
      },
      compareDna (pAequor) {
        let identicalResults = 0;
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === pAequor.dna[i]) {
            identicalResults += 1;
          } 
        }
        const percentage = identicalResults / this.dna.length * 100;
        return `Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage.toFixed 
  (2)}% in common.`
      },
      compareDnaV2 (pAequor) {
        const result = this.dna.reduce((acc, curr, idx, arr) => {
          if (arr[idx] === pAequor.dna[idx]) {
            return acc + 1;
          }
          else {
            return acc;
          }
        }, 0)
        const percentage2 = result / this.dna.length * 100;
        return `Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage2.toFixed 
          (2)}% in common.`
      },
      willLikelySurvive () {
        let containsBaseCG = 0;
        for (let i = 0; i < 15; i++){
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
              containsBaseCG += 1;
              }
        }
        const percentageBaseCG = containsBaseCG / 15;
        return percentageBaseCG >= 0.6;
      }
    }
  };
  
  const objekt = pAequorFactory(1, mockUpStrand());
  const objekt2 = pAequorFactory(2, mockUpStrand());
  console.log(objekt.dna);
  console.log(objekt.willLikelySurvive());
  console.log(objekt.compareDna(objekt2));
  console.log(objekt.compareDnaV2(objekt2));
  
  const pAequorArr = [];
  let number = 1;
  let objector = pAequorFactory(number, mockUpStrand());
  while (pAequorArr.length < 30) {
    if (objector.willLikelySurvive()) {
    pAequorArr.push(objector);
    number += 1;
    objector = pAequorFactory(number, mockUpStrand());
    }
    else {
      objector = pAequorFactory(number, mockUpStrand());
    }  
  }
  
  console.log(pAequorArr);