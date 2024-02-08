import {Route, Routes, useLocation} from "react-router-dom";

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
import ProductPage from "./pages/user/Product/ProductPage";
import SearchPage from "./pages/user/Product/SearchPage";
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
import AdminCustomerFaqPage from "./pages/admin/Customer/AdminCustomerFaqPage";
import NotFoundPage from "./pages/user/error/NotFoundPage";
import RoleRoute from "./route/RoleRoute";

function App() {
    const location = useLocation();
    const noBodyStylePaths = ['/memberMng', '/productMng', '/orderMng', '/customerMng'];
    const knownPaths = [
      '/member/login', 
      '/member/signin', 
      '/member/signinForm', 
      '/',
      '/category/:categoryId',
      '/search', 
      '/product',
      '/product/detail/:productId',
      '/product/detail',
      '/order', 
      '/order/complete',
      '/mydkt/orderInfo', 
      '/mydkt/orderInfoDetail', 
      '/mydkt/mycart', 
      '/mydkt/mywish', 
      '/mydkt/review', 
      '/mydkt/writeReview', 
      '/mydkt/qna', 
      '/mydkt/inquiry', 
      '/mydkt/changeinfo', 
      '/mydkt/changePwd', 
      '/mydkt/charge', 
      '/mydkt/mileageInfo', 
      '/customer', 
      '/customer/faq/:tab', 
      '/customer/writeInquiry', 
      '/memberMng/manager', 
      '/memberMng/user', 
      '/memberMng/addUser', 
      '/memberMng/mileage', 
      '/productMng', 
      '/productMng/add', 
      '/productMng/edit/:productId', 
      '/productMng/qna', 
      '/productMng/quantity', 
      '/productMng/review', 
      '/orderMng', 
      '/orderMng/cancel', 
      '/orderMng/return', 
      '/orderMng/refund', 
      '/customerMng/notice', 
      '/customerMng/inquiry', 
      '/customerMng/faq', 
    ];    
    const fullPath = decodeURIComponent(location.pathname) + location.search;
    const isKnownPath = knownPaths.some(knownPath => {
      const regex = new RegExp(`^${knownPath.replace(/:[^\s/]+/g, '([\\w-]+)')}(/?.*)?$`);
      return regex.test(fullPath);
    });
    const applyBodyStyle = !noBodyStylePaths.some(path => location.pathname.startsWith(path));
    const hideHeaderFooter = location.pathname.startsWith('/member') ||
      location.pathname.startsWith('/memberMng') ||
      location.pathname.startsWith('/productMng') ||
      location.pathname.startsWith('/orderMng') ||
      location.pathname.startsWith('/customerMng') ||
      !isKnownPath;

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
              <Route path='category/:categoryId' element={<ProductPage/>}/>
              <Route path='search' element={<SearchPage/>}/>
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
              <Route path='changeinfo' element={<ChangeInfo/>} />
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
            <Route path='/memberMng/manager' element={
              <RoleRoute element={<AdminList />} roles={['ROLE_GM', 'ROLE_SM']} />
            } />
            <Route path='/memberMng/user' element={
              <RoleRoute element={<MemberList />} roles={['ROLE_GM', 'ROLE_SM']} />
            } />
            <Route path='/memberMng/addUser' element={
              <RoleRoute element={<UserRegisterPage />} roles={['ROLE_GM', 'ROLE_SM']} />
            } />
            <Route path='/memberMng/mileage' element={
              <RoleRoute element={<UserMileagePage />} roles={['ROLE_GM', 'ROLE_SM']} />
            } />

            <Route path='/productMng' element={
              <RoleRoute element={<Product />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/productMng/add' element={
              <RoleRoute element={<ProductAddPage />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/productMng/edit/:productId' element={
              <RoleRoute element={<ProductEditPage />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/productMng/qna' element={
              <RoleRoute element={<ProductQnaPage />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/productMng/quantity' element={
              <RoleRoute element={<ProductQuantityPage />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/productMng/review' element={
              <RoleRoute element={<ProductReviewPage />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />

            <Route path='/orderMng' element={
              <RoleRoute element={<OrderStatus />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/orderMng/cancel' element={
              <RoleRoute element={<OrderCancel />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/orderMng/return' element={
              <RoleRoute element={<ReturnStatus />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />
            <Route path='/orderMng/refund' element={
              <RoleRoute element={<Refund />} roles={['ROLE_GM', 'ROLE_PM']} />
            } />

            <Route path='/customerMng/notice' element={
              <RoleRoute element={<CustomerNotice />} roles={['ROLE_GM', 'ROLE_SM', 'ROLE_PM']} />
            } />
            <Route path='/customerMng/inquiry' element={
              <RoleRoute element={<CustomerInquiry />} roles={['ROLE_GM', 'ROLE_SM', 'ROLE_PM']} />
            } />
            <Route path='/customerMng/faq' element={
              <RoleRoute element={<AdminCustomerFaqPage />} roles={['ROLE_GM', 'ROLE_SM', 'ROLE_PM']} />
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
