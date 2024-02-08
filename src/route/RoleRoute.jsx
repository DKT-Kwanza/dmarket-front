import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRoute = ({ element: Element, roles }) => {
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (roles && !roles.includes(role)) {
      alert("페이지에 대한 접근 권한이 없습니다!");
      setRedirected(true);
      window.location.href = '/customerMng/notice';
    }
  }, [role, roles, navigate]);

  if (redirected) {
    return null;
  }

  // 컴포넌트 렌더링
  return Element;
};

export default RoleRoute;
