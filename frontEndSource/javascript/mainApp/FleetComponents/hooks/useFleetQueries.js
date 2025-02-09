import { useQuery } from '@tanstack/react-query';
import { getFleets } from '../../customApiCalls/apiCalls';

export const fleetKeys = {
  all: ['fleets'],
};

export const useFleets = () => {
  return useQuery({
    queryKey: fleetKeys.all,
    queryFn: getFleets,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}; 