export default interface Match {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?:{ dataValues: { teamName: string } },
  teamAway?:{ dataValues: { teamName: string } },
}
