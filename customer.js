import {Store} from "./engine";
import {Rental} from "./rental";

export class Customer {
    constructor(name) {
        this.name = name
        this.rentals = []
    }

    addRental(rental) {
        this.rentals.push(rental)
        return rental;
    }

    statement() {
        let totalAmount = 0
        let totalFrequentRenterPoints = 0
        let result = "Rental record for " + this.name + "\n"
        // determine amounts for each line
        for (let i = 0; i < this.rentals.length; i++) {
            let rental = this.rentals[i]
            let thisAmount = rental.fee(rental);
            let frequentRenterPoints = this.frequentRenterPoints(rental);
            // show figures for this rental
            result += "\t" + rental.movie.title + "\t" + thisAmount + "\n";
            totalAmount += thisAmount;
            totalFrequentRenterPoints += frequentRenterPoints;
        }
        // add footer lines
        result += "Amount owed is " + totalAmount + "\n";
        result += "You earned " + totalFrequentRenterPoints + " frequent renter points.";
        return result;
    }

    frequentRenterPoints(rental) {
        let isMoreThanOneDayNewReleaseRental = rental.movie.priceCode === Store.PRICE_CODE_NEW_RELEASE && rental.daysRented > 1;
        return isMoreThanOneDayNewReleaseRental ? 2 : 1;
    }
}