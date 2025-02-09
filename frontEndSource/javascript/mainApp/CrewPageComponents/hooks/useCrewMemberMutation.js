import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCrewMember } from '../../customApiCalls/apiCalls';

export const useCrewMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCrewMember,
    onSuccess: (newCrewMember) => {
      // Update the crew members cache
      queryClient.setQueryData(['crewMembers'], (oldData) => {
        return oldData ? [...oldData, newCrewMember] : [newCrewMember];
      });
      
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['crewMembers'] });
    },
  });
}; 