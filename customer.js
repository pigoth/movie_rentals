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
        let frequentRenterPoints = 0
        let result = "Rental record for " + this.name + "\n"
        // determine amounts for each line
        for (let i = 0; i < this.rentals.length; i++) {
            let each = this.rentals[i]
            let thisAmount = each.rentalFee(each);
            // add frequent renter points
            frequentRenterPoints++;
            // add bonus for a two-day new-release rental
            if ((each.movie.priceCode.name === 'NEW RELEASE') && (each.daysRented > 1)) {
                frequentRenterPoints++;
            }
            // show figures for this rental
            result += "\t" + each.movie.title + "\t" + thisAmount + "\n";
            totalAmount += thisAmount;
        }
        // add footer lines
        result += "Amount owed is " + totalAmount + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points.";
        return result;
    }

}