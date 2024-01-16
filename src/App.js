import {Route, Routes} from "react-router-dom";

import './App.css';
import MyPageSubHeader from './user/components/MyPage/SubHeader/MyPageSubHeader';
import MyPageSidebar from './user/components/MyPage/Sidebar/MyPageSidebar';

import Header from './user/components/Header/Header'
import Footer from './user/components/Footer/Footer'
import Login from './user/pages/Login/Login'
import SignIn from './user/pages/SignIn/SignIn';
import SignInForm from "./user/pages/SignIn/SignInForm";
import ChangeInfo from "./user/pages/MyPage/MyInfo/ChangeInfo";
import ChargeMileage from "./user/pages/MyPage/Mileage/ChargeMileage";
import Main from "./user/pages/Main/Main";
import ReviewList from "./user/pages/MyPage/MyActivity/Review/ReviewList";
import Detail from "./user/pages/Detail/Detail";
import WishList from "./user/pages/MyPage/MyActivity/WishList/WishList";
import Cart from "./user/pages/MyPage/MyActivity/Cart/Cart";
import ProductList from "./user/pages/ProductList/ProductList";
import SearchList from "./user/pages/ProductList/SearchList";
import Payment from "./user/pages/Order/Payment";
import OrderComplete from './user/pages/Order/OrderComplete';
import ChangePwd from './user/pages/MyPage/MyInfo/ChangePwd';
import CustomerCenterNotice from "./user/pages/CustomerCenter/CustomerCenterNotice";
import CustomerCenterFAQ from "./user/pages/CustomerCenter/CustomerCenterFAQ";
import CustomerCenterInquiry from "./user/pages/CustomerCenter/CustomerCenterInquiry";
import WriteReview from "./user/pages/MyPage/MyActivity/Review/WriteReview";
import OrderHistory from './user/pages/MyPage/MyOrder/OrderHistory';
import OrderHistoryDetail from "./user/pages/MyPage/MyOrder/OrderHistoryDetail";
import Inquiry from "./user/pages/MyPage/MyActivity/CustomerInquiry/Inquiry";

function App() {
  return (
    <div className="App">
        <Header />
          <Routes>
              <Route path='/login' element={<Login/>} />
              <Route path='/signin' element={<SignIn/>}/>
              <Route path='/signin/form' element={<SignInForm/>} />
              <Route path='/mypage/changeinfo' element={<ChangeInfo/>} />
              <Route path='/mypage/chargemileage' element={<ChargeMileage/>} />
              <Route path='/main' element={<Main/>} />
              <Route path='/mypage/reviewlist' element={<ReviewList/>} />
              <Route path='/main/detail' element={<Detail/>} />
              <Route path='/mypage/wishlist' element={<WishList/>} />
              <Route path='/mypage/cart' element={<Cart />} />
              <Route path='/main/productlist' element={<ProductList/>}/>
              <Route path='/main/searchlist' element={<SearchList/>}/>
              <Route path='/order' element={<Payment/>}/>
              <Route path='/order/complete' element={<OrderComplete/>} />
              <Route path='/mypage/changepwd' element={<ChangePwd/>} />
              <Route path='/customercenter' element={<CustomerCenterNotice/>} />
              <Route path='/customercenter/faq/:tab' element={<CustomerCenterFAQ/>}/> 
              <Route path='/customercenter/inquiry' element={<CustomerCenterInquiry/>}/>
              <Route path='/mypage/writereview' element={<WriteReview/>} />
              <Route path='/mypage/orderhistory' element={<OrderHistory/>}/>
              <Route path='/mypage/orderhistory/detail' element={<OrderHistoryDetail/>}/>
              <Route path='/mypage/inquiry' element={<Inquiry />} />




              <Route path='MyPageSidebar' element={<MyPageSidebar />} />
              <Route path='MyPageSubHeader' element={<MyPageSubHeader />} />

          </Routes>
        <Footer />
    </div>
  );
}

export default App;
