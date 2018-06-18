use strict';

const superagent = require('superagent');
const app = require('../app.js');
const uuid = require('uuid/v4');

describe('Simple Proof of Life', () => {
  beforeAll(() => {
    app.start(3000);
  });
  afterAll(() => {
    app.stop();
  });

  // it('handles an invalid GET request if the route is not the correct route with a 404', () => {

  //   return superagent.get('http://localhost:3000/?month=June')
  //     .then( () => {
  //       expect(false).toBeTruthy(); //help from John
  //     })
  //     .catch(response => {
  //       expect(response.status).toEqual(404);
  //     });
  // });

  it('handles a GET request with a valid ID', () => {
    const id = 3232;
    return superagent.get(`http://localhost:3000/api/v1/password/?id=${id}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toEqual(`Please enter your password ${id} now`);
      });
  });

//   it('handles an invalid GET request with an empty ID', () => {
//     return superagent.get(`http://localhost:3000/api/v1/password/?id=${id}`)
//       .catch(response => {
//         expect(response.status).toEqual(400);
//         expect(response.toString()).toEqual('Error: Bad Request');
//       });
//   });

//   it('handles a GET request with ID that was not found', () => {
//     let id = uuid();
//     return superagent.get(`http://localhost:3000/api/v1/password/?id=${id}`)
//       .catch(response => {
//         expect(response.status).toEqual(404);
//         expect(response.toString()).toEqual('Error: ID Not Found');
//       });
//   });

//   it('handles a good POST request', () => {
//     let obj = { name: 'Tama' };
//     let expect = JSON.stringify(obj);
//     return superagent.post('http://localhost:3000/api/v1/password/')
//       .send(obj)
//       .then(response => {
//         expect(response.toString()).toEqual(200);
//       });
//   });

//   it('handles an invalid POST request', () => {
//     let obj = {};
//     let expect = JSON.stringify(obj);
//     return superagent.post('http://localhost:3000/api/v1/password/')
//       .send(obj)
//       .catch(response => {
//         expect(response.statusCode).toEqual(400);
//         expect(response.toString()).toEqual('Error: Bad, Bad, Bad Request');
//       });
//   }); 
// });

