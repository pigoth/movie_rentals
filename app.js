import {Store} from './store.js'
import {Rental} from "./rental";
import {StatementStringFormatter} from "./statement-string-formatter";
import {Customer} from "./customer";
import {Movie} from "./movie";

let store = new Store()

let cinderella = store.addMovie(new Movie('Cinderella', Store.PRICE_CODE_CHILDRENS))
let star_wars = store.addMovie(new Movie('Star Wars', Store.PRICE_CODE_REGULAR))
let gladiator = store.addMovie(new Movie('Gladiator', Store.PRICE_CODE_NEW_RELEASE))

let john_smith = store.addCustomer(new Customer('John Smith'))

john_smith.addRental(new Rental(cinderella, 5))
john_smith.addRental(new Rental(star_wars, 5))
john_smith.addRental(new Rental(gladiator, 5))

let statementFormatter = new StatementStringFormatter();

console.log(statementFormatter.format(john_smith))

// You should see:

// Rental record for John Smith
//   Cinderella  3
//   Star Wars 6.5
//   Gladiator 15
// Amount owed is 24.5
// You earned 4 frequent renter points.

