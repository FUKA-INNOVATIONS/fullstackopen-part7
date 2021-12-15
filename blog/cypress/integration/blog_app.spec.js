describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Fuad Kalhori',
      username: 'fkalhori',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function() {
    cy.contains('Blog app by FUKA 2021')
  })

  it('Login form can be toggled (can be shown)', function() {
    cy.contains('Login').click()
  })

  it('User can login', function () {
    cy.contains('Login').click()
    cy.get('#username').type('fkalhori')
    cy.get('#password').type('salasana')
    cy.get('#login-btn').click()
    cy.contains('fkalhori logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'fkalhori', password: 'salasana' })
    })

    it('a new post can be created and is added to the list', function() {
      cy.createPost({ title: 'E2E title', author: 'E2E author', url: 'www.e2e.test' })
      cy.contains('E2E title')
    })

    it('post is deleted by owner of the post', function() {
      cy.createPost({ title: 'E2E title delete', author: 'E2E author', url: 'www.e2e.test' })
      cy.get('#showDetailsBtn').click()
      cy.get('#deleteBtn').click()
    })

    it('a post can be liked', function() {
      cy.createPost({ title: 'E2E title', author: 'E2E author', url: 'www.e2e.test' })
      cy.get('#showDetailsBtn').click()
      cy.get('#likeBtn').click()
      cy.contains('Likes: 1')
    })
  })

  describe('When login fails', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('fkalhori')
      cy.get('#password').type('null')
      cy.get('#login-btn').click()
      cy.get('.notification')
        .should('contain', 'Login failed!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('Notoification message color is red', function() {

    })
  })

})
