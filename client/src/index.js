import ReactDOM from 'react-dom/client'; // Fixed import name
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Fixed variable name
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);