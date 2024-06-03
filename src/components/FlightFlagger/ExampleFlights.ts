const ExampleFlights = [
  {
    highlights: [
      '5 Afghanistan (AFG) pax',
      '2 pax aged 10 to 24',
      '5 transit pax',
      '10 visa nationals',
    ],
    flight: 'EZY34620',
    origin: 'GVA',
    country: 'Switzerland',
    gate: null,
    status: 'On chocks',
    scheduled: '11:30',
    expected: '11:24',
    expPcp: '11:37 - 11:43',
    expPcpPax: {
      count: 115
    },
    paxCounts: {
      eGate: 112,
      eea: 109,
      nonEea: 6
    }
  },
  {
    flight: 'FR8575',
    origin: 'ACE',
    country: 'Spain',
    gate: '5',
    status: 'On chocks',
    scheduled: '11:25',
    expected: '11:37',
    expPcp: '11:50 - 11:59',
    expPcpPax: {
      count: 115
    },
    paxCounts: {
      eGate: 112,
      eea: 109,
      nonEea: 6
    }
  },
  {
    flight: 'FR0056',
    origin: 'ACE',
    country: 'Spain',
    gate: '5',
    status: 'On chocks',
    scheduled: '11:50',
    expected: '11:46',
    expPcp: '11:59 - 12:08',
    expPcpPax: {
      confidence: 'historic',
      count: 115
    },
    paxCounts: {
      confidence: 'trusted',
      eGate: 112,
      eea: 109,
      nonEea: 6
    }
  },
  {
    flight: 'FR0056',
    origin: 'ACE',
    country: 'Spain',
    gate: '5',
    status: 'On chocks',
    scheduled: '11:50',
    expected: '11:46',
    expPcp: '11:59 - 12:08',
    expPcpPax: {
      confidence: 'live',
      count: 115
    },
    paxCounts: {
      confidence: 'trusted',
      eGate: 112,
      eea: 109,
      nonEea: 6
    }
  },
  {
    flight: 'FR13192',
    origin: 'DUB',
    country: 'Ireland',
    gate: '5',
    status: 'Landed',
    scheduled: '12:40',
    expected: '12:31',
    expPcp: '12:44 - 12:54',
    expPcpPax: {
      confidence: 'averages',
      count: 115
    },
    paxCounts: {
      confidence: 'averages',
      eGate: 112,
      eea: 109,
      nonEea: 6
    }
  }
]

export default ExampleFlights