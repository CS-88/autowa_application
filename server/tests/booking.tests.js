const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/booking.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/booking'

//Testing Booking Routes with Error Messages and Success Messages

describe('Booking Routes Tests Suite', () => {    


    it('should return booking created message as success', done => {
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


    it('should return the bookings in the service center', done => {
        chai
          .request(app)
          .post(api+'/get')
          .send({service_center_email : mock.mockObject.service_center_email})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.name,res.body.name,err)
            chai.assert.equal(mock.findObject.email,res.body.email,err)
            done();
        });
    });

    it('should return the bookings in the service center by status', done => {
      chai
        .request(app)
        .post(api + '/get')
        .send({ service_center_email: mock.mockObject.service_center_email, status : "pending" })
        .end((err, res) => {
          res.should.have.status(200);
          chai.assert.equal(mock.findObject.id, res.body.id, err)
          done();
        });
    });


    it('should return the bookings in the service center by name', done => {
      chai
        .request(app)
        .post(api + '/get/name')
        .send({ booking_name : mock.mockObject.booking_name, service_center_email: mock.mockObject.service_center_email})
        .end((err, res) => {
          res.should.have.status(200);
          chai.assert.equal(mock.findObject.id, res.body.id, err)
          done();
        });
    });


    it('should return the bookings in the service center by vehicle number', done => {
      chai
        .request(app)
        .post(api + '/get/vehicle/number')
        .send({ customer_vehicle_number: mock.mockObject.customer_vehicle_number, service_center_email: mock.mockObject.service_center_email })
        .end((err, res) => {
          res.should.have.status(200);
          chai.assert.equal(mock.findObject.id, res.body.id, err)
          done();
        });
    });


    it('should set the status of the booking', done => {
      chai
        .request(app)
        .put(api + '/set/status')
        .send({ id: "00-00000", status: "accepted" })
        .end((err, res) => {
          res.should.have.status(200);
          chai.assert.equal(res.body.modifiedCount,1, err)
          done();
        });
    });
   

    it('should delete booking record that was created', done => {
        chai
          .request(app)
          .delete(api+'/delete')
          .send({id : "00-00000"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(res.body.deletedCount,1,err)
            
            done();
        });
    });
});