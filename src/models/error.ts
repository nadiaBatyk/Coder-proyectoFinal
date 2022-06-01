export default class ErrorCustom extends Error {
  status: number;
  
  constructor(message :string, status:number, name:string) {
    super(message);
    this.status = status;
    this.name=name;
  }
}
