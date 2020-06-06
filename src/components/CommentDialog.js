import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import { handleUpdateComment } from '../actions/comments';

function CommentDialog(props) {
  const { comment, handleUpdateComment, cid } = props
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState(comment.body)
  const [bodyError, setBodyError] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => setBody(e.target.value)

  const handleSubmit = () => {
    setIsButtonDisabled(true)

    const submittedComment = {
      timestamp: Date.now(),
      body: body
    }

    body === ''
      ? setBodyError(true)
      : handleUpdateComment(cid, submittedComment)
          .then(() => {
            alert('Comment has been updated successfully!')
            setIsButtonDisabled(false)
          })
          .catch(err => {
            alert(err)
            setIsButtonDisabled(false)
          })
  }

  return (
    <Fragment>
      <IconButton 
        color="primary"
        onClick={handleClickOpen}
        size="small"
      >
        <EditIcon />
      </IconButton>
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Body"
            fullWidth
            value={body}
            onChange={handleChange}
            helperText={bodyError ? 'Cannot be blank!' : ''}
            error={bodyError}
            disabled={isButtonDisabled}
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

const mapStatesToProps = ({ comments }, { cid }) => ({ 
  comment: comments.filter(comment => comment.id === cid)[0]
})

export default connect(mapStatesToProps, { handleUpdateComment })(CommentDialog)
