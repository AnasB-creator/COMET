const mockCrewMember = {
  id: 'CM001',
  name: 'Sarah Chen',
  role: 'Flight Engineer',
  status: 'active',
  avatar: null,
  metrics: {
    heartRate: 72,
    sleepDuration: 7.5,
    respirationRate: 16,
    bloodOxygen: 98,
    boneDensity: 95,
    radiation: 0.12,
    exerciseLevel: 85,
    outsideTime: 2.5,
    weight: 68,
    height: 170
  },
  problems: [
    {
      id: 'P001',
      date: '2024-03-15',
      description: 'Slight sleep pattern disruption',
      severity: 'low',
      status: 'active'
    },
    {
      id: 'P002',
      date: '2024-03-10',
      description: 'Minor muscle strain from exercise',
      severity: 'low',
      status: 'resolved'
    }
  ],
  reports: [
    {
      id: 'R001',
      date: '2024-03-14',
      title: 'Weekly Health Assessment',
      subtitle: 'Regular Checkup',
      content: 'All vital signs within normal parameters. Sleep patterns show slight irregularity.',
      riskLevel: 'low'
    },
    {
      id: 'R002',
      date: '2024-03-07',
      title: 'Monthly Physical Evaluation',
      subtitle: 'Comprehensive Review',
      content: 'Physical condition maintains optimal levels. Exercise routine effectiveness confirmed.',
      riskLevel: 'low'
    }
  ]
};

export const getMockCrewMember = () => {
  return Promise.resolve(mockCrewMember);
};

export default {
  getMockCrewMember
}; 