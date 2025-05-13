import {Rental} from "./engine";

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
            let thisAmount = this.rentalCost(each);
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

    rentalCost = (each) => {
        let thisAmount = 0
        if (each.movie.priceCode.name === 'REGULAR') {
            thisAmount += 2
            if (each.daysRented > 2) {
                thisAmount += ((each.daysRented - 2) * 1.5);
            }
        } else if (each.movie.priceCode.name === 'NEW RELEASE') {
            thisAmount += each.daysRented * 3
        } else if (each.movie.priceCode.name === 'CHILDRENS') {
            thisAmount += 1.5;
            if (each.daysRented > 3) {
                thisAmount = (each.daysRented - 3) * 1.5;
            }
        }
        return thisAmount;
    }
}