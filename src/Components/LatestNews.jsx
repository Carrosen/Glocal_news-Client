import React, { Component } from 'react';
import { Container, Segment, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {getCategoryNames} from '../Modules/categoriesData'
import moment from 'moment'

class LatestNews extends Component {

  state = {
    categories: []
  }

  async componentDidMount() {
    let categories = await getCategoryNames()
    this.setState({
      categories: categories,
    })
  }

  render() {

    const sortedArticles = this.props.articles.sort(function(a, b) {
      let dateA = new Date(a.created_at), dateB = new Date(b.created_at);
      return dateB - dateA;
    })

    let articleList = (
      <>
        {sortedArticles.map(article => {
          if (article.published === true) {
          
          let dateString = article.created_at
          let dateObj = new Date(dateString);
          let momentObj = moment(dateObj);
          let momentDate = momentObj.format('YYYY-MM-DD');
          let momentTime = momentObj.format('LT');

          let color
          for (let i = 0; i < this.state.categories.length; i++) {
            if (article.category.name === this.state.categories[i].name) {
              color = (
                this.state.categories[i].color
              )
            }
          }

          return (
            <Segment id={article.id} color={color} key={article.id}>
              <p>{momentDate} | {momentTime}</p>
              <Header id={`title_${article.id}`} as={Link} to={{ pathname: '/full-article', state: { id: `${article.id}` } }}>{article.title}</Header>
              <p style={{ color: 'grey' }} id={`country_city_${article.id}`}><Icon name='map marker alternate'/>{`${article.city}, ${article.country}`}</p>
            </Segment>
          )
        }})
      }
      </>
    )
    

    return (
      <Container id="latest_news">
        <Header>Latest News</Header>
        {articleList}
      </Container>

    )
  }
}

export default LatestNews