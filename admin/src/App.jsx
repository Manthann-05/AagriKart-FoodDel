import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, Navigate } from "react-router-dom"; // <-- add Navigate
import Add from './pages/Add/Add';
import Orders from './pages/Orders/Orders';
import List from './pages/List/List';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const url = "http://localhost:3000";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <ToastContainer theme="dark" />
      <Navbar />
      <hr />
      <div className="app-content flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/orders" replace />} />
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App;
