export type Recipe = {
    id: string;
    fields: {
      Name: string;
      Notes: string;
      Tags: string[];
      Season: string[];
      "Cover Image": [{
        url: string;
        width: number;
        height: number;
      }];
      "Total time": string;
      Link: string;
    };
  };
  