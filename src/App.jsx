import "./assets/scss/themes.scss";
import Route from "./Routes/Index";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query-devtools'
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Route />
    
    </QueryClientProvider>
  );
};

export default App;
