export class Move {
  constructor(
    public toId: string,
    public to: string,
    public at: number = Date.now(),
    public amount: number
  ) {}
}
