
import Application from './app/index';

import { ThemeProvider } from '@material-tailwind/react';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

const queryClient = new QueryClient();


function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider >
          <Application />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
