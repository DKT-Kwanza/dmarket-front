import {Router, Route, Routes, useLocation} from "react-router-dom";

import './App.css';
import Header from "./components/user/Header/Header";
import Footer from "./components/user/Footer/Footer";
import Login from "./pages/user/Login/Login";
import SignIn from './pages/user/SignIn/SignIn';
import SignInForm from "./pages/user/SignIn/SignInForm";
import ChangeInfo from "./pages/user/MyInfo/ChangeInfo";
import ChargeMileage from "./pages/user/Mileage/ChargeMileage";
import Main from "./pages/user/Main/Main";
import ReviewList from "./pages/user/MyReview/ReviewList";
import Detail from "./pages/user/Product/DetailPage";
import Mywish from "./pages/user/WishList/Mywish";
import Cart from "./pages/user/Cart/CartPage";
import ProductList from "./pages/user/Product/ProductPage";
import SearchList from "./pages/user/Product/SearchPage";
import PaymentPage from "./pages/user/Payment/PaymentPage";
import OrderComplete from './pages/user/Payment/OrderComplete';
import ChangePwd from './pages/user/MyInfo/ChangePwd';
import CustomerCenterNotice from "./pages/user/Customer/CustomerNoticePage";
import CustomerCenterFAQ from "./pages/user/Customer/CustomerFaqPage";
import CustomerInquiryPage from "./pages/user/Customer/CustomerInquiryPage";
import WriteReviewPage from "./pages/user/MyReview/WriteReviewPage";
import OrderHistory from './pages/user/MyOrder/OrderHistory';
import OrderHistoryDetail from "./pages/user/MyOrder/OrderHistoryDetail";
import Inquiry from "./pages/user/CustomerInquiry/Inquiry";
import Qna from "./pages/user/Qna/Qna";
import HistoryMileage from "./pages/user/Mileage/HistoryMileage";

import Product from "./pages/admin/Product/ProductPage";
import ProductAddPage from "./pages/admin/Product/ProductAddPage";
import ProductEditPage from "./pages/admin/Product/ProductEditPage";
import ProductQnaPage from "./pages/admin/Product/ProductQnaPage";
import ProductQuantityPage from "./pages/admin/Product/ProductQuantityPage";
import AdminList from "./pages/admin/Member/AdminPage";
import ProductReviewPage from "./pages/admin/Product/ProductReviewPage";
import MemberList from "./pages/admin/Member/UserPage";
import UserRegisterPage from "./pages/admin/Member/UserRegisterPage";
import UserMileagePage from "./pages/admin/Member/UserMileagePage";
import OrderStatus from "./pages/admin/Order/OrderPage";
import OrderCancel from "./pages/admin/Order/OrderCancelPage";
import Refund from "./pages/admin/Order/OrderRefundPage";
import CustomerNotice from "./pages/admin/Customer/CustomerNoticePage";
import ReturnStatus from "./pages/admin/Order/OrderReturnPage";
import CustomerInquiry from "./pages/admin/Customer/CustomerInquiryPage";
import CustomerFAQ from "./pages/admin/Customer/CustomerFaqPage";

function App() {
    const location = useLocation();
    const noBodyStylePaths = ['/memberMng', '/productMng', '/orderMng', '/customerMng'];
    const applyBodyStyle = !noBodyStylePaths.some(path => location.pathname.startsWith(path));
    const hideHeaderFooter = (location.pathname.startsWith('/member') || location.pathname.startsWith('/memberMng') || location.pathname.startsWith('/productMng') || location.pathname.startsWith('/orderMng') || location.pathname.startsWith('/customerMng'));

  return (
    <div className="App">
        {!hideHeaderFooter && <Header />}
        <div className={applyBodyStyle ? "body" : ""}>
            <Routes>

              <Route path='/member'>
                <Route path='login' element={<Login />} />
                <Route path='signin' element={<SignIn/>}/>
                <Route path='signinForm' element={<SignInForm/>} />
              </Route>

              <Route path='/'>
                <Route path='' element={<Main/>} />
                <Route path='category' element={<ProductList/>}/>
                <Route path='search' element={<SearchList/>}/>
              </Route>

              <Route path='/product'>
                <Route path='detail/:productId' element={<Detail/>}/>
                <Route path='detail' element={<Detail/>}/>
              </Route>

              <Route path='/order'>
                <Route path='' element={<PaymentPage/>}/>
                <Route path='complete' element={<OrderComplete/>} />
              </Route>

              <Route path='/mydkt'>
                <Route path='orderInfo' element={<OrderHistory/>}/>
                <Route path='orderInfoDetail' element={<OrderHistoryDetail/>} />
                <Route path='mycart' element={<Cart />} />
                <Route path='mywish' element={<Mywish/>} />
                <Route path='review' element={<ReviewList/>} />
                <Route path='writeReview' element={<WriteReviewPage/>} />
                <Route path='qna' element={<Qna />} />
                <Route path='inquiry' element={<Inquiry />} />
                <Route path='changeInfo' element={<ChangeInfo/>} />
                <Route path='changePwd' element={<ChangePwd/>} />
                <Route path='charge' element={<ChargeMileage/>} />
                <Route path='mileageInfo' element={<HistoryMileage/>} />
              </Route>
              
              <Route path='/customer'>
                <Route path='' element={<CustomerCenterNotice/>} />
                <Route path='faq/:tab' element={<CustomerCenterFAQ/>}/>
                <Route path='writeInquiry' element={<CustomerInquiryPage/>}/>
              </Route>

              {/* 관리자 라우팅 */}
              <Route path='/memberMng'>
                    <Route path='manager' element={<Admin />}/>
                    <Route path='user' element={<MemberList/>}/>
                    <Route path='addUser' element={<UserRegisterPage/>}/>
                    <Route path='mileage' element={<UserMileagePage/>}/>
                </Route>

                <Route path='/productMng'>
                    <Route path='' element={<Product/>}/>
                    <Route path='add' element={<ProductAddPage/>}/>
                    <Route path='edit' element={<ProductEditPage/>}/>
                    <Route path='qna' element={<ProductQnaPage/>}/>
                    <Route path='quantity' element={<ProductQuantityPage/>}/>
                    <Route path='review' element={<ProductReviewPage/>}/>
                </Route>

                <Route path='/orderMng'>
                    <Route path='' element={<OrderStatus/>}/>
                    <Route path='cancel' element={<OrderCancel/>}/>
                    <Route path='return' element={<ReturnStatus/>}/>
                    <Route path='refund' element={<Refund/>}/>
                </Route>

                <Route path='/customerMng'>
                    <Route path='notice' element={<CustomerNotice/>}/>
                    <Route path='inquiry' element={<CustomerInquiry/>}/>
                    <Route path='faq' element={<CustomerFAQ/>}/>
                </Route>

            </Routes>
          </div>
        {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
