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
            // show figures for this rental
            result += "\t" + rental.movie.title + "\t" + rental.fee() + "\n";
            totalAmount += rental.fee();
            totalFrequentRenterPoints += rental.frequentRenterPoints();
        }
        // add footer lines
        result += "Amount owed is " + totalAmount + "\n";
        result += "You earned " + totalFrequentRenterPoints + " frequent renter points.";
        return result;
    }

}