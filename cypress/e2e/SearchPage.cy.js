describe('검색 결과 페이지 테스트', () => {
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

        const search = encodeURIComponent('여성');
        // 검색 결과 페이지 방문
        cy.visit(`http://localhost:3000/search?q=${search}`);
    });

    it('검색 결과가 정상적으로 표시되는지 확인', () => {
        // 검색 결과 제목이 검색어를 포함하는지 확인
        cy.get('.searchList-title').should('contain', '여성');

        // 상품 아이템이 적어도 하나 이상 있는지 확인
        cy.get('.searchList-container').find('.productListItem-container').should('have.length.at.least', 1);
    });

    it('필터 기능을 사용하여 검색 결과를 필터링할 수 있는지 확인', () => {
        // 가격 범위 입력
        cy.get('.filter-price-min').type('10000');
        cy.get('.filter-price-max').type('50000');

        // 별점 필터 선택
        cy.get('input[type="radio"][value="4"]').click({force: true});

        // 필터 적용 버튼 클릭
        cy.get('.filter-search-btn').click();
    });

    it('페이지네이션을 사용하여 다른 페이지의 검색 결과를 볼 수 있는지 확인', () => {
        // 2페이지 버튼 클릭
        cy.get('.MuiPagination-ul').find('button').contains('2').click();
    });

});
