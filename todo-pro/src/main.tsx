import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const theme = extendTheme({});

ReactDOM.createRoot (document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
        <Router>
            <App />
        </Router>
    </ChakraProvider>
);