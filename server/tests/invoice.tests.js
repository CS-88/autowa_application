const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/invoive.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/invoice'

//Testing Invoice Routes with Error Messages and Success Messages

describe('Invoice Routes Tests Suite', () => {


    it('should return invoice created message as success', done => {
        chai
          .request(app)
          .post(api+'/create')
          .send(mock.mockObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should return invoice records by center email', done => {
        chai
          .request(app)
          .post(api+'/get/serviceCenter')
          .send({service_center_email : mock.mockObject.service_center_email})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.service_center_email,res.body[0].service_center_email,err)
            done();
        });
    });


    it('should return invoice records by center email', done => {
        chai
            .request(app)
            .post(api + '/get/user')
            .send({ customer_email: mock.mockObject.customer_email })
            .end((err, res) => {
                res.should.have.status(200);
                chai.assert.equal(mock.findObject.customer_email, res.body[0].customer_email, err)
                done();
            });
    });


    it('should delete service record that was created', done => {
        chai
          .request(app)
          .delete(api+'/delete')
          .send({service_center_email : "testservicecenter@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success", res.body.message, err)
            done();
        });
    });
});