export class FailedToFetchData extends Error {
  constructor(data:object,url:string) {
    super('Failed to fetch data from ' + url);
    this.name = 'FailedToFetchData';
    console.dir(data);
  }
}