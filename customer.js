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
            let each = this.rentals[i]
            let thisAmount = each.fee(each);
            let frequentRenterPoints = this.frequentRenterPoints(each);
            // show figures for this rental
            result += "\t" + each.movie.title + "\t" + thisAmount + "\n";
            totalAmount += thisAmount;
            totalFrequentRenterPoints += frequentRenterPoints;
        }
        // add footer lines
        result += "Amount owed is " + totalAmount + "\n";
        result += "You earned " + totalFrequentRenterPoints + " frequent renter points.";
        return result;
    }

    frequentRenterPoints(each) {
        let isMoreThanOneDayNewReleaseRental = each.movie.priceCode === Store.PRICE_CODE_NEW_RELEASE && each.daysRented > 1;
        return isMoreThanOneDayNewReleaseRental ? 2 : 1;
    }
}