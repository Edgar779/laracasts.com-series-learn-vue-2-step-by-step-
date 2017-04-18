export default class Errors {
  constructor() {
    this.errors = {};
  }
  get( field ) {
    if ( this.errors[field] ) {
      return this.errors[field].message;
    }
  }
  record( errors ) {
    this.errors = errors;
  }
  clear( ev ) {
    if ( ev.target ) {
      delete this.errors[ ev.target.name ];
    } 
  }
}