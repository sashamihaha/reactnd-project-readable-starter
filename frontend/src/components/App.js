import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route, withRouter } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import { Provider } from 'react-redux';
import { fetchCategories, fetchPosts, addPost } from '../utils/api';
import { updatePosts, updateCategories, addPostToState, sortPosts } from '../actions';
import Category from './Category'
import PostContainer from './PostContainer'
import PostDetails from './PostDetails'
const uuidv1 = require('uuid/v1');

class App extends Component {

  state = {
    author: "",
    title: "",
    text: "",
    category: ""
  }

  componentDidMount() {
    fetchPosts().then(posts => this.props.updatePosts(posts))
    fetchCategories().then(({ categories }) => this.props.updateCategories(categories))
  }

  addPostHandler() {
    let postData = {}
    postData.id = uuidv1()
    const timestamp = Date.now();
    postData.timestamp = timestamp
    postData.author = this.state.author
    postData.body = this.state.text
    postData.title = this.state.title
    postData.category = this.state.category
    postData.voteScore = 1;
    (this.state.author, this.state.title, this.state.text, this.state.category) ? addPost(postData).then(() => this.props.addPostToState(postData)).then(() => this.setState({author: "", title: "", text: "", category: ""})) : alert("Please fill in all fields")
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <div style={{ textAlign: 'left', margin: "10px", height: "100%" }}>
            <div>
              <h2>Categories:</h2>
              <ul>
                {this.props.categories !== null ?
                  this.props.categories.map(category => (
                    <Link to={{ pathname: `/category/${category.name}` }} key={category.name}>
                      <li key={category.path}>{category.name}</li>
                    </Link>)) :
                  ""}
              </ul>
            </div>
            <div>
              <h2>Add post:</h2><br />
              Name:<br /><input type="text" value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })} /><br />
              Title:<br /><input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} name="fname" /><br />
              Category:<br /><select onChange={(event) => this.setState({ category: event.target.value })} >
                {this.props.categories !== null ? this.props.categories.map(category => (<option key={category.name} value={category.name}>{category.name}</option>)) : ""}
              </select><br />
              Text:<br /><input style={{ height: "100px" }} onChange={(event) => this.setState({ text: event.target.value })} value={this.state.text} type="text" /><br />
              <button onClick={() => (this.addPostHandler())}>Submit</button>
            </div>
            <div>
              <h2>Posts:</h2><br/>
              Sort by: <button onClick={() => this.props.sortPosts("votescore")}>votescore</button> <button onClick={() => this.props.sortPosts("timestamp")}>date</button>
              {this.props.posts ?
                Object.keys(this.props.posts).map(key => (
                  <PostContainer key={this.props.posts[key].id} post={this.props.posts[key]} />)) :
                ""

              }
            </div>
          </div>
        )} />
        <Route path="/category/:path" component={Category} />
        <Route path="/posts/:postId" component={PostDetails} />
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    posts: (state.posts || {}).postsObj,
    categories: state.categories
  }
}

export default withRouter(connect(mapStateToProps, { updatePosts, updateCategories, addPostToState, sortPosts })(App))

