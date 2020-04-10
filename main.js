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
        const percentage = identicalResults / 15 * 100;
        return `Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage.toFixed 
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
  
  const obiect = pAequorFactory(1, mockUpStrand());
  const obiect2 = pAequorFactory(2, mockUpStrand());
  console.log(obiect.dna);
  console.log(obiect.willLikelySurvive());
  console.log(obiect.compareDna(obiect2));
  
  const pAequorArr = [];
  let number = 1;
  let objector = pAequorFactory(number, mockUpStrand());
  while (pAequorArr.length < 30) {
    if (objector.willLikelySurvive()) {
    pAequorArr.push(objector);
    console.log('Here');
    number += 1;
    objector = pAequorFactory(number, mockUpStrand());
    }
    else {
      objector = pAequorFactory(number, mockUpStrand());
    }  
  }
  
  console.log(pAequorArr);