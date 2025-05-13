export class Customer {
    constructor(name) {
        this.name = name
        this.rentals = []
    }

    addRental(rental) {
        this.rentals.push(rental)
        return rental;
    }

    totalFrequentRenterPoints() {
        return this.rentals.reduce((total, rental) => total + rental.frequentRenterPoints(), 0)
    }

    rentalsFee() {
        return this.rentals.reduce((total, rental) => total + rental.fee(), 0)
    }
}