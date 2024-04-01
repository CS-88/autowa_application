const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/serviceRecord.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/serviceRecord'

//Testing Service record Routes with Error Messages and Success Messages

describe('Service Record Routes Tests Suite', () => {


    it('should return service record created message as success', done => {
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


    it('should return the service center service records by center email', done => {
        chai
          .request(app)
          .post(api+'/get/serviceCenter/records')
          .send({service_center_email : mock.mockObject.service_center_email})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.service_center_email,res.body[0].service_center_email,err)
            done();
        });
    });


    it('should return the service center service records by center email', done => {
        chai
            .request(app)
            .post(api + '/get/user/records')
            .send({ customer_email: mock.mockObject.customer_email })
            .end((err, res) => {
                res.should.have.status(200);
                chai.assert.equal(mock.findObject.service_center_email, res.body[0].service_center_email, err)
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