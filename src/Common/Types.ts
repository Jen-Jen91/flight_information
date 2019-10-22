export enum ArrDepType {
  ARRIVAL = "A",
  DEPARTURE = "D"
}

export interface FlightDataType {
  FlightNo: string;
  Date: string;
  Time: string;
  ArrDep: ArrDepType;
  PortOfCallA: string;
  Status: string;
  OtherInfo: string;
  Additional: string;
  Airline: string;
  Image: string;
  ArrHall: string;
  dateTime: string;
  airlineCode: string;
  CodeShare: number;
  ParentFlight: string;
  Gate: string;
  Active: number;
}
