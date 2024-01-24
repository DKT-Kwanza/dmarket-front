import {Router, Route, Routes, useLocation} from "react-router-dom";

import './App.css';
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
import Mywish from "./user/pages/MyPage/MyActivity/WishList/Mywish";
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
import Qna from "./user/pages/MyPage/MyActivity/Qna/Qna";
import HistoryMileage from "./user/pages/MyPage/Mileage/HistoryMileage";

import Product from "./admin/pages/product/Product";
import AdminList from "./admin/pages/adminlist/AdminList";

function App() {
    const location = useLocation();
    const hideHeaderFooter = (location.pathname === '/member/signin/form' || location.pathname.startsWith('/admin'));

  return (
    <div className="App">
        {!hideHeaderFooter && <Header />}
          <Routes>

            <Route path='/member'>
              <Route path='login' element={<Login />} />
              <Route path='signin' element={<SignIn/>}/>
              <Route path='signin/form' element={<SignInForm/>} />
            </Route>

            <Route path='/'>
              <Route path='' element={<Main/>} />
              <Route path='category' element={<ProductList/>}/>
              <Route path='search' element={<SearchList/>}/>
            </Route>

            <Route path='/product'>
              <Route path='productDetail/:productId' element={<Detail/>}/>
              <Route path='detail' element={<Detail/>}/>
            </Route>
            
            <Route path='/order'>
              <Route path='orderPage' element={<Payment/>}/>
              <Route path='complete' element={<OrderComplete/>} />
            </Route>

            <Route path='/mydkt'>
              <Route path='orderMng'>
                <Route path='orderInfo' element={<OrderHistory/>}/>
                <Route path='orderInfoDetail' element={<OrderHistoryDetail/>} />
              </Route>

              <Route path='activityMng'>
                <Route path='mycart' element={<Cart />} />
                <Route path='mywish' element={<Mywish/>} />
                <Route path='review' element={<ReviewList/>} />
                <Route path='review/write' element={<WriteReview/>} />
                <Route path='qna' element={<Qna />} />
                <Route path='inquiry' element={<Inquiry />} />
              </Route>
            
              <Route path='memberMng'>
                <Route path='changeInfo' element={<ChangeInfo/>} />
                <Route path='changePwd' element={<ChangePwd/>} />
              </Route>

              <Route path='mileageMng'>
              <Route path='charge' element={<ChargeMileage/>} />
              <Route path='mileageInfo' element={<HistoryMileage/>} />
              </Route>
            </Route>


            <Route path='/customer'>
              <Route path='' element={<CustomerCenterNotice/>} />
              <Route path='faq/:tab' element={<CustomerCenterFAQ/>}/> 
              <Route path='inquiry/write' element={<CustomerCenterInquiry/>}/>
            </Route>

            <Route path='/admin/product'>
                <Route path='product' element={<Product />} />
            </Route>
            <Route path='/admin/admin'>
                <Route path='adminlist' element={<AdminList />} />
            </Route>

          </Routes>
        {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
