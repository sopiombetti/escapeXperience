import './App.css'
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  

  return (
    <div className='App'>
      <Header/>
      <main style={{flexGrow: 1}} className='bg-gray-very-light'>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default App
