describe('전체 흐름 테스트', () => {
    beforeEach(() => {
        // 메인 페이지 방문 전에 로그인 과정을 실행
        cy.visit('http://localhost:3000/member/login');

        // ID 입력
        cy.get('.login-id-input').type('test2@gachon.ac.kr');

        // 비밀번호 입력
        cy.get('.login-pw-input').type('Test1234!');

        // 로그인 버튼 클릭
        cy.get('.login-btn').click();

        // userId를 앨리어스로 저장
        cy.window().then((win) => {
            const userId = win.sessionStorage.getItem('userId');
            cy.wrap(userId).as('userId');
        });

        // 로그인 성공 후 메인 페이지로 이동 확인
        cy.url().should('include', '/');
    });
    
    it('메인 페이지 데이터 확인', () => {
        cy.get('.main-div-mainimg-wrapper').should('exist');

        cy.get('.main-div-newitem-wrapper')
            .should('exist')
            .and('contain', '신상품');

        // '더보기' 버튼 클릭
        cy.get('.main-btn-button').contains('더보기 >').click();

        // 상품이 추가로 표시되었는지 확인
        cy.get('.main-div-products-wrapper').children().should('have.length.at.least', 1);

        cy.get('.main-div-bestitem-wrapper')
            .should('exist')
            .and('contain', '할인율 높은 순');

        // 첫 번째 카테고리 버튼 클릭
        cy.get('.main-btn-cate-button').first().click();

        // 상품이 해당 카테고리의 것으로 업데이트 되었는지 확인
        cy.get('.main-div-products-wrapper').children().should('have.length.at.least', 1);

        // '할인율 높은 순' 섹션으로 스크롤
        cy.get('.main-div-bestitem-wrapper').scrollIntoView();

        // '더보기' 버튼 클릭
        cy.get('.main-div-bestitem-wrapper .main-btn-button').contains('더보기 >').click();

        // 할인율 높은 순 상품 리스트가 확장되었는지 확인
        cy.get('.main-div-bestitem-wrapper .main-div-products-wrapper').children().should('have.length.at.least', 1);
    });
    
    describe('카테고리 선택', () => {
        beforeEach(() => {
            // 메인 카테고리 메뉴를 클릭하여 카테고리 목록을 표시
            cy.get('.main-category').click();

            // 가구 카테고리 클릭
            cy.get('.sub-sub-category-contents-details-style').contains('가구').click();

            // 새로운 카테고리의 상품 리스트 페이지로 이동했는지 확인
            cy.get('.productList-category').should('contain', '가구');

            // 상품 목록이 로드되기를 기다림
            cy.get('.productList-container', { timeout: 1000 }).should('be.visible');
        });

        it('필터 기능을 사용하여 상품 리스트를 필터링할 수 있는지 확인', () => {
            // 가격 범위 입력
            cy.get('.filter-price-min').type('10000', { force: true });
            cy.get('.filter-price-max').type('50000', { force: true });

            // 별점 필터 선택
            cy.get('input[type="radio"][value="4"]').click({force: true});

            // 필터 적용 버튼 클릭
            cy.get('.filter-search-btn').click();
        });

        it('페이지네이션을 사용하여 다른 페이지의 상품 리스트를 볼 수 있는지 확인', () => {
            // 2페이지 버튼 클릭
            cy.get('.MuiPagination-ul').find('button').contains('2').click();
        });

        describe('상품 구매 흐름', () => {
            beforeEach(() => {
                // 첫 번째 상품 클릭
                cy.get('.productList-container').children().first().click();
                
                // URL이 상품 상세 페이지를 가리키는지 확인
                cy.url().should('include', '/product/detail/');
            });

            it('상품 상세 데이터 확인 및 위시리스트, 장바구니, 바로 구매', () => {
                cy.get('@userId').then((userId) => {
                    cy.wait(1000);
                    // 상품 이름, 가격, 설명이 정상적으로 표시되는지 확인
                    cy.get('.title').should('exist');
                    cy.get('.subTitle').should('exist');
                    cy.get('.price').should('exist');
                    cy.get('.productDetailBox').should('exist');

                    // 대표 이미지가 표시되는지 확인
                    cy.get('.detail-repImg img').should('exist');

                    // 서브 이미지 클릭 시 대표 이미지 변경 확인
                    cy.get('.detail-subImg').first().click();
                    cy.get('.detail-repImg img').should('have.attr', 'src').and('not.equal', '{기본 대표 이미지 URL}');

                    // 리뷰 섹션이 정상적으로 표시되는지 확인
                    cy.get('.reviewTitle').should('exist');
                    cy.get('.reviewList').should('exist');

                    // Q&A 제목을 클릭
                    cy.get('.qnaTitleTest').first().click();
                    
                    // 내용 확인
                    cy.get('.qnaContentsTest').first().should('exist');

                    // Q&A 작성하기 버튼 클릭
                    cy.get('.qnaEnroll').click();
                
                    // 제목 입력
                    cy.get('input[name="title"]').type('테스트 Q&A 제목');
                
                    // 내용 입력
                    cy.get('textarea[name="contents"]').type('테스트 Q&A 내용입니다.');
                
                    // '등록' 버튼 클릭
                    cy.get('button').contains('등록').click();    
                
                    cy.get('.wishlistButton').click();
                
                    // 대기
                    cy.wait(500);

                    // FaHeart 아이콘이 렌더링되었는지 확인
                    cy.get('.wishlistButton svg').should('exist');

                    // 옵션 선택
                    cy.get('.detail-option-select select').then(select => {
                        cy.wrap(select).select(select.children('option').eq(1).val());
                    });

                    // 장바구니 버튼 클릭
                    cy.get('.cartButton').click();

                    cy.wait(500);
                    
                    // 장바구니에 추가됐는지 확인하는 모달 창이 뜨는지 확인
                    cy.get('.AddToCartModalTest').should('be.visible');

                    // 모달 닫기2
                    cy.get('.AddToCartModalConfirmTest').click();

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
            });
        });
    });
})