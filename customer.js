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
        const header = `Rental record for ${this.name}\n`;

        const rentalLines = this.rentals
            .map(rental => `\t${rental.movie.title}\t${rental.fee()}`)
            .join('\n');

        const footer = `\nAmount owed is ${this.rentalsFee()}\nYou earned ${this.totalFrequentRenterPoints()} frequent renter points.`;

        return header + rentalLines + footer;
    }

    totalFrequentRenterPoints() {
        return this.rentals.reduce((total, rental) => total + rental.frequentRenterPoints(), 0)
    }

    rentalsFee() {
        return this.rentals.reduce((total, rental) => total + rental.fee(), 0)
    }
}