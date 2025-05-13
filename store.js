import {Customer} from "./customer";
import {Movie} from "./movie";
import {PriceCode} from "./price-code";

export class Store {
  constructor() {
    this.movies = []
    this.customers = []
  }
  addMovie(name, priceCode) {
    let movie = new Movie(name, priceCode)
    this.movies.push(movie);
    return movie;
  }
  addCustomer(name) {
    let customer = new Customer(name)
    this.customers.push(customer)
    return customer
  }
}

Store.PRICE_CODE_REGULAR = new PriceCode('REGULAR')
Store.PRICE_CODE_CHILDRENS = new PriceCode('CHILDRENS')
Store.PRICE_CODE_NEW_RELEASE = new PriceCode('NEW RELEASE')
