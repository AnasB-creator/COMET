import React from 'react';
// import { Provider } from "../components/ui/provider";
import { Provider } from "../components/ui/provider"
import Home from "./Home.js";
import CrewMemberPage from './CrewPageComponents/CrewMemberPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <CrewMemberPage crewMemberId="CM001" />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;