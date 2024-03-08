
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Layout>
        <p>Home page</p>
      </Layout>}></Route>
      <Route path="/search" element={<Layout>
        <p>Search page</p> 
      </Layout>}></Route>
      <Route path="/register" element={<Layout>
        <Register />
      </Layout>}></Route>
      <Route path="/sign-in" element={<Layout>
        <SignIn />
      </Layout>}></Route>
    </Routes>
  )
}

export default App
