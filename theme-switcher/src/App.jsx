import { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/theme";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";
function App() {
  const [themeMode, setThemeMode] = useState('Light')

  const lightMode = () => {
    setThemeMode('Light')
  }

  const darkMode = () => {
    setThemeMode('Dark')
  }

  useEffect(() => {
    document.querySelector('html').classList.remove(themeMode === 'Light' ? 'dark' : 'light');
    document.querySelector('html').classList.add(themeMode === 'Light' ? 'light' : 'dark');
  }, [themeMode])

  return (
    <ThemeProvider value={{themeMode, lightMode, darkMode}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
