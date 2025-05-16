import {Store} from './store.js'
import {Rental} from "./rental";
import {StatementStringFormatter} from "./statement-string-formatter";
import {Customer} from "./customer";
import {Movie} from "./movie";

let chai = require('chai')
chai.should()

let store = new Store()

let children_movie = store.addMovie(new Movie('Cinderella', Store.PRICE_CODE_CHILDRENS))
let regular_movie = store.addMovie(new Movie('Star Wars', Store.PRICE_CODE_REGULAR))
let new_release_movie = store.addMovie(new Movie('Gladiator', Store.PRICE_CODE_NEW_RELEASE))

let john_smith = store.addCustomer(new Customer('John Smith'))

john_smith.addRental(new Rental(children_movie, 5))
john_smith.addRental(new Rental(regular_movie, 5))
john_smith.addRental(new Rental(new_release_movie, 5))

describe("store", function () {

    describe("movies", function () {

        it("should be 3", function () {
            store.movies.length.should.equal(3)
        })

        it("should have the correct titles", function () {
            store.movies[0].title.should.equal('Cinderella')
            store.movies[1].title.should.equal('Star Wars')
            store.movies[2].title.should.equal('Gladiator')
        })

        it("should have the correct price codes", function () {
            store.movies[0].priceCode.name.should.equal('CHILDRENS')
            store.movies[1].priceCode.name.should.equal('REGULAR')
            store.movies[2].priceCode.name.should.equal('NEW RELEASE')
        })

    })

    describe("customers", function () {

        it("should be 1", function () {
            store.customers.length.should.equal(1)
        })

        it("should have the correct name", function () {
            store.customers[0].name.should.equal('John Smith')
        })

    })

    let customer = store.customers[0]

    describe("rentals", function () {

        it("should be 3", function () {
            customer.rentals.length.should.equal(3)
        })

        it("should be for the correct movies", function () {
            customer.rentals[0].movie.title.should.equal('Cinderella')
            customer.rentals[1].movie.title.should.equal('Star Wars')
            customer.rentals[2].movie.title.should.equal('Gladiator')
        })

        it("should be for the correct number of days rented", function () {
            customer.rentals[0].daysRented.should.equal(5)
            customer.rentals[1].daysRented.should.equal(5)
            customer.rentals[2].daysRented.should.equal(5)
        })

        it("should have the correct rentals fee", function () {
            customer.rentalsFee().should.equal(24.5)
        })

        it("should have the correct frequent renter points", function () {
            customer.totalFrequentRenterPoints().should.equal(4)
        })

        it("should charge 1.5 when movie is children and rental duration is until 4 days", function () {
            let rental = new Rental(children_movie, 4);

            rental.fee().should.equal(1.5)
        })

        it("should charge additional 1.5 for each day after the fourth rental days when the movie is children", function () {
            let rental = new Rental(children_movie, 5);

            rental.fee().should.equal(3)
        })

        it("should charge 2 when movie is regular and rental duration is until 2 days", function () {
            let rental = new Rental(regular_movie, 2);

            rental.fee().should.equal(2)
        })

        it("should charge additional 1.5 for each day after the second rental days when the movie is regular", function () {
            let rental = new Rental(regular_movie, 4);

            rental.fee().should.equal(5)
        })

        it("should 3 for each rental days when movie is new release", function () {
            let rental = new Rental(new_release_movie, 2);

            rental.fee().should.equal(6)
        })

        it("should charge two points when movie is new release and rental duration is greater than 1 day", function () {
            let rental = new Rental(new_release_movie, 2);

            rental.frequentRenterPoints().should.equal(2)
        })

        it("should charge one point when movie is different than new release", function () {
            new Rental(children_movie, 2).frequentRenterPoints().should.equal(1)
            new Rental(regular_movie, 2).frequentRenterPoints().should.equal(1)
        })

    })

    describe("statement", function () {

        it("should have the correct format", function () {
            let statement = new StatementStringFormatter().format(customer);

            statement.should.equal('Rental record for John Smith\n\tCinderella\t3\n\tStar Wars\t6.5\n\tGladiator\t15\nAmount owed is 24.5\nYou earned 4 frequent renter points.')
        })

    })

})
