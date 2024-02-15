describe('상품 상세 페이지 테스트', () => {
    beforeEach(() => {
        // 메인 페이지 방문 전에 로그인 과정을 실행
        cy.visit('http://localhost:3000/member/login');

        // 사용자 ID 입력
        cy.get('.login-id-input').type('test2@gachon.ac.kr');

        // 비밀번호 입력
        cy.get('.login-pw-input').type('Test1234!');

        // 로그인 버튼 클릭
        cy.get('.login-btn').click();

        // 로그인 성공 후 메인 페이지로 이동 확인
        cy.url().should('include', '/');

        // userId를 앨리어스로 저장
        cy.window().then((win) => {
            const userId = win.sessionStorage.getItem('userId');
            cy.wrap(userId).as('userId');
        });
            
        // 상품 상세 페이지로 이동
        cy.visit('http://localhost:3000/product/detail/305');
    });
    
    it('페이지 로드 및 상품 정보 표시 테스트', () => {
        // 상품 이름, 가격, 설명이 정상적으로 표시되는지 확인
        cy.get('.title').should('exist');
        cy.get('.subTitle').should('exist');
        cy.get('.price').should('exist');
        cy.get('.productDetail').should('exist');
        // cy.get('.productDetailBox').should('exist');
    });

    it('이미지 갤러리 작동 확인', () => {
        // 대표 이미지가 표시되는지 확인
        cy.get('.detail-repImg img').should('exist');

        // 서브 이미지 클릭 시 대표 이미지 변경 확인
        cy.get('.detail-subImg').first().click();
        cy.get('.detail-repImg img').should('have.attr', 'src').and('not.equal', '{기본 대표 이미지 URL}');
    });

    it('리뷰 섹션 표시 확인', () => {
        // 리뷰 섹션이 정상적으로 표시되는지 확인
        cy.get('.reviewTitle').should('exist');
        cy.get('.reviewList').should('exist');
    });

    it('Q&A 섹션 표시 및 내용 확인', () => {
        // Q&A 제목을 클릭
        cy.get('.qnaTitleTest').first().click();
        
        // 클릭 후 대기
        cy.wait(500);
        
        // 내용 확인
        cy.get('.qnaContentsTest').first().should('exist');
    });

    
    it('Q&A 작성 및 제출', () => {
        // Q&A 작성하기 버튼 클릭
        cy.get('.qnaEnroll').click();
    
        // 제목 입력
        cy.get('input[name="title"]').type('테스트 Q&A 제목');
    
        // 내용 입력
        cy.get('textarea[name="contents"]').type('테스트 Q&A 내용입니다.');
    
        // '등록' 버튼 클릭
        cy.get('button').contains('등록').click();    
    });

    it('위시리스트에 상품 추가', () => {
        cy.get('@userId').then((userId) => {
            cy.get('.wishlistButton').click();
        
            // 대기
            cy.wait(1000);

            // FaHeart 아이콘이 렌더링되었는지 확인
            cy.get('.wishlistButton svg').should('exist');
        });
    });
    
    it('장바구니에 상품 추가', () => {
        cy.get('@userId').then((userId) => {
            // 옵션 선택
            cy.get('.detail-option-select select').then(select => {
                cy.wrap(select).select(select.children('option').eq(1).val());
            });

            // 장바구니 버튼 클릭
            cy.get('.cartButton').click();

            cy.wait(1000);
            
            // 장바구니에 추가됐는지 확인하는 모달 창이 뜨는지 확인
            cy.get('.AddToCartModalTest').should('be.visible');

            // 모달 닫기
            cy.get('.AddToCartModalConfirmTest').click();
        });
    });

    it('상품 바로 구매', () => {
        cy.get('@userId').then((userId) => {
            // 옵션 선택
            cy.get('.detail-option-select select').then(select => {
                cy.wrap(select).select(select.children('option').eq(1).val());
            });

            // 바로 구매 버튼 클릭
            cy.get('.purchaseButton').click();

            // 결제 페이지로 이동했는지 확인
            cy.url().should('include', '/order');

            // 배송 요청사항 선택
            cy.get('.payment-deliveryReq-drop').click();
            cy.get('.payment-dropdown-scroll').contains('부재 시 경비실에 맡겨주세요').click();

            // 결제하기 버튼 클릭
            cy.get('.orderTest').click();

            // 결제 완료 페이지로 이동했는지 확인
            cy.url().should('include', '/order/complete');
        });
    })
});