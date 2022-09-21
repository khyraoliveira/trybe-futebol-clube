// import LeaderboardInterface from '../interfaces/leaderboard.interfaces';
// import LeaderboardModel from '../database/models/leaderboard.model';
import LeaderboardI from '../interfaces/leaderboard.interfaces';
import Match from '../interfaces/match.interfaces';
// import LeaderboardController from '../controllers/leaderboard.controller';
import MatchesServices from './matches.services';

export default class LeaderboardServices {
  static async home() {
    const matches = await MatchesServices.matches();
    const filtrar = this.matchesFinished(matches);
    const matchesFilter = this.matchesHome(filtrar);
    const finalStats = this.homeLeadboarder(matchesFilter);
    const finalStatsSort = this.sortStats(finalStats);
    return finalStatsSort;
  }

  //  REQ 29
  static matchesFinished(matches: Match[]) {
    const filtrado = matches.filter((match) => match.inProgress === false);

    return filtrado;
  }

  static matchesHome(matches: Match[]) {
    const matchesFilter = [];
    for (let index = 1; index < 17; index += 1) {
      matchesFilter[index] = matches.filter((match) => match.homeTeam === index);
    }
    return matchesFilter;
  }

  static homeLeadboarder(matchesFilter: Match[][]): LeaderboardI[] {
    const homeStats: LeaderboardI[] = [];
    matchesFilter.forEach((matches) => {
      homeStats.push(this.makeObject(matches));
    });
    return homeStats;
  }

  static makeObject(matches: Match[]): LeaderboardI {
    const result = this.makeEmptyObject();
    matches.forEach((match) => {
      result.name = match.teamHome!.dataValues.teamName;
      // console.log('alooooooo', match.teamHome!.dataValues.teamName);
      result.totalPoints += this.totalPoint(match); // nome da função que criarei
      result.totalGames += +1;
      result.totalVictories += this.countVictories(match);
      result.totalDraws += this.countDraws(match);
      result.totalLosses += this.countLosses(match);
      result.goalsFavor += match.homeTeamGoals;
      result.goalsOwn += match.awayTeamGoals;
      result.goalsBalance += (match.homeTeamGoals - match.awayTeamGoals);
      result.efficiency = +((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2);
    });
    return result;
    // P/(J*3)*100, onde: P: Total de Pontos; J: Total de Jogos.
  }

  static makeEmptyObject() {
    const zerado = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    return zerado;
  }

  static totalPoint(match: Match) {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return 3;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  static countVictories(match: Match) {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  static countDraws(match: Match) {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  static countLosses(match: Match) {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  // 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.
  static sortStats(finalStats: LeaderboardI[]) {
    finalStats.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) { return b.totalPoints - a.totalPoints; }
      if (b.totalVictories !== a.totalVictories) { return b.totalVictories - a.totalVictories; }
      if (b.goalsBalance !== a.goalsBalance) { return b.goalsBalance - a.goalsBalance; }
      if (b.goalsFavor !== a.goalsFavor) { return b.goalsFavor - a.goalsFavor; }
      if (b.goalsOwn !== a.goalsOwn) { return b.goalsOwn - a.goalsOwn; }
      return 0;
    });
    return finalStats;
  }

  // REQ 31
  static async away() {
    const matches = await MatchesServices.matches();
    const filtrar2 = this.matchesFinished(matches);
    const matchesFilter = this.matchesAway(filtrar2);
    const finalStats = this.awayLeadboarder(matchesFilter);
    const finalStatsSort = this.sortStats(finalStats);
    return finalStatsSort;
  }

  static matchesAway(matches: Match[]) {
    const matchesFilter = [];
    for (let index = 1; index < 17; index += 1) {
      matchesFilter[index] = matches.filter((match) => match.awayTeam === index);
    }
    return matchesFilter;
  }

  static awayLeadboarder(matchesFilter: Match[][]): LeaderboardI[] {
    const awayStats: LeaderboardI[] = [];
    matchesFilter.forEach((matches) => {
      awayStats.push(this.makeObject2(matches));
    });
    return awayStats;
  }

  static makeObject2(matches: Match[]): LeaderboardI {
    const result = this.makeEmptyObject();
    matches.forEach((match) => {
      result.name = match.teamAway!.dataValues.teamName;
      // console.log('alooooooo', match.teamHome!.dataValues.teamName);
      result.totalPoints += this.totalPoint2(match); // nome da função que criarei
      result.totalGames += +1;
      result.totalVictories += this.countVictories2(match);
      result.totalDraws += this.countDraws2(match);
      result.totalLosses += this.countLosses2(match);
      result.goalsFavor += match.awayTeamGoals;
      result.goalsOwn += match.homeTeamGoals;
      result.goalsBalance += (match.awayTeamGoals - match.homeTeamGoals);
      result.efficiency = +((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2);
    });
    return result;
    // P/(J*3)*100, onde: P: Total de Pontos; J: Total de Jogos.
  }

  static totalPoint2(match: Match) {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      return 3;
    }
    if (match.awayTeamGoals === match.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static countVictories2(match: Match) {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static countDraws2(match: Match) {
    if (match.awayTeamGoals === match.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static countLosses2(match: Match) {
    if (match.awayTeamGoals < match.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  // REQ 33
  static async geral() {
    const finalStatsHome = await this.home();
    const finalStatsAway = await this.away();
    finalStatsHome.sort((a: LeaderboardI, b: LeaderboardI) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    finalStatsAway.sort((a: LeaderboardI, b: LeaderboardI) => {
      if (a.name > b.name) return 2;
      if (a.name < b.name) return -2;
      return 0;
    });
    // console.log('ALOOOOOOO', finalStatsHome, finalStatsAway);
    const finallySoma = this.soma(finalStatsHome, finalStatsAway);
    return this.sortStats(finallySoma);
  }

  static soma(finalStatsHome: LeaderboardI[], finalStatsAway: LeaderboardI[]) {
    const finalSome: LeaderboardI[] = [];
    finalStatsHome.forEach((finalStatsHome2, index) => {
      const empty = this.makeEmptyObject();
      empty.name = finalStatsHome2.name;
      empty.totalPoints = finalStatsHome2.totalPoints + finalStatsAway[index].totalPoints;
      empty.totalGames = finalStatsHome2.totalGames + finalStatsAway[index].totalGames;
      empty.totalVictories = finalStatsHome2.totalVictories + finalStatsAway[index].totalVictories;
      empty.totalDraws = finalStatsHome2.totalDraws + finalStatsAway[index].totalDraws;
      empty.totalLosses = finalStatsHome2.totalLosses + finalStatsAway[index].totalLosses;
      empty.goalsFavor = finalStatsHome2.goalsFavor + finalStatsAway[index].goalsFavor;
      empty.goalsOwn = finalStatsHome2.goalsOwn + finalStatsAway[index].goalsOwn;
      empty.goalsBalance = finalStatsHome2.goalsBalance + finalStatsAway[index].goalsBalance;
      empty.efficiency = +((empty.totalPoints / (empty.totalGames * 3)) * 100).toFixed(2);
      finalSome.push(empty);
    });
    return finalSome;
  }
}
