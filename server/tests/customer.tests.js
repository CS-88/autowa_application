const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/customer.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/customer'

//Testing Customer Routes with Error Messages and Success Messages

describe('Customer Routes Tests Suite', () => {    
    
    it('should return customer email needs to be valid', done => {
        chai
          .request(app)
          .post(api+'/register')
          .send(mock.mockFalseObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal('"email" must be a valid email',res.body.Error,err)
            done();
        });
    });

    it('should return customer created message as success', done => {
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


    it('should return that email already exists', done => {
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


    it('should return customer login as success', done => {
        chai
          .request(app)
          .post('/api/auth/login/mobile')
          .send({ email : mock.mockLoginObject.email , password : mock.mockLoginObject.password})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("testuser@gmail.com",res.body.email,err)
            done();
        });
    });


    it('should return customer login as Incorrect Username or Password', done => {
        chai
          .request(app)
          .post('/api/auth/login/mobile')
          .send({ email : mock.mockFalseLoginObject.email , password : mock.mockFalseLoginObject.password })
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("Email or Password is Incorrect",res.body.Error,err)
            done();
        });
    });


    it('should return the customer information', done => {
        chai
          .request(app)
          .post(api+'/get')
          .send({email : "testuser@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.name,res.body.name,err)
            chai.assert.equal(mock.findObject.email,res.body.email,err)
            chai.assert.equal(mock.findObject.mobile_no,res.body.mobile_no,err)
            chai.assert.equal(mock.findObject.vehicle_model,res.body.vehicle_model,err)
            chai.assert.equal(mock.findObject.vehicle_number,res.body.vehicle_number,err)
            chai.assert.equal(mock.findObject.vehicle_type,res.body.vehicle_type,err)
            chai.assert.equal(mock.findObject.url,res.body.url,err)
            done();
        });
    });


    it('should update customer details and return success', done => {
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


    it('should return that mobile number needs 10 characters', done => {
        chai
          .request(app)
          .put(api+'/update')
          .send(mock.updateFalseObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal('"mobile_no" length must be at least 10 characters long',res.body.Error,err)
            done();
        });
    });


    it('should update customer Password and return success', done => {
        chai
          .request(app)
          .put(api+'/update/password')
          .send({ email : "testuser@gmail.com" , old_password : "testuser123" , new_password : "testuser1234" , retype_new_password : "testuser1234"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });

    it('should return customer Old Password is not valid', done => {
        chai
          .request(app)
          .put(api+'/update/password')
          .send({ email : "testuser@gmail.com" , old_password : "testuser123" , new_password : "testuser1234" , retype_new_password : "testuser1234"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("Please Enter the Valid Old Password",res.body.Error,err)
            done();
        });
    });


    it('should delete customer record that was created', done => {
        chai
          .request(app)
          .delete(api+'/delete')
          .send({email : "testuser@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });
});