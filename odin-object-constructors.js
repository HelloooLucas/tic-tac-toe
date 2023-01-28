// function Player(name, marker, house) {
//   this.name = name;
//   this.marker = marker;
//   this.house = house;
//   this.sayName = function () {
//     console.log("I'm ", this.name);
//   };
// }

// const Lucas = new Player("Lucas", "X", "Ravenclaw");
// const Val = new Player("Val", "O", "Hufflepuff");

// Lucas.sayName();
// Val.sayName();

// // /////////////////////////////////////////
// // /////////////////////////////////////////

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.info = function () {
//     return `${this.title}, ${this.author}, ${this.pages} pages, ${
//       this.read ? "read" : "not read"
//     }`;
//   };
// }

// const harryPotter = new Book("Harry Potter 2", "JK Rowling", 364, false);
// console.log(harryPotter.info());

// // /////////////////////////////////////////
// // /////////////////////////////////////////

// function Student() {}

// Student.prototype.sayName = function () {
//   console.log("I'm ", this.name);
// };

// function EightGrader(name) {
//   this.name = name;
//   this.grade = 8;
// }

// EightGrader.prototype = Object.create(Student.prototype);
// // EightGrader.prototype = { ...Student.prototype }; ==> work too

// const Suro = new EightGrader("Suro");

// Suro.sayName();
// console.log(Suro.grade);

// /////////////////////////////////////////
// /////////////////////////////////////////

function Person(name) {
  const sayName = () => console.log("Hi, I'm ", name);
  return { sayName };
}

function Nerd(name) {
  const prototype = Person(name);
  const nerdyStuff = () => console.log("Nerdy stuff");
  return Object.assign({}, prototype, { nerdyStuff });

  // This also works
  // return {
  //   ...prototype,
  //   nerdyStuff,
  // };
}

const Lucas = Nerd("Lucas");
Lucas.sayName();
Lucas.nerdyStuff();
