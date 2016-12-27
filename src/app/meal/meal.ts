export class Meal {
  id: String;
  name: String;
  description: String;
  green: number = 0;
  purple: number = 0;
  red: number = 0;
  yellow: number = 0;
  blue: number = 0;
  orange: number = 0;
  teaspoon: number = 0;
  tags: String[] = [];

  constructor() {
    this.id = null;
    this.name = null;
    this.description = null;
  }
}