import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'


const PostContainer = ({ post }) => {
    return (
        
        <div style={{ marginBottom: "10px" }}>
            <Link to={`/posts/${post.id}`} key={post.id}>
                <div >
                    <h3>{post.title} ({post.voteScore})</h3>
                </div>
            </Link>
        </div>
    )
}

export default withRouter(PostContainer)