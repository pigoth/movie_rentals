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
        let result = "Rental record for " + this.name + "\n"
        for (let i = 0; i < this.rentals.length; i++) {
            let rental = this.rentals[i]
            result += "\t" + rental.movie.title + "\t" + rental.fee() + "\n";
        }
        result += "Amount owed is " + this.rentalsFee() + "\n";
        result += "You earned " + this.totalFrequentRenterPoints() + " frequent renter points.";
        return result;
    }

    totalFrequentRenterPoints() {
        return this.rentals.reduce((total, rental) => total + rental.frequentRenterPoints(), 0)
    }

    rentalsFee() {
        return this.rentals.reduce((total, rental) => total + rental.fee(), 0)
    }
}