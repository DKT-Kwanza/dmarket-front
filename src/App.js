import {Route, Routes} from "react-router-dom";

import './App.css';
import OrderHistory from './user/pages/MyPage/MyOrder/OrderHistory';
import OrderHistoryDetail from "./user/pages/MyPage/MyOrder/OrderHistoryDetail";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/orderhistory' element={<OrderHistory/>}/>
          <Route path='/orderhistorydetail' element={<OrderHistoryDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
