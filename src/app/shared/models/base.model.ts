export class BaseModel<T> {
  protected data: T;

  get id(): number | string {
    return this.data && this.data.hasOwnProperty('id') ? this.data['id'] : void 0;
  }

  constructor(data: T) {
    this.data = data;
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.data));
  }
}
