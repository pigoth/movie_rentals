export class StatementStringFormatter {
    format(customer) {
        const header = `Rental record for ${customer.name}\n`;

        const rentalLines = customer.rentals
            .map(rental => `\t${rental.movie.title}\t${rental.fee()}`)
            .join('\n');

        const footer = `\nAmount owed is ${customer.rentalsFee()}\nYou earned ${customer.totalFrequentRenterPoints()} frequent renter points.`;

        return header + rentalLines + footer;
    }
}