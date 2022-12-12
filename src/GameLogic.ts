import Player from "./entities/Player"

class GameLogic{
    playerId: string
    players: Array<Player> = []

    constructor(playerId: string){
        this.playerId = playerId
    }

    updatePlayers(players: Array<Player>) {
        this.players = players
    }
}

export default GameLogic