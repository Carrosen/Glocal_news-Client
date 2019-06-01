import React, { Component } from 'react'
import axios from 'axios'
import { Divider, Segment, Header, Image, Container, Grid, Message } from 'semantic-ui-react'
import moment from 'moment'

class FullArticle extends Component {
  state = {
    id: '',
    title: '',
    ingress: '',
    body: '',
    image: '',
    written_by: '',
    created_at: '',
    category_name: '',
    message: false,
    country: '',
    city: ''
  };

  componentDidMount() {
    let mainPath = '/api/v1/articles/'
    let articlePath = this.props.match ? this.props.match.params.id : this.props.id
    axios.get(mainPath + articlePath).then(response => {
      this.setState({
        id: response.data.id,
        title: response.data.title,
        ingress: response.data.ingress,
        body: response.data.body,
        image: response.data.image,
        written_by: response.data.written_by,
        created_at: response.data.created_at,
        category_name: response.data.category.name,
        country: response.data.country,
        city: response.data.city
      });
    });
    this.props.location && this.setState(
      {
        message: this.props.location.state.message
      }
    )
  }



  render() {

    let dateString = this.state.created_at;
    let dateObj = new Date(dateString);
    let momentObj = moment(dateObj);
    let momentString = momentObj.format('YYYY-MM-DD');
    let message

    if (this.state.message) {
      message = (
        <Message color="green">
          Thank you for sharing your story! Your article is awaiting reviews.
        </Message>
      )
    }

    return (
      <>
        <Container>
          <Grid centered columns={2}>
            <Grid.Column width={11}>
              {message}
              <Segment padded>
                <Header id={`title_${this.state.id}`} as="h1">{this.state.title}</Header>
                <Divider />
                <Image id={`photo_${this.state.id}`} src={this.state.image} size="large" floated="left"></Image>
                <p id={`ingress_${this.state.id}`} style={{ fontSize: "1.2em" }}>{this.state.ingress}</p>
                <p id={`body_${this.state.id}`}>{this.state.body}</p>
                <Divider />
                <strong id={`written_${this.state.id}`}>Written by: {this.state.written_by}</strong>
                <br></br>
                <i id={`date_${this.state.id}`}>{momentString}</i>
                <br></br>
                <strong id={`category_${this.state.id}`}>Category: {this.state.category_name}</strong>
                <br></br>
                <strong id={`country_${this.state.id}`}>Country: {this.state.country}</strong>
                <br></br>
                <strong id={`city_${this.state.id}`}>City: {this.state.city}</strong>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>

            </Grid.Column>
          </Grid>
        </Container>
      </>
    )
  }
}

export default FullArticle
