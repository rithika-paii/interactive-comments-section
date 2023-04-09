import React, { useState } from 'react';

const Comment = ({ comment, user, onUpvote, onDownvote, onEdit, onDelete }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleUpvote = () => {
    onUpvote(comment.id);
  };

  const handleDownvote = () => {
    onDownvote(comment.id);
  };

  const handleEdit = () => {
    onEdit(comment.id);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyText('');
  };

  const handleReplyTextChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    // TODO: Add logic for submitting new reply
    setIsReplying(false);
    setReplyText('');
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-author">{comment.user.name}</div>
        <div className="comment-date">{comment.createdAt}</div>
      </div>
      <div className="comment-body">
        <div className="comment-text">{comment.text}</div>
        <div className="comment-actions">
          <button className="comment-action" onClick={handleUpvote}>
            Upvote ({comment.upvotes})
          </button>
          <button className="comment-action" onClick={handleDownvote}>
            Downvote ({comment.downvotes})
          </button>
          {comment.user.id === user.id && (
            <>
              <button className="comment-action" onClick={handleEdit}>
                Edit
              </button>
              <button className="comment-action" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
          <button className="comment-action" onClick={handleReply}>
            Reply
          </button>
        </div>
        {isReplying && (
          <form className="reply-form" onSubmit={handleReplySubmit}>
            <textarea
              className="reply-textarea"
              placeholder={`Replying to ${comment.user.name}`}
              value={replyText}
              onChange={handleReplyTextChange}
            />
            <div className="reply-buttons">
              <button className="reply-button" type="submit">
                Reply
              </button>
              <button className="reply-button" onClick={handleCancelReply}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              user={user}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
