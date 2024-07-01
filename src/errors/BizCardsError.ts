class BizCardsError {
  status: number;
  message: string;
  date: Date = new Date();


  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
    this.date = new Date();
  }


  static gen(status: number, message: string) {
    return new BizCardsError(status, message);
  }
}

export default BizCardsError;

