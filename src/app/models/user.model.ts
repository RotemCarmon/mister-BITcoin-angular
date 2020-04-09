export class User {

    constructor(public _id?: string, public name: string = '', public coins: number = 0, public moves: any[] = []) {
    }

    setId?() {
        // Implement your own set Id
        // this._id = makeId()
    }
}