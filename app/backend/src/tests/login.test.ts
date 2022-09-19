import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/user.model';
import MatchesModel from '../database/models/matches.model';
import TeamModel from '../database/models/team.model';
import { mockados } from './mockados.test';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// COBRINDO 60% DAS LINHAS:
describe('Teste de Login', () => {
  describe('Req2 - Login', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne').resolves(mockados.userMock as UserModel);
    })
    afterEach(() => {
      sinon.restore();
    })
  })

  it('Retorna status 200 - Front-end - Acesso aos dados válidos', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockados.loginMock);
    expect(response.status).to.be.equal(200)
  })

  it('Retorna token correto - Front-end - Acesso aos dados válidos', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockados.loginMock);
    expect(response.body.token.split('.')[0]).to.be.equal(mockados.tokenMock.token.split('.')[0]);
  })

  it('Retorna status 400 - Endpoint do /login SEM permitir o acesso sem informar um email no FRONT - Back-end', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockados.loginEmptyEmailMock);
    expect(response.status).to.be.equal(400)
  })

  it('Retorna mensagem de erro - Endpoint do /login SEM permitir o acesso sem informar um email no FRONT - Back-end', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockados.loginEmptyEmailMock);
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

  it('Retorna status 400 - Endpoint do /login no back-end SEM permitir o acesso sem um password no FRONT, retorna status 400 - Back-end', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockados.loginEmptyPasswordMock);
    expect(response.status).to.be.equal(400)
  })

  it('Retorna mensagem de erro - Endpoint do /login no back-end SEM permitir o acesso sem um password no FRONT, retorna status 400 - Back-end', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockados.loginEmptyPasswordMock);
    expect(response.body.message).to.be.equal('All fields must be filled');
  })

});

