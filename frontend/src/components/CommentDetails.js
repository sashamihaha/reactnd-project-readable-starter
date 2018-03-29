import React, { Component } from 'react';
import { fetchCommentDetails, updateCommentVote, deleteComment, editComment } from '../utils/api'
import { updateCommentDetails, updateCommentScore, deleteCommentFromState, editCommentInState } from '../actions'
import { connect } from 'react-redux'

class CommentContainer extends Component {
    state = {
        edit: false,
        text: this.props.comment.body
    }

    updateCommentScoreHandler = (comment, vote) => {
        updateCommentVote(comment.id, vote).then(() => this.props.updateCommentScore(comment, vote))
    }

    deleteCommentHandler = (comment) => {
        deleteComment(comment.id).then(() => this.props.deleteCommentFromState(comment))
    }

    editCommentHandler = () => {
        const timestamp = Date.now()
        editComment(this.props.comment.id, this.state.text, timestamp).then(() => this.props.editCommentInState (this.props.comment.parentId, this.props.comment.id, this.state.text, timestamp)).then(this.setState({ edit: false }))
    }

    render() {
        return (
            <div>{this.props.text ? (<div style={{ margin: "10px" }}>
                {this.state.edit === false ? (<div style={{ width: "50%", textAlign: 'left' }}>
                    <div><b>{this.props.author}:</b> {this.props.text}</div>
                    <div>{new Date(this.props.timestamp).toGMTString()}</div>
                    <div style={{ width: "50%", textAlign: 'left' }}>
                        <button onClick={() => (this.updateCommentScoreHandler(this.props.comment, "downVote"))}>-</button> {this.props.score} <button style={{marginRight: "10px"}} onClick={() => (this.updateCommentScoreHandler(this.props.comment, "upVote"))}>+</button>
                        
                            <button onClick={() => (this.setState({ edit: true }))}>Edit</button>
                            <button onClick={() => (this.deleteCommentHandler(this.props.comment))}>Delete</button>
                        
                    </div>
                </div>) :
                    (<div style={{ textAlign: 'left' }}>
                        <b>Edit comment:</b><br />
                        <input style={{ height: "100px" }} onChange={(event) => this.setState({ text: event.target.value })} value={this.state.text} type="text" /><br />
                        <button onClick={() => (this.editCommentHandler())}>Save</button>
                    </div>)}
            </div>) : ""}
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    let score, author, text, timestamp;
    if ((state.posts || {}).comments[props.comment.parentId][props.comment.id]) {
    score = state.posts.comments[props.comment.parentId][props.comment.id].voteScore
    author = state.posts.comments[props.comment.parentId][props.comment.id].author
    text = state.posts.comments[props.comment.parentId][props.comment.id].body
    timestamp = state.posts.comments[props.comment.parentId][props.comment.id].timestamp
    }
    return {
        score: score,
        author: author,
        text: text,
        timestamp: timestamp
    }
}

export default connect(mapStateToProps, { updateCommentScore, deleteCommentFromState, editCommentInState })(CommentContainer)