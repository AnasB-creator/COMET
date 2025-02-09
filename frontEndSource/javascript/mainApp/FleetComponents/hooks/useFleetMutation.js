import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFleet } from '../../customApiCalls/apiCalls';

export const useFleetMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createFleet,
    onSuccess: () => {
      queryClient.invalidateQueries(['fleets']);
    },
  });
}; 