export const mockCrewMembers = [
  {
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
        subtitle: 'Regular Checkup - Week 12',
        content: {
          sections: [
            {
              title: 'Vital Signs Summary',
              content: 'All vital signs remain within normal parameters. Heart rate averaging 72 BPM at rest, blood pressure 118/75 mmHg, body temperature 36.7°C. Oxygen saturation maintains at 98% under standard cabin pressure.'
            },
            {
              title: 'Sleep Pattern Analysis',
              content: 'Sleep patterns show minor irregularity. Average sleep duration: 6.8 hours (recommended: 7-8 hours). REM sleep cycles slightly shortened. Recommended monitoring of sleep cycle over next 48 hours.'
            },
            {
              title: 'Recommendations',
              content: 'Implement pre-sleep relaxation protocol. Adjust cabin lighting cycle to better align with circadian rhythm. Schedule follow-up sleep assessment in 72 hours.'
            }
          ]
        },
        riskLevel: 'low'
      },
      {
        id: 'R002',
        date: '2024-03-12',
        title: 'Radiation Exposure Alert',
        subtitle: 'Environmental Monitoring Report',
        content: {
          sections: [
            {
              title: 'Exposure Analysis',
              content: 'Elevated radiation levels detected during EVA activity at coordinates 45°N, 120°W. Cumulative exposure: 0.45 mSv (within acceptable range but elevated from baseline).'
            },
            {
              title: 'Medical Impact Assessment',
              content: 'No immediate health concerns detected. Blood cell count normal. DNA repair mechanisms functioning as expected. Continued monitoring recommended.'
            },
            {
              title: 'Safety Protocols',
              content: 'Implement additional shielding protocols for future EVAs. Crew member should limit external exposure for next 72 hours. Personal radiation badge sensitivity increased.'
            },
            {
              title: 'Follow-up Requirements',
              content: 'Schedule detailed radiation exposure assessment in 24 hours. Update personal shielding equipment. Review EVA route planning to minimize exposure zones.'
            }
          ]
        },
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
  },
  {
    id: 'CM002',
    name: 'Marcus Rodriguez',
    role: 'Medical Officer',
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
        subtitle: 'Regular Checkup - Week 12',
        content: {
          sections: [
            {
              title: 'Vital Signs Summary',
              content: 'All vital signs remain within normal parameters. Heart rate averaging 72 BPM at rest, blood pressure 118/75 mmHg, body temperature 36.7°C. Oxygen saturation maintains at 98% under standard cabin pressure.'
            },
            {
              title: 'Sleep Pattern Analysis',
              content: 'Sleep patterns show minor irregularity. Average sleep duration: 6.8 hours (recommended: 7-8 hours). REM sleep cycles slightly shortened. Recommended monitoring of sleep cycle over next 48 hours.'
            },
            {
              title: 'Recommendations',
              content: 'Implement pre-sleep relaxation protocol. Adjust cabin lighting cycle to better align with circadian rhythm. Schedule follow-up sleep assessment in 72 hours.'
            }
          ]
        },
        riskLevel: 'low'
      },
      {
        id: 'R002',
        date: '2024-03-12',
        title: 'Radiation Exposure Alert',
        subtitle: 'Environmental Monitoring Report',
        content: {
          sections: [
            {
              title: 'Exposure Analysis',
              content: 'Elevated radiation levels detected during EVA activity at coordinates 45°N, 120°W. Cumulative exposure: 0.45 mSv (within acceptable range but elevated from baseline).'
            },
            {
              title: 'Medical Impact Assessment',
              content: 'No immediate health concerns detected. Blood cell count normal. DNA repair mechanisms functioning as expected. Continued monitoring recommended.'
            },
            {
              title: 'Safety Protocols',
              content: 'Implement additional shielding protocols for future EVAs. Crew member should limit external exposure for next 72 hours. Personal radiation badge sensitivity increased.'
            },
            {
              title: 'Follow-up Requirements',
              content: 'Schedule detailed radiation exposure assessment in 24 hours. Update personal shielding equipment. Review EVA route planning to minimize exposure zones.'
            }
          ]
        },
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
  },
  // Add 1-2 more crew members if needed
];

export const getMockCrewMemberById = (id) => {
  return Promise.resolve(
    mockCrewMembers.find(member => member.id === id) || null
  );
};

export const getAllCrewMembers = () => {
  return Promise.resolve(mockCrewMembers);
}; 