import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerInquiryPage.css';
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { LuImagePlus } from "react-icons/lu";
import axios from "axios";
import {userApi,bucketToken,bucketURL} from "../../../Api";


function CustomerInquiryPage() {
  const {v4} = require('uuid');
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // 선택된 옵션을 추적하기 위한 상태 추가
  const [inquiryImg, setInquiryImg] = useState(null); // 첨부 이미지 상태 변수
  const [previewImg, setPreviewImg] = useState(null); // 이미지 미리보기 상태 변수
  const [inquiryTitle, setInquiryTitle] = useState('');
  const [inquiryContents, setInquiryContents] = useState('');

  const uploadInquiryImg = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImg(previewUrl);
      const inquiryImgURL = `${bucketURL}${v4()}.${file.type.split('/')[1]}` 
      console.log(inquiryImgURL); 
      try {
        const response = await axios.put(
          inquiryImgURL,
          file,
          {
            headers: {
              'X-Auth-Token': `${bucketToken}`,
              'Content-Type': file.type
            }
          }
        );
        setInquiryImg(inquiryImgURL);
      } catch (error) {
        console.log('Error uploading inquiry image:', error);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    if (!token || !userId) {
        console.log('Token or UserId is missing');
        return;
        }
    try {
      const response = await axios.post(`${userApi}/${userId}/board/inquiry`, {
          inquiryType:  selectedOption,
          inquiryTitle: inquiryTitle,
          inquiryContents: inquiryContents,
          inquiryImg : inquiryImg
        },{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });
        navigate('/mydkt/inquiry');
        }
    catch (error) {
        console.log('Error submitting inquiry:', error);
    }
  }

  return (
    <div className='CustomerCenterInquiry'>
      <div className='CustomerCenterInquiry-body'>
        <div className='CustomerCenterName'>
            고객센터
        </div>
        <div className="notice-bar"/>
        <div className='notice-required-item'> 
          <div className='inquiry-menu-notice-redstar'>*</div>
          <div className='notice-required-item-title'>필수 항목입니다.</div>
        </div>  
        <div className='inquiry-menu'>
          <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-redstar'>*</div>
            <div className='inquiry-menu-submenu-title'>
              유형
            </div>
            <div className='inquiry-menu-submenu-content'>
              <div className='inquiry-menu-submenu-dropdown' onClick={toggleDropdown}>
                {selectedOption || '선택하세요'}
                {isDropdownOpen && (
                  <div className='dropdown-options'>
                    <div onClick={() => handleOptionSelect('회원')}>회원</div>
                    <div onClick={() => handleOptionSelect('주문/결제')}>주문/결제</div>
                    <div onClick={() => handleOptionSelect('반품/환불')}>반품/환불</div>
                    <div onClick={() => handleOptionSelect('마일리지')}>마일리지</div>
                  </div>
                )}
              </div>
              <div className='inquiry-main-submenu-button'>
                <ChevronDown/>
              </div>
            </div>
          </div>
           <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-redstar'>*</div>
            <div className='inquiry-menu-submenu-title'>
              제목
            </div>
              <input
                placeholder='제목을 입력해주세요. (30자 이내)'
                className='inquiry-menu-submenu-input'
                value = {inquiryTitle}
                onChange={(e) => setInquiryTitle(e.target.value)}
              />
          </div>
          <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-redstar'>*</div>
            <div className='inquiry-menu-submenu-title-contents'>
              내용
            </div>
            
            <textarea
              placeholder=
              {
                `  취소, 교환, 반품 신청은 주문배송 조회에서 직접 신청 가능합니다.
  상품에 대한 문의일 경우 해당 상품의 Q&A에 문의 부탁드립니다.`
              }
              className='inquiry-menu-submenu-detail'
              value = {inquiryContents}
              onChange={(e) => setInquiryContents(e.target.value)}
            />
          </div>
          <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-title'>
              사진
            </div>
            <div>
              {previewImg ? (
                <div>
                  <img src={previewImg} alt="Inquiry Preview" className="inquiry-image" />
                  <div className='inquiry-menu-stars-button'>
                    <label htmlFor="image-upload" className="inquiry-menu-stars-button-plus">
                      사진 변경
                    </label>
                    <input id="image-upload" type="file" accept='image/*' onChange={uploadInquiryImg} style={{ display: 'none' }} />
                  </div>
              </div>
              ) : (
                <div className="inquiry-menu-stars-button">
                  <label htmlFor="image-upload" className="inquiry-menu-stars-button-plus2">
                    사진 업로드
                  </label>
                  <input id="image-upload" type="file" accept='image/*' onChange={uploadInquiryImg} style={{ display: 'none' }} />
                </div>
              )}
            </div>
          </div>
          <div className="inquiry-menu-pictures-notice">
              사진첨부는 최대 1장 가능합니다.
          </div>
          <div className='inquiry-main-menu-line'/>      
        </div>
        <div className='inquiry-decision'>
          <button onClick={handleCancel} className='inquiry-decision-cancel'>취소</button>
          <button onClick={handleSubmit} className='inquiry-decision-accept'>등록</button>
        </div>
      </div>
    </div>
  );
}

export default CustomerInquiryPage;
