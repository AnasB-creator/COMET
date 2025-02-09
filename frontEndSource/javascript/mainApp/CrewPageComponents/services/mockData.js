export const mockCrewMember = {
  id: 'CM001',
  name: 'Sarah Chen',
  role: 'Flight Engineer',
  status: 'active',
  avatar: null,
  healthMetrics: {
    heartRate: { value: 72, unit: 'bpm', status: 'normal' },
    sleepDuration: { value: 7.5, unit: 'hours', status: 'normal' },
    respirationRate: { value: 16, unit: 'rpm', status: 'normal' },
    bloodOxygen: { value: 98, unit: '%', status: 'normal' },
    boneDensity: { value: 95, unit: '%', status: 'normal' },
    radiation: { value: 0.12, unit: 'mSv', status: 'normal' },
    exerciseLevel: { value: 85, unit: '%', status: 'normal' },
    outsideTime: { value: 2.5, unit: 'hrs', status: 'normal' },
    weight: { value: 68, unit: 'kg', status: 'normal' },
    height: { value: 170, unit: 'cm', status: 'normal' }
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

export default mockCrewMember; 