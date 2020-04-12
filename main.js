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
  
  // Factory function that returns pAequor objects
  function pAequorFactory(specimenNum, dna) {
    return {
      specimenNum,
      dna,
      // mutate randomly selects a base in the object's dna property and changes it to a different one then returns the object's dna.
      mutate () {
        const currentBaseIndex = Math.floor(Math.random() * 15);
        const currentBase = this.dna[currentBaseIndex];
        let newRandomBase = returnRandBase();
        while (newRandomBase === currentBase) {
          newRandomBase = returnRandBase();
        }
        this.dna[currentBaseIndex] = newRandomBase;
        return this.dna;
      },
      /* compareDna takes in another pAequor object, compares how many dna bases are identical in the same locations.
         prints a message that states the percentage of DNA the two objects have in common */
      compareDna (pAequor) {
        let identicalResults = 0;
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === pAequor.dna[i]) {
            identicalResults += 1;
          } 
        }
        const percentage = identicalResults / this.dna.length * 100;
        console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage.toFixed 
  (2)}% in common.`);
      },
      /* compareDnaV2 takes in another pAequor object, compares how many dna bases are identical in the same locations.
         returns a message that states the percentage of DNA the two objects have in common */
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
      // willLikelySurvive returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. Otherwise, .willLikelySurvive() returns false.
      willLikelySurvive () {
        let containsBaseCG = 0;
        for (let i = 0; i < 15; i++){
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
              containsBaseCG += 1;
              }
        }
        const percentageBaseCG = containsBaseCG / 15;
        return percentageBaseCG >= 0.6;
      },
      // complementStrand returns the complementary DNA strand. The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa. 
      complementStrand() {
        const complementaryDna = [];
        this.dna.forEach(element => {
          switch (element) {
            case "A":
              complementaryDna.push("T");
              break
            case "T":
              complementaryDna.push("A");
              break
            case "C":
              complementaryDna.push("G");
              break
            case "G":
              complementaryDna.push("C");
              break
          }
        });
        return complementaryDna;
      }
    }
  };
  
  // Test out the propreties and methods
  const objekt = pAequorFactory(1, mockUpStrand());
  const objekt2 = pAequorFactory(2, mockUpStrand());
  console.log(objekt.dna);
  console.log(objekt.complementStrand());
  console.log(objekt.willLikelySurvive());
  console.log(objekt.compareDna(objekt2));
  console.log(objekt.compareDnaV2(objekt2));
  
  const pAequorArr = [];
  let number = 1;

  // With the factory function set up, create 30 instances of pAequor that can survive in their natural environment. Store these instances in an array.
  while (pAequorArr.length < 30) {
    let objector = pAequorFactory(number, mockUpStrand());
    if (objector.willLikelySurvive()) {
    pAequorArr.push(objector);
    }
    number ++;

  }
  
  console.log(pAequorArr);