import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import { Provider } from 'react-redux';
import { fetchPostDetails, updatePostVote, deletePost, editPost } from '../utils/api'
import { updatePostScore, deletePostFromState, editPostInState } from '../actions'
import Comments from './Comments'


class PostDetails extends Component {
    state = {
        edit: false,
        text: ""
    }

    updatePostHandler(post, vote) {
        updatePostVote(post.id, vote).then(() => this.props.updatePostScore(post, vote))
    }

    deletePostHandler = (postId) => {
        deletePost(postId).then(() => this.props.deletePostFromState(postId))
    }

    editPostHandler = (postId) => {
        const timestamp = Date.now()
        editPost(postId, this.state.text, timestamp).then(() => this.props.editPostInState(postId, this.state.text, timestamp)).then(() => this.setState({ edit: false }))
    }

    render() {
        const postId = this.props.match.params.postId
        let post; 
        this.props.posts ? post = this.props.posts[postId] : ""
        return (
            <div>
                { post ?
                    (
                        <div style={{margin: "10px"}}>
                            {this.state.edit === false ? (
                            <div>
                            <table style={{ width: "50%", textAlign: 'left' }}>
                                <tbody>
                                    <tr>
                                        <td><b>Title: </b>{this.props.posts[postId].title}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Post: </b>{this.props.posts[postId].body}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Author: </b>{this.props.posts[postId].author}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Date: </b>{new Date(this.props.posts[postId].timestamp).toGMTString()}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div style={{ width: "50%", textAlign: 'left' }}>
                                <b>Vote score: </b><button onClick={() => (this.updatePostHandler(this.props.posts[postId], "downVote"))}>-</button> {this.props.voteScore} <button onClick={() => (this.updatePostHandler(this.props.posts[postId], "upVote"))}>+</button>
                            <div>
                            <button onClick={() => (this.setState({edit: true, text: this.props.posts[postId].body}))}>Edit</button>
                            <button onClick={() => (this.deletePostHandler(postId))}>Delete</button>
                            </div>
                            </div>
                            </div>) : 
                            (<div style={{ textAlign: 'left' }}>
                        <b>Edit post:</b><br />
                        <input style={{ height: "100px" }} onChange={(event) => this.setState({ text: event.target.value })} value={this.state.text} type="text" /><br />
                        <button onClick={() => (this.editPostHandler(postId))}>Save</button>
                    </div>)}
            
                            <br/>
                         <br/>
                         <b>Comments ({this.props.posts ? this.props.commentCount : ""}): </b>
                         <Comments postId={postId}/>
                        </div>
                         
                    ) :
                    "Error 404: Post not found"}
                   
            </div>
        );
    }
}

const convertDate = (timestamp) => {

}

function mapStateToProps(state, props) {
    let score;
    let post;
    let commentCount
    const postId = props.match.params.postId;
    if ((state.posts || {}).postsObj) post = state.posts.postsObj[postId]
    if (post) score = post.voteScore, commentCount = post.commentCount
    return {
        posts: (state.posts || {}).postsObj,
        voteScore: score,
        commentCount: commentCount
    }
}

export default withRouter(connect(mapStateToProps, { updatePostScore, deletePostFromState, editPostInState })(PostDetails))