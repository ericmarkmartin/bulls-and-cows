import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
chai.use(dirtyChai);

describe('Feathers application tests', () => {
  before(function setup(done) {
    this.server = app.listen(3030);
    this.server.once('listening', done);
  });

  after(function teardown(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () =>
    chai
      .request(app)
      .get('/')
      .set('Accept', 'text/html')
      .then((res) => {
        expect(res.text).to.have.string('<html>');
        expect(res.statusCode).to.equal(200);
      }),
  );

  describe('404', () => {
    const notFoundPath = '/path/to/nowhere/';
    it('shows a 404 HTML page', () =>
      chai
      .request(app)
      .get(notFoundPath)
      .set('Accept', 'text/html')
      .then((res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.text).to.have.string('<html>');
      })
      .catch((err) => {
        expect(err.message).to.equal('Not Found');
        const res = err.response;
        expect(res.statusCode).to.equal(404);
        expect(res.text).to.have.string('<html>');
      }),
    );

    it('shows a 404 JSON error without stack trace', () =>
      chai
      .request(app)
      .get(notFoundPath)
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.statusCode).to.equal(404);
      })
      .catch((err) => {
        expect(err.message).to.equal('Not Found');
        const res = err.response;
        expect(res).to.have.status(404);
        expect(res).to.be.json();
        expect(JSON.parse(res.text).message).to.equal('Page not found');
      }),
    );
  });
});

