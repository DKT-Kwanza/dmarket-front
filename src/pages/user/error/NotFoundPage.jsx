import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@assets/images/logo.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <img src={logo} style={{width: '300px'}}/>
      <div style={{ color: '#FFD465', fontSize: '90px'}}>404</div>
      <h2>요청하신 페이지를 찾을 수 없습니다!</h2>
      <p>방문하시려는 페이지의 주소가 잘못 입력되었거나,<br />페이지의 주소가 변경 또는 삭제되어 사용할 수 없습니다.</p>
      <p>입력하신 주소가 정확한지 다시 한 번 확인해 주세요.</p>
      <button onClick={goToHome} style={{ padding: '10px 20px', marginTop: '20px', fontSize: '16px', backgroundColor: '#FFD465', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
