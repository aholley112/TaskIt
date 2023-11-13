export class User {
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpDate: Date
  ) {}

  public get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) return null;
    return this._token;
  }

  public setToken(token: string, expirationDate: Date) {
    this._token = token;
    this._tokenExpDate = expirationDate;
  }
}
