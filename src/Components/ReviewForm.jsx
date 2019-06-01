import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'

class ReviewForm extends Component {
  state = {
    score: ''
  }

  handleChangeScore = (e, { value }) => {
    this.setState({ score: value })
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const options = [
      { key: '1', text: '1', value: '1' },
      { key: '2', text: '2', value: '2' },
      { key: '3', text: '3', value: '3' },
      { key: '4', text: '4', value: '4' },
      { key: '5', text: '5', value: '5' },
      { key: '6', text: '6', value: '6' },
      { key: '7', text: '7', value: '7' },
      { key: '8', text: '8', value: '8' },
      { key: '9', text: '9', value: '9' },
      { key: '10', text: '10', value: '10' }
    ]

    return (
      <>
        <Form type="medium" id="review-article" // onSubmit={this.onSubmit} 
        >
          <Dropdown
            clearable
            search
            selection
            placeholder="Select Score"
            options={options}
            id="score_select"
            onChange={this.handleChangeScore}
          />

          <Form.Input
            id="comment"
            value={this.state.comment}
            onChange={this.onChangeHandler}
            placeholder="Comment"
          />

          <Button id="create_review">Send Review</Button>
        </Form>
      </>
    )
  }
}

export default ReviewForm