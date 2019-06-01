import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class ListOfArticles extends Component {
  state = {
    articles: [],
    id: '',
  }


  componentDidMount() {
    axios.get('/api/v1/articles').then(response => {
      this.setState({ articles: response.data });
    });
  }


  render() {
    let articleList = this.state.articles.length ? (
      <div>
        {this.state.articles.map(article => {
          return (
            <Container key={article.id} as={Link} to={{ pathname: `/full-article/${article.id}` }}>
              <div id={article.id} >
                <img alt="article logo" id={`photo_${article.id}`} src={article.image} width="200" height="100" />
                <h1 id={`title_${article.id}`}>{article.title}</h1>
                <h3 id={`ingress_${article.id}`}>{article.ingress}</h3>
                <h5 id={`country_city_${article.id}`}>{`Country: ${article.country}, City: ${article.city}`}</h5>
                <br />
              </div>
            </Container>
          )
        })}
      </div>
    ) : (
        <h2>There are no articles at the moment. You can be the first to post your own article and become a neighborhood journalist!</h2>
      )

    return (
      <>
        <Container>
          <Grid centered columns={3}>
            <Grid.Column width={7}>
              {articleList}
            </Grid.Column>

            <Grid.Column width={4}>
            </Grid.Column>

            <Grid.Column width={3}>
            </Grid.Column>
          </Grid>
        </Container>
      </>
    )
  }
}

export default ListOfArticles
