export interface Schedule {
  date: string;
  times: [
    {
      time: string;
      status: string;
    }
  ];
}
