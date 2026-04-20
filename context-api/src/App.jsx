import UserContextProvider from "./context/UserContextProvider"
import Login from "./components/Login"
import Profile from "./components/Profile"

function App() {

  return (
    <UserContextProvider>
      <h1 className="text-center p-4 bg-green-600 text-2xl">Context API</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
 