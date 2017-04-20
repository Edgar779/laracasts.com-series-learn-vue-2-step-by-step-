import axios from 'axios';

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

export class Form {
  constructor( fields ) {
    this.submited = false;
    this.originalData = fields;

    for ( let field in fields ) {
      this[ field ] = fields[field];
    }

    this.errors = new Errors();
  }
  // Returns the payload of the form to send
  data() {
    // Clone this
    let data = Object.assign({}, this);

    delete data.originalData;
    delete data.errors;

    return data;
  }
  submit( requestType, url ) {
    this.submited = true;
    return axios[requestType]('/api/' + url, this.data() );
  }
  reset() {
    this.submited = false;
    for ( let field in this.originalData ) {
      this[ field ] = '';
    }
  }
}