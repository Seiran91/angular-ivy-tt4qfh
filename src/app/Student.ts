// Interface provides type-checking of Student ONLY not creating of this!

export interface Student {
    id: string | number;
    Name: string;
    Email: string;
    Title: string;
  }

  export class RegStudent {

    constructor(
      public Name: string,
      public Email: string,
      public Title: string
    ) {  }
  
  }