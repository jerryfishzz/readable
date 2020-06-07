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
import uniqid from 'uniqid'

import { handleUpdateComment, handleAddComment } from '../actions/comments';
import { validateInput } from '../utils/helper';

function CommentDialog(props) {
  const { comment, handleUpdateComment, handleAddComment, cid, pid } = props
  const [open, setOpen] = useState(false);

  const handleChange = (setMethod, setInputError) => e => {
    setMethod(e.target.value)
    if(e.target.value !== '') setInputError(false)
  }
  const handleBlur = (input, setInputError) => input === '' ? setInputError(true) : setInputError(false)

  const [author, setAuthor] = useState('')
  const [authorError, setAuthorError] = useState(false)
  const handleAuthorChange = handleChange(setAuthor, setAuthorError)

  const initialBody = comment ? comment.body : ''
  const [body, setBody] = useState(initialBody)
  const [bodyError, setBodyError] = useState(false)
  const handleBodyChange = handleChange(setBody, setBodyError)

  const validateForm = () => {
    const validateBody = validateInput(body, setBodyError)
    const validateAuthor = validateInput(author, setAuthorError)

    return cid ? validateBody : validateBody && validateAuthor
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);

    // When editing, set body value equals to comment in store
    if (cid) setBody(comment.body)
  };

  const handleClose = () => {
    setOpen(false);
    setAuthorError(false)
    setBodyError(false)

    if (pid) {
      setAuthor('')
      setBody('')
    }
  };

  const handleSubmit = () => {
    const isFormValid = validateForm()

    if (isFormValid) {
      setIsButtonDisabled(true)

      const submittedComment = cid
        ? {
            timestamp: Date.now(),
            body: body
          }
        : {
            id: uniqid(),
            timestamp: Date.now(),
            body: body,
            author: author,
            parentId: pid
          }

      !cid
        ? handleAddComment(submittedComment)
            .then(() => {
              alert('Comment has been added successfully!')

              setBody('')
              setAuthor('')
              setIsButtonDisabled(false)
              handleClose()
            })
            .catch(err => {
              alert(err)
              setIsButtonDisabled(false)
            })
        : handleUpdateComment(cid, submittedComment)
            .then(() => {
              alert('Comment has been updated successfully!')
              setIsButtonDisabled(false)
              handleClose()
            })
            .catch(err => {
              alert(err)
              setIsButtonDisabled(false)
            })
    }
    
  }

  return (
    <Fragment>
      {!cid &&
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Comment
        </Button>
      }
      {cid && 
        <IconButton 
          color="primary"
          onClick={handleClickOpen}
          size="small"
        >
          <EditIcon />
        </IconButton>
      }
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>{cid ? 'Edit Comment' : 'Add Comment'}</DialogTitle>
        <DialogContent>
          {!cid && 
            <TextField
              margin="dense"
              label="Author"
              fullWidth
              value={author}
              onChange={handleAuthorChange}
              onBlur={() => handleBlur(author, setAuthorError)}
              helperText={authorError ? 'Cannot be blank!' : ''}
              error={authorError}
            />}
          <TextField
            margin="dense"
            label="Body"
            fullWidth
            value={body}
            onChange={handleBodyChange}
            onBlur={() => handleBlur(body, setBodyError)} 
            helperText={bodyError ? 'Cannot be blank!' : ''}
            error={bodyError}
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="secondary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary"
            disabled={isButtonDisabled}
          >
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

export default connect(mapStatesToProps, { handleUpdateComment, handleAddComment })(CommentDialog)
