class Auth {
  constructor() {
    this.authenticated = false;
  }

  setAuthenticated() {
    this.authenticated = true;
  }

  setNotAuthenticated() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
