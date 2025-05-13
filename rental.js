import {Store} from "./store";

export class Rental {
    constructor(movie, daysRented) {
        this.movie = movie
        this.daysRented = daysRented
    }

    fee() {
        if (this.movie.priceCode === Store.PRICE_CODE_REGULAR) {
            let fee = 2
            if (this.daysRented > 2) {
                fee += ((this.daysRented - 2) * 1.5);
            }
            return fee;
        } else if (this.movie.priceCode === Store.PRICE_CODE_NEW_RELEASE) {
            return  this.daysRented * 3
        } else if (this.movie.priceCode === Store.PRICE_CODE_CHILDRENS) {
            let fee = 1.5;
            if (this.daysRented > 3) {
                fee = (this.daysRented - 3) * 1.5;
            }
            return fee;
        } else {
            return 0;
        }
    }

    frequentRenterPoints() {
        let isMoreThanOneDayNewReleaseRental = this.movie.priceCode === Store.PRICE_CODE_NEW_RELEASE && this.daysRented > 1;
        return isMoreThanOneDayNewReleaseRental ? 2 : 1;
    }
}