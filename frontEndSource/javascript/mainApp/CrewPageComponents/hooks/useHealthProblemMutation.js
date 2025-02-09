import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHealthProblem } from '../../customApiCalls/apiCalls';

export const useHealthProblemMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createHealthProblem,
    onSuccess: () => {
      queryClient.invalidateQueries(['crewMembers']);
    },
  });
}; 