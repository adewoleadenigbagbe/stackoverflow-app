const chai = require('chai');
const chaiHttp = require('chai-http');

const dbConnection = require('../helpers/dbconnection');
const User = require('../models/user');

const app = require('../app');

const should = chai.should();
chai.use(chaiHttp);

describe('Run test cases on User Module', function () {

    before("Connect to the database", function (done) {
        let conn = dbConnection();
        conn.then(() => {
            console.log("Sucessfully connected to the database ");
            let port = process.env.Port || 6901;
            app.listen(port, () => {
                console.log(`jsoff-head running on port ${port}`);
                done();
            });
        })
            .catch(err => {
                console.log("Failed connecting to the database" + err)
                done(err);
            });
    })

    describe('Sign up', function () {
        it("clear the users", function (done) {
            User.deleteMany({}, (err) => {
                if (err) {
                    console.log(err)
                    done(err);
                }
                done();
            });
        });

        it("Invalid username (NEG SCENARIO 1)", function (done) {
            let user = new User({
                username: "",
                password: "tajudeen",
                email: "tajudeen@gmail.com",
            });
            chai.request(app)
                .post('/api/v1/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        });
        it("Invalid password (NEG SCENARIO 2)", function (done) {
            let user = new User({
                username: "tajudeen",
                password: "",
                email: "tajudeen@gmail.com",
            });
            chai.request(app)
                .post('/api/v1/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        });

        it("Invalid email (NEG SCENARIO 3)", function (done) {
            let user = new User({
                username: "tajudeen",
                password: "tajudeen",
                email: "",
            });
            chai.request(app)
                .post('/api/v1/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        });

        it("Add (POS SCENARIO )", function (done) {
            let user = new User({
                username: "tajudeen",
                password: "tajudeen",
                email: "tajudeen@gmail.com",
            });
            chai.request(app)
                .post('/api/v1/user/signup')
                .send(user)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(201);
                    res.body.should.have.property('auth', true);
                    done();
                })
        });

    })
});



