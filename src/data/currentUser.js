import { SUBSCRIPTIONS } from "../services/access.service.js";

export const freeUser = {
  id: "user-free",
  age: 18,
  name: "Usuario Free",
  email: "demo@capsula.com",
  subscription: SUBSCRIPTIONS.FREE,
  subscriptionStart: null,
  subscriptionEnd: null,
  rentals: [],
  activeRentals: [],
  preferredGenres: [],
  favoriteMovies: [],
  history: [],
  reviews: [],
};

export const standardUser = {
  id: "user-standard",
  age: 24,
  name: "Usuario Standard",
  email: "standard@capsula.com",
  subscription: SUBSCRIPTIONS.STANDARD,
  subscriptionStart: null,
  subscriptionEnd: null,
  rentals: [],
  activeRentals: [],
  preferredGenres: [],
  favoriteMovies: [],
  history: [],
  reviews: [],
};

export const premiumUser = {
  id: "user-premium",
  age: 31,
  name: "Usuario Premium",
  email: "premium@capsula.com",
  subscription: SUBSCRIPTIONS.PREMIUM,
  subscriptionStart: null,
  subscriptionEnd: null,
  rentals: [],
  activeRentals: [],
  preferredGenres: [],
  favoriteMovies: [],
  history: [],
  reviews: [],
};