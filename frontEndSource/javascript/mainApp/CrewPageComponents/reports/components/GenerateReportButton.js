import React from 'react';
import { Button } from '@chakra-ui/react';
import { useHealthReportMutation } from '../../hooks/useHealthReportMutation';
import { reportTemplates } from '../data/reportTemplates';
import { IoAddCircleOutline } from 'react-icons/io5';

export function GenerateReportButton({ crewMemberId, className }) {
  const { mutate: createReport, isLoading } = useHealthReportMutation();

  const handleGenerateReport = () => {
    // Get random template
    const randomTemplate = 
      reportTemplates.templates[
        Math.floor(Math.random() * reportTemplates.templates.length)
      ];

    // Format data according to API specifications
    const reportData = {
      crew_member: crewMemberId,
      date: new Date().toISOString().split('T')[0],
      title: randomTemplate.title,
      subtitle: randomTemplate.subtitle,
      content: {
        sections: randomTemplate.content.sections.map(section => ({
          title: section.title,
          content: section.content
        }))
      },
      risk_level: randomTemplate.risk_level // Changed from riskLevel to risk_level
    };

    console.log('Sending report data:', reportData); // Add this for debugging
    createReport(reportData);
  };

  return (
    <Button
      variant="glass"
      size="md"
      onClick={handleGenerateReport}
      disabled={isLoading}
      className={className}
      width={{ base: "100%", sm: "auto" }}
    >
      <IoAddCircleOutline className="mr-2" />
      Generate Report
    </Button>
  );
} 