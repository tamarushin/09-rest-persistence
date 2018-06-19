'use strict';

const superagent = require('superagent');
const app = require('../app.js');
// const uuid = require('uuid/v4');

describe('Simple Proof of Life', () => {
  beforeAll(() => {
    app.start(3000);
  });
  afterAll(() => {
    app.stop();
  });

  it('handles an invalid GET request if the route is not the correct route with a 404', () => {

    return superagent.get(`http://localhost:3000/api/v1`)
      .then( () => {
        expect(false).toBeTruthy(); //help from John
      })
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  it('handles a GET request with a valid ID', () => {
    const id = 3232;
    return superagent.get(`http://localhost:3000/api/v1/magazines/?id=${id}`)
      .then(response => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(`magazine number ${id} is needed`);
      });
  });

  it('handles an invalid GET request with an empty ID', () => {
    return superagent.get(`http://localhost:3000/api/v1/magazines/?id=`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
        //Expect response to be the string 'Error: Bad Request'
      });
  });

  it('handles a good POST request with JSON', () => {
    let obj = { content: 'The true tales of Heroine Tama' };
    return superagent.post(`http://localhost:3000/api/v1/magazines/`)
      .send(obj)
      .then(response => {
        expect(response.status.toEqual(200));
        expect(JSON.parse(response.text)).toEqual(obj);('The true tales of the Heroine Tama');
      });
  });

  it('handles an invalid POST request', () => {
    let obj = {}; //empty object passed
    return superagent.post(`http://localhost:3000/api/v1/magazines/`)
      .send(obj)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });

  it('handles a GET request with ID that was not found', () => {
    return superagent.get(`http://localhost:3000/api/v1/password/?id=<uuid>`)
      .catch(response => {
        expect(response.status).toEqual(404);
        expect(response.toString()).toEqual('Error: ID Not Found');
      });
  });
  
  it('handles a DELETE request with a valid ID', () => {
    let id = 3232; //magazine with a valid ID
    return superagent.delete(`http://localhost:3000/api/v1/magazines?id=${id}`)
      .then(response => {
        expect(response.statusCode).toEqual(204);
        expect(response.text).toEqual('');
      });
  });
  it('handles an invalid DELETE request with no valid ID', () => {
    return superagent.delete(`http://localhost:3000/api/v1/magazines/?id=<uuid>`)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });

  it('handles a good PUT request with JSON', () => {
    let obj = { name: 'Tama', content: 'Super Heroine'};
    return superagent.put(`http://localhost:3000/api/v1/password/`)
      .send(obj)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(JSON.parse(response.text)).toEqual(obj);
        //console.log(obj.name); //expected result: Tama
        //console.log(obj.content); //expected result: Super Heroine
      });
  }); //Parse is to break apart object

  it('handles an invalid PUT request', () => {
    let obj = {}; //empty object passed in
    return superagent.put(`http://localhost:3000/api/v1/magazine/`)
      .send(obj)
      .catch(response => {
        expect(response.status).toEqual(400);
        expect(response.toString()).toEqual('Error: Bad Request');
      });
  });
});

