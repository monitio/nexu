// MyToolset.ts
export class MyToolset {
  constructor(private name: string) {}

  public hw(): string {
    return `Hello, ${this.name}!`;
  }

  public static info(): string {
    return 'This is MyToolset, a public utility class.';
  }
}
