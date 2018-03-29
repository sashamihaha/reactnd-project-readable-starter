import React, { Component } from 'react';
import { fetchComments, updateCommentVote, addComment } from '../utils/api'
import { updateComments, updateCommentScore, addCommentToState } from '../actions'
import { connect } from 'react-redux'
import CommentContainer from './CommentDetails'
const uuidv1 = require('uuid/v1');

class Comments extends Component {

    state = {
        inputName: "",
        inputComment: ""
    }

    componentDidMount() {
        fetchComments(this.props.postId).then(comments => this.props.updateComments(comments))
    }

    addCommentHandler() {
        let commentData = {}
        commentData.id = uuidv1()
        const timestamp = Date.now();
        commentData.timestamp = timestamp,
        commentData.body = this.state.inputComment,
        commentData.author = this.state.inputComment,
        commentData.parentId = this.props.postId,
        commentData.parentDeleted = false
        commentData.deleted = false,
        commentData.voteScore = 1;
        (this.state.inputComment && this.state.inputName) ? addComment(commentData).then(() => this.props.addCommentToState(commentData)).then(() => this.setState({inputName: "", inputComment: ""})) : alert("Please fill in all fields")
    }

    render() {
        return (
            <div>{this.props.comments ? Object.keys(this.props.comments).map(key => (
                <CommentContainer key={this.props.comments[key].id} comment={this.props.comments[key]} />
            )) :
                ""}<br />
                <div style={{ textAlign: 'left', marginLeft: "10px" }}>
                    <b>Add comment:</b><br />
                    Name:<br /><input type="text" value={this.state.inputName} onChange={(event) => this.setState({ inputName: event.target.value })} name="fname" /><br />
                    Comment:<br /><input style={{ height: "100px" }} onChange={(event) => this.setState({ inputComment: event.target.value })} value={this.state.inputComment} type="text" name="fname" /><br />
                    <button onClick={() => (this.addCommentHandler())}>Submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    let comments
    let score
    const postId = props.postId;
    (state.posts || {}).comments ? comments = state.posts.comments[postId] : "";
    return {
        comments: comments,
    }
}

export default connect(mapStateToProps, { updateComments, addCommentToState })(Comments)