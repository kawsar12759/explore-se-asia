import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"


function App() {
  

  return (
    <div style={{minWidth:'350px'}} className="bg-white">
      <Navbar></Navbar>    
      <main className="min-h-screen">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default App
