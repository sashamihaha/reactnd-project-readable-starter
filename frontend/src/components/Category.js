import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import { Provider } from 'react-redux';
import { fetchCategoryPosts } from '../utils/api'
import { updateCategoryPosts } from '../actions'
import PostContainer from './PostContainer'

class Category extends Component {

  componentDidMount() {
    fetchCategoryPosts(this.props.match.params.path).then(posts => this.props.updateCategoryPosts(posts))
  }

  render() {
    return (

      <div className="App">
        <div>
          {this.props.categoryPosts !== null ?
            this.props.categoryPosts.map(categoryPost => (
              <PostContainer key={categoryPost.id} post={categoryPost} />)) :
            ""
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categoryPosts: state.categoryPosts,
  }
}

export default connect(mapStateToProps, { updateCategoryPosts })(Category)

