export class SimpleDate {
  year: number;
  month: number;
  day: number;

  constructor() {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth()+1;
    this.day = today.getDate();
  }

  formatDate():string{
    return `${this.year}${this.month.toString().padStart(2, '0')}${this.day.toString().padStart(2, '0')}`;
  }
  formatWithoutDate():string{
    return `${this.year}${this.month.toString().padStart(2, '0')}`;
  }
}