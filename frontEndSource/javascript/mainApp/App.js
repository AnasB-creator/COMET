import React, { useState } from 'react';
// import { Provider } from "../components/ui/provider";
import { Provider } from "../components/ui/provider"
import Home from "./Home.js";
import CrewMemberPage from './CrewPageComponents/CrewMemberPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@chakra-ui/react';
import FleetDrawer from './FleetComponents/FleetDrawer';
// Extend the theme to include global styles

// const theme = extendTheme({
//     styles: {
//       global: {
//         "html, body": {
//           backgroundColor: "#FAFAFA", // Set the background color             // Optionally set text color
//         },
//       },
//     },
//   });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 5 * 60 * 1000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 3,
    },
  },
});

const App = () => {
  // Initialize with null instead of 'F001' to prevent premature data fetching
  const [selectedFleetId, setSelectedFleetId] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Box minH="100vh" bg="gray.900">
          <FleetDrawer onFleetChange={setSelectedFleetId} />
          {selectedFleetId && <CrewMemberPage selectedFleetId={selectedFleetId} />}
        </Box>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;