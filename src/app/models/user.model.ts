export class User {
  constructor(
    public _id?: string,
    public name: string = '',
    public coins: number = 100,
    public moves: any[] = []
  ) {}

  setId() {
    this._id = makeId();
  }
}

function makeId(): string {
  var possibleChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSWZ0123456789';
  var str = '';
  for (var i = 0; i < 25; i++) {
    var int = randomInt(0, possibleChars.length);
    str += possibleChars.charAt(int);
  }
  return str;
}

function randomInt(min, max): number {
  return Math.floor(Math.random() * (max - min) + min);
}
