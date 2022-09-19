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

  // COBRINDO 63.33% DAS LINHAS:
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(UserModel, 'findOne').resolves(null);
    })
    afterEach(() => {
      sinon.restore();
    })
    it('Retorna 401 - Endpoint do /login SEM permitir o acesso COM um email inválido no FRONT - Back-end', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(mockados.loginMock);
      expect(response.status).to.be.equal(401)
    })
    it('Retorna mensagem de erro - Endpoint do /login SEM permitir o acesso COM um email inválido no FRONT - Back-end', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(mockados.loginMock);
      expect(response.body.message).to.be.equal('Incorrect email or password');
    })
  })


  // COBRINDO 70% DAS LINHAS:
  describe('login/validate', () => {
    describe('/login/validate', () => {
      beforeEach(() => {
        sinon.stub(UserModel, 'findOne').resolves(mockados.userMock as UserModel);
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Retorna status 200 - Endpoint do /login/validate onde haja o retorno dos dados de forma correta no FRONT', async () => {
        const response = await chai.request(app)
          .get('/login/validate').set('Authorization', mockados.tokenMock.token);
        expect(response.status).to.be.equal(200)
      })
      it('Retorna mensagem - Endpoint do /login/validate onde haja o retorno dos dados de forma correta no FRONT', async () => {
        const response = await chai.request(app)
          .get('/login/validate').set('Authorization', mockados.tokenMock.token);
        expect(response.body.role).to.be.equal('admin')
      })
    })
  })

  // COBRINDO 72.22% DOS TESTES:
  describe('Matches', () => {
    describe('/matches', () => {
      beforeEach(() => {
        sinon.stub(MatchesModel, 'findAll').resolves(mockados.listMatchesMock as unknown as MatchesModel[])
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Endpoint do /matches filtrando as partidas em andamento na tela de partidas no FRONT', async () => {
        const response = await chai.request(app).get('/matches')
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockados.listMatchesMock)
      })
    });
    describe('/matches?inProgress=true', () => {
      beforeEach(() => {
        sinon.stub(MatchesModel, 'findAll').resolves(mockados.listMatchesInProgressTrueMock as unknown as MatchesModel[])
      })
      afterEach(() => {
        sinon.restore();
      })
      it('Endpoint do /matches filtrando as partidas em andamento na tela de partidas no FRONT', async () => {
        const response = await chai.request(app).get('/matches?inProgress=true')
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(mockados.listMatchesInProgressTrueMock)
      })
    })
  });

  // COBRINDO 79.44% DOS TESTES:
  describe('/matches', () => {
    afterEach(() => {
      sinon.restore();
    })
    it('Endpoint do /matches onde será possível salvar uma partida com o status: inProgress - como true no banco de dados', async () => {
      sinon.stub(MatchesModel, 'create').resolves(mockados.responseCreateMatchMock as unknown as MatchesModel)
      sinon.stub(TeamModel, 'findByPk').resolves(mockados.listMatchesMock[0] as unknown as TeamModel)
      const response = await chai.request(app)
        .post('/matches')
        .send(mockados.requestCreateMatchMock)
        .set('Authorization', mockados.userTokenMock.token)
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(mockados.responseCreateMatchMock)
    })
    it('Endpoint do /matches onde NÃO seja possível inserir uma partida com times iguais', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send({
          "homeTeam": 8,
          "awayTeam": 8,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        })
        .set('Authorization', mockados.userTokenMock.token)
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('It is not possible to create a match with two equal teams')
    })
    it('Endpoint do /matches onde NÃO seja possível inserir uma partida com um time que não existe na tabelinha TEAMS', async () => {
      sinon.stub(TeamModel, 'findByPk').resolves(null)
      const response = await chai.request(app)
        .post('/matches')
        .send({
          "homeTeam": 1001,
          "awayTeam": 8,
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        })
        .set('Authorization', mockados.userTokenMock.token)
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('There is no team with such id!')
    })
    it('Endpoint do /matches onde NÃO seja possível inserir uma partida se NÃO EXISTIR um token', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(mockados.requestCreateMatchMock)
        .set('Authorization', '')
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token not found!')
    })
    it('Endpoint do /matches onde NÃO seja possível inserir uma partida sem um token QUE SEJA válido', async () => {
      const response = await chai.request(app)
        .post('/matches')
        .send(mockados.requestCreateMatchMock)
        .set('Authorization', mockados.userTokenInvalidMock.token)
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Token must be a valid token')
    })
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});

