describe('Visitor can view latest news', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles.json',
      status: 200
    })
    cy.visit('http://localhost:3001')
  })

  it('as a smaller second column on each category tab', () => {
    let articles = [
      ["#39", "#title_39", "#created_at_39", "#country_39", "city_39" ],
      ["#38", "#title_38", "#created_at_38", "#country_38", "city_38" ]
    ]
    cy.get('#news').click()
    cy.get('#latest_news').within(() => {
      articles.forEach(article => {
        cy.get(article[0]).within(() => {
          cy.get(article[1]), (article[2]), (article[3]), (article[4])
        })
      })
    })

    cy.get('#arts').click()
    cy.get('#latest_news').within(() => {
      articles.forEach(article => {
        cy.get(article[0]).within(() => {
          cy.get(article[1]), (article[2]), (article[3]), (article[4])
        })
      })
    })
    
  })

  it('sorted by the published date', () => {
    cy.get('#latest_news').find('a').first()
    cy.contains('A Day in Thessaloniki')
    cy.get('#latest_news').find('a').last()
    cy.contains('A Day in Rome')
  })
})
