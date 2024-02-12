describe('특정 카테고리 상품 리스트 및 필터 테스트', () => {
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

        const category1depthName = encodeURIComponent('디지털/가전');
        const category2depthName = encodeURIComponent('주방가전');
        cy.visit(`http://localhost:3000/category/22?category1depthName=${category1depthName}&category2depthName=${category2depthName}`);
    });

    it('카테고리 이름이 URL 쿼리 파라미터와 일치하는지 확인', () => {
        // 카테고리 이름이 표시되는지 확인
        cy.get('.productList-category').should('contain', '디지털/가전').and('contain', '주방가전');
    });

    it('상품 리스트가 정상적으로 표시되는지 확인', () => {
        // 상품 아이템이 적어도 하나 이상 있는지 확인
        cy.get('.productList-container').find('.productListItem-container').should('have.length.at.least', 1);
    });

    it('필터 기능을 사용하여 상품 리스트를 필터링할 수 있는지 확인', () => {
        // 가격 범위 입력
        cy.get('.filter-price-min').type('10000');
        cy.get('.filter-price-max').type('50000');

        // 별점 필터 선택
        cy.get('input[type="radio"][value="4"]').click({force: true});

        // 필터 적용 버튼 클릭
        cy.get('.filter-search-btn').click();
    });

    it('페이지네이션을 사용하여 다른 페이지의 상품 리스트를 볼 수 있는지 확인', () => {
        // 2페이지 버튼 클릭
        cy.get('.MuiPagination-ul').find('button').contains('2').click();

    });

    it('다른 카테고리로 이동할 수 있는지 확인', () => {
        // 메인 카테고리 메뉴를 클릭하여 카테고리 목록을 표시
        cy.get('.main-category').click();

        // 가구 카테고리 클릭
        cy.get('.sub-sub-category-contents-details-style').contains('가구').click();

        // 새로운 카테고리의 상품 리스트 페이지로 이동했는지 확인
        cy.get('.productList-category').should('contain', '가구');

        // 새로운 카테고리의 상품 리스트가 적어도 하나 이상 있는지 확인
        cy.get('.productList-container').find('.productListItem-container').should('have.length.at.least', 1);
    });
    
});
