import { createContext, useState }  from 'react';
import Layout from "./components/layout/Layout";

export const ThemeContext = createContext({});

const App = ({ url }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  const value = {
    darkTheme, 
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <Layout url={url} />
    </ThemeContext.Provider>
  );
};

export default App;


// any child component of App.js 
// will have access to our theme through our useContext Hook
