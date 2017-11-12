export default class User {
  constructor({ id, login, password }) {
    this.id = id;
    this.login = login;
    this.password = password;
  }

  compare({ login, password }) {
    return this.login === login && this.password === password;
  }
}
