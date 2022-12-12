class Player {
  id: string;
  name: string;
  ready: boolean;
  points: number;

  constructor(id: string, name: string, ready: boolean, points: number) {
    this.id = id;
    this.name = name;
    this.ready = ready;
    this.points = points;
  }
}

export default Player;
