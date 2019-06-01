describe('Visitor can view unpublished articles', () => {
  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles_with_published.json',
      status: 200
    })
    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()
  })

  it('by seeing a correct page headline', () => {
    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()
    cy.contains('Unpublished Articles')
  })
  
  it('by seeing a list of unpublished articles on Reviews page', () => {
    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()

    let articles = [
      ["#36", "#title_36", "#ingress_36", "#photo_36"],
      ["#37", "#title_37", "#ingress_37", "#photo_37"],
    ]

    articles.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })
  })
  
  it('by showing full article when clicked on', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles/36',
      response: 'fixture:full_article.json',
      status: 200
    })

    cy.get("#36").click()
    
    let article = ["#title_36", "#ingress_36", "#body_36", "#photo_36", "#written_36", "#date_36",]

    article.forEach(element => {
      cy.get(element)
    })
  })
})