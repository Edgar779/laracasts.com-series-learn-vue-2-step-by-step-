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

    this.setData( fields );
    
    this.errors = new Errors();
  }
  setData( data ) {
    for ( let field in data ) {
      this[ field ] = data[field];
    }
  }
  // Returns the payload of the form to send
  data() {
    let data = {};

    for (let field in this.originalData ) {
      data[field] = this[field];
    };

    return data;
  }
  submit( requestType, url ) {
    this.submited = true;

    return new Promise( ( resolve, reject ) => {

      axios[requestType]('/api/' + url, this.data() )
          .then( response => {
            this.onSuccess( response );
            resolve( response );
          })
          .catch( errors => {
            this.onFail( errors.response.data );
            reject( errors.response.data );
          })
    })
    
  }
  onSuccess( response ) {
    this.reset();
  }
  onFail( errors ) {
    this.errors.record( errors );
  }
  reset() {
    this.submited = false;
    for ( let field in this.originalData ) {
      this[ field ] = '';
    }
  }
}