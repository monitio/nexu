// MyToolset.ts
export class MyToolset {
    constructor(name) {
        this.name = name;
    }
    hw() {
        return `Hello, ${this.name}!`;
    }
    static info() {
        return 'This is MyToolset, a public utility class.';
    }
}
