import React from 'react';
// import { Provider } from "../components/ui/provider";
import { Provider } from "../components/ui/provider"
import Home from "./Home.js";
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

const App = () => {
  return (
    <Provider >
      <Home />
    </Provider>
  );

};

export default App;