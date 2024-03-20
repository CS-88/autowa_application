const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/serviceCenter.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/serviceCenter'

//Testing Service Center Routes with Error Messages and Success Messages

describe('Service Center Routes Tests Suite', () => {    


    it('should return service center created message as success', done => {
        chai
          .request(app)
          .post(api+'/register')
          .send(mock.mockObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should return that service center email already exists', done => {
        chai
          .request(app)
          .post(api+'/register')
          .send(mock.mockObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("Email Already Exists!",res.body.Error,err)
            done();
        });
    });


    it('should return service center login as success', done => {
        chai
          .request(app)
          .post('/api/auth/login/web')
          .send({ email : mock.mockLoginObject.email , password : mock.mockLoginObject.password})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("testservicecenter@gmail.com",res.body.email,err)
            done();
        });
    });


    it('should return service center login as Incorrect Username or Password', done => {
        chai
          .request(app)
          .post('/api/auth/login/web')
          .send({ email : mock.mockFalseLoginObject.email , password : mock.mockFalseLoginObject.password })
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("Email or Password is Incorrect",res.body.Error,err)
            done();
        });
    });


    it('should return the service center information by name', done => {
        chai
          .request(app)
          .post(api+'/get/name')
          .send({name : mock.mockObject.name})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.name,res.body.name,err)
            chai.assert.equal(mock.findObject.email,res.body.email,err)
            done();
        });
    });


    it('should return the service center information by email', done => {
        chai
          .request(app)
          .post(api+'/get/email')
          .send({email : mock.mockObject.email})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.name,res.body.name,err)
            chai.assert.equal(mock.findObject.email,res.body.email,err)
            done();
        });
    });


    it('should return the service centers by location', done => {
        chai
          .request(app)
          .post(api+'/get/location')
          .send({location : mock.mockObject.location})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(1,res.body.length,err)
            done();
        });
    });


    it('should return the service centers by rating', done => {
        chai
          .request(app)
          .post(api+'/get/rating')
          .send({rating : "5"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(1,res.body.length,err)
            done();
        });
    });

    it('should update service center details and return success', done => {
        chai
          .request(app)
          .put(api+'/update')
          .send(mock.updateObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should delete service center record that was created', done => {
        chai
          .request(app)
          .delete(api+'/delete')
          .send({email : "testservicecenter@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });
});