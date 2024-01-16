import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import MyPageSubHeader from './components/MyPage/SubHeader/MyPageSubHeader';
import MyPageSidebar from './components/MyPage/Sidebar/MyPageSidebar';
import Inquiry from './pages/MyPage/MyActivity/Inquiry';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='MyPageSidebar' element={<MyPageSidebar />} />
          <Route path='MyPageSubHeader' element={<MyPageSubHeader />} />
          <Route path='Inquiry' element={<Inquiry />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
