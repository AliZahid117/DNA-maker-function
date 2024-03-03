// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherOrganism) {
      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          identicalBases++;
        }
      }
      const percentage = (identicalBases / this.dna.length) * 100;
      console.log(`Specimen #${this.specimenNum} and specimen #${otherOrganism.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
    },
    willLikelySurvive() {
      const countCG = this.dna.filter(base => base === 'C' || base === 'G').length;
      const percentageCG = (countCG / this.dna.length) * 100;
      return percentageCG >= 60;
    }
  };
};

const organism1 = pAequorFactory(1, mockUpStrand());
const organism2 = pAequorFactory(2, mockUpStrand());

console.log(organism1.compareDNA(organism2));

console.log(organism1);

console.log(organism2);

// Creates an instance of pAequor
const organism = pAequorFactory(1, mockUpStrand());

// Store the original DNA
const originalDNA = organism.dna.slice();

// Call the .mutate() method
organism.mutate();

// Check if the DNA has changed
if (originalDNA.join('') !== organism.dna.join('')) {
  console.log('Mutation successful:');
  console.log('Original DNA:', originalDNA.join(''));
  console.log('Mutated DNA:', organism.dna.join(''));
} else {
  console.log('Mutation failed.');
}

const create30SurvivableInstances = () => {
  const survivableInstances = [];
  let count = 0;
  while (survivableInstances.length < 30) {
    const organism = pAequorFactory(count, mockUpStrand());
    if (organism.willLikelySurvive()) {
      survivableInstances.push(organism);
    }
    count++;
  }
  return survivableInstances;
};

// Creates 30 instances of pAequor that can survive
const survivableInstances = create30SurvivableInstances();
console.log(survivableInstances.length); // Outputs: 30

console.log(survivableInstances); // Outputs: the survivable DNA strands

