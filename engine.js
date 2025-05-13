import {Customer} from "./customer";

class PriceCode {
  constructor(name) {
    this.name = name
  }
}

class Movie {
  constructor(title, priceCode) {
    this.title = title
    this.priceCode = priceCode
  }
}

export class Rental {
  constructor(movie, daysRented) {
    this.movie = movie
    this.daysRented = daysRented
  }
}

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
