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
import Payment from "./pages/user/Payment/Payment";
import OrderComplete from './pages/user/Payment/OrderComplete';
import ChangePwd from './pages/user/MyInfo/ChangePwd';
import CustomerCenterNotice from "./pages/user/Customer/CustomerNoticePage";
import CustomerCenterFAQ from "./pages/user/Customer/CustomerFaqPage";
import CustomerCenterInquiry from "./pages/user/Customer/CustomerInquiryPage";
import WriteReview from "./pages/user/MyReview/WriteReview";
import OrderHistory from './pages/user/MyOrder/OrderHistory';
import OrderHistoryDetail from "./pages/user/MyOrder/OrderHistoryDetail";
import Inquiry from "./pages/user/CustomerInquiry/Inquiry";
import Qna from "./pages/user/Qna/Qna";
import HistoryMileage from "./pages/user/Mileage/HistoryMileage";

import Product from "./pages/admin/Product/ProductPage";
import AddProduct from "./pages/admin/Product/ProductAddPage";
import EditProduct from "./pages/admin/Product/ProductEditPage";
import ProductQna from "./pages/admin/Product/ProductQnaPage";
import OptionQuantity from "./pages/admin/Product/ProductQuantityPage";
import AdminList from "./pages/admin/Member/AdminPagejsx";
import ProductReview from "./pages/admin/Product/ProductReviewPage";
import MemberList from "./pages/admin/Member/UserPage";
import RegisterMember from "./pages/admin/Member/UserRegisterPage";
import MemberMileage from "./pages/admin/Member/UserMileagePage";
import OrderStatus from "./pages/admin/Order/OrderPage";
import OrderCancel from "./pages/admin/Order/OrderCancelPage";
import Refund from "./pages/admin/Order/OrderRefundPage";
import CustomerNotice from "./pages/admin/Customer/CustomerNoticePage";
import ReturnStatus from "./pages/admin/Order/OrderReturnPage";
import CustomerInquiry from "./pages/admin/Customer/CustomerInquiryPage";
import CustomerFAQ from "./pages/admin/Customer/CustomerFaqPage";

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

            <Route path='/admin/admin'>
                <Route path='adminlist' element={<AdminList />} />
            </Route>
            <Route path='/admin/orderMng'>
                <Route path='orderStatus' element={<OrderStatus/>} />
                <Route path='cancel' element={<OrderCancel/>} />
                <Route path='returnStatus' element={<ReturnStatus />} />
                <Route path='refund' element={<Refund/>} />
            </Route>

            <Route path='/admin/customer'>
              <Route path='' element={<CustomerNotice />}/>
              <Route path='inquiry' element={<CustomerInquiry />}/>
              <Route path='faq' element={<CustomerFAQ />} />
            </Route>

            <Route path='/admin/userMng'>
                <Route path='memberlist' element={<MemberList />} />
                <Route path='register' element={<RegisterMember />} />
                <Route path='mileage' element={<MemberMileage />} />
            </Route>

            <Route path='/admin/productMng'>
                <Route path='product' element={<Product />} />
                <Route path='add' element={<AddProduct />} />
                <Route path='edit' element={<EditProduct />} />
                <Route path='qna' element={<ProductQna />} />
                <Route path='optionquantity' element={<OptionQuantity />} />
                <Route path='review' element={<ProductReview />} />
            </Route>

          </Routes>
        {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
