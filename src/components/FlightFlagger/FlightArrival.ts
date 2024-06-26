export type FlightArrival = { 
  highlights?: string[],
  flight: string,
  origin: string,
  country: string,
  gate: string | null,
  status: string | null,
  scheduled: string | null,
  expected: string | null,
  expPcp: string | null,
  expPcpPax: {
    confidence?: string
    count?: number | null
  },
  paxCounts: {
    confidence?: string
    eGate?: number | null,
    eea?: number | null,
    nonEea?: number | null,
  }
}
