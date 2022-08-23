declare namespace Express {
    export interface Request {
        //@ts-ignore
        user: any;
    }
    export interface Response {
        user: any;
    }
  }