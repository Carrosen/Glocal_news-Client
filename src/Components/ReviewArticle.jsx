import React, { Component } from 'react'
import FullArticle from './FullArticle'
import ReviewForm from './ReviewForm'

class ReviewArticle extends Component {
  render() {
    return (
      <>
        <FullArticle id={this.props.match.params.id}/>
        <ReviewForm />
      </>
    )
  }
}

export default ReviewArticle