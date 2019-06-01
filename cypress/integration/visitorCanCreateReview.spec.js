describe('Visitor can', () => {
  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles_with_published.json',
      status: 200
    })
    // cy.route({
    //   method: 'POST',
    //   url: 'http://localhost:3000/api/v1/articles/1/reviews',
    //   response: 'fixture:create_review_success.json'
    // })
    cy.visit('http://localhost:3001')
    cy.get('#review_articles').click()
  })

  it('see unpublished article when clicked on', () => {
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles/1/reviews',
      response: 'fixture:one_unpublished_article.json',
      status: 200
    })

    cy.get("#1").click()

    let article = ["#title_1", "#ingress_1", "#body_1", "#photo_1", "#written_1", "#date_1", "#created_at"]

    article.forEach(element => {
      cy.get(element)
    })
  })

  it('write an review for article successfully', () => {
    cy.get('#score').type('8')
    // not sure how to get id of score, should we say ex. score_1 and/or have a selector?

    cy.get('#comment').type('Great article!')
    cy.get('#create_review').click()
    cy.contains('Thank you for reviewing!')
  })

  it('get an error message if all fields are not filled in', () => {
    cy.get('#comment').type('Great article!')
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/articles/1/reviews',
      response: 'fixture:create_review_no_success.json',
      status: 422
    })
    cy.get('#create_review').click()
    cy.contains("Your review could not be created because of following error(s):")
    cy.contains("Score can't be blank")
  })
})