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
      content: 'All vital signs within normal parameters. Sleep patterns show slight irregularity. Recommended monitoring of sleep cycle over next 48 hours. No immediate concerns identified.',
      riskLevel: 'low'
    },
    {
      id: 'R002',
      date: '2024-03-12',
      title: 'Radiation Exposure Alert',
      subtitle: 'Environmental Monitoring',
      content: 'Elevated radiation levels detected during last EVA activity. While within acceptable limits, crew member should limit external exposure for next 72 hours. Additional shielding protocols recommended.',
      riskLevel: 'medium'
    },
    {
      id: 'R003',
      date: '2024-03-07',
      title: 'Monthly Physical Evaluation',
      subtitle: 'Comprehensive Review',
      content: 'Physical condition maintains optimal levels. Exercise routine effectiveness confirmed. Bone density readings stable. Cardiovascular performance exceeds baseline requirements.',
      riskLevel: 'low'
    },
    {
      id: 'R004',
      date: '2024-03-01',
      title: 'Emergency Medical Report',
      subtitle: 'Incident Assessment',
      content: 'Crew member experienced sudden dizziness during maintenance procedure. Immediate medical attention provided. Vital signs stabilized. Full neurological scan recommended. Temporary suspension from EVA duties.',
      riskLevel: 'high'
    },
    {
      id: 'R005',
      date: '2024-02-28',
      title: 'Psychological Evaluation',
      subtitle: 'Quarterly Assessment',
      content: 'Standard psychological evaluation completed. Stress levels slightly elevated but within expected range for mission duration. Sleep quality reported as satisfactory. Social engagement remains positive.',
      riskLevel: 'low'
    }
  ]
};

export const getMockCrewMember = () => {
  return Promise.resolve(mockCrewMember);
};

export default mockCrewMember; 