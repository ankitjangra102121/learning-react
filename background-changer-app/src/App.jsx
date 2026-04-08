import { useState } from 'react'
import './App.css'
import BackgroundChanger from './components/color-bar'

function App() {
const [color, setColor] = useState('lavender')
  return (
    <>
    <BackgroundChanger color={color} setColor={setColor}/>
    </>
  )
}

export default App
