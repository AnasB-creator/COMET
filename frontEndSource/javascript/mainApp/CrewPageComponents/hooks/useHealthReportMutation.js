import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHealthReport } from '../../customApiCalls/apiCalls';

export function useHealthReportMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHealthReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['crewMembers'] });
    },
  });
} 