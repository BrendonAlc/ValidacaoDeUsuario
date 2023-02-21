describe('Login e registro de usuarios alura pic', () => {

    beforeEach(() => {
      cy.visit('https://alura-fotos.herokuapp.com')

     })

    it('verifica mensagens validacao', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
    })

    it('verifica mensagens de email invalido', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('brendon');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
     
    })

    it('verifica mensagens de senha com menos de 8 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('321');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');
     
    })

    //verificação de usuario válido
    it.only('fazer login de usuario válido', () => {
        cy.login('luciana', '12345678')
        cy.contains('a', '(Logout)').should('be.visible');
     
    })

    //verificação de usuario invalido
    it.only('fazer login de usuario invalido', () => {
        cy.login('brendon', '1234');
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Invalid user name or password')
        })
    })


})