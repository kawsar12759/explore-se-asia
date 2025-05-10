import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"


function App() {
  

  return (
    <div style={{minWidth:'350px'}}>
      <Navbar></Navbar>    
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default App
