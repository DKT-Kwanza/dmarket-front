describe('메인 페이지 테스트', () => {
    beforeEach(() => {
        // 메인 페이지 방문 전에 로그인 과정을 실행
        cy.visit('http://localhost:3000/member/login');

        // ID 입력
        cy.get('.login-id-input').type('test2@gachon.ac.kr');

        // 비밀번호 입력
        cy.get('.login-pw-input').type('Test1234!');

        // 로그인 버튼 클릭
        cy.get('.login-btn').click();

        // 로그인 성공 후 메인 페이지로 이동 확인
        cy.url().should('include', '/');
    });
    
        it('메인 배너가 정상적으로 표시되는지 확인', () => {
        cy.get('.main-div-mainimg-wrapper').should('exist');
        });
    
        it('신상품 섹션이 정상적으로 표시되는지 확인', () => {
        cy.get('.main-div-newitem-wrapper')
            .should('exist')
            .and('contain', '신상품');
        });
    
        it('신상품 더보기 버튼 클릭시 추가 상품 표시', () => {
        // '더보기' 버튼 클릭
        cy.get('.main-btn-button').contains('더보기 >').click();
    
        // 상품이 추가로 표시되었는지 확인
        cy.get('.main-div-products-wrapper').children().should('have.length.at.least', 1);
        });
    
        it('할인율 높은 순 섹션이 정상적으로 표시되는지 확인', () => {
        cy.get('.main-div-bestitem-wrapper')
            .should('exist')
            .and('contain', '할인율 높은 순');
        });
    
        it('카테고리 버튼 클릭시 해당 카테고리 상품 표시', () => {
        // 첫 번째 카테고리 버튼 클릭
        cy.get('.main-btn-cate-button').first().click();
    
        // 상품이 해당 카테고리의 것으로 업데이트 되었는지 확인
        cy.get('.main-div-products-wrapper').children().should('have.length.at.least', 1);
        });
    
        it('할인율 높은 순 섹션의 더보기 버튼 클릭시 추가 상품 표시', () => {
            // '할인율 높은 순' 섹션으로 스크롤
            cy.get('.main-div-bestitem-wrapper').scrollIntoView();
    
            // '더보기' 버튼 클릭
            cy.get('.main-div-bestitem-wrapper .main-btn-button').contains('더보기 >').click();
    
            // 할인율 높은 순 상품 리스트가 확장되었는지 확인
            cy.get('.main-div-bestitem-wrapper .main-div-products-wrapper').children().should('have.length.at.least', 1);
        });
        
        it('상품 클릭시 상품 상세 페이지로 이동하는지 확인', () => {
        // 첫 번째 상품 클릭
        cy.get('.main-div-products-wrapper').children().first().click();
    
        // URL이 상품 상세 페이지를 가리키는지 확인
        cy.url().should('include', '/product/detail/');
        });
    
    });
    