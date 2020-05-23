import React, { useState } from 'react'
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function CreatePost(props) {
  const classes = useStyles();

  const handleChange = (setMethod, setPropError) => e => {
    setMethod(e.target.value)
    if(e.target.value !== '') setPropError(false)
  }
  const handleBlur = (prop, setPropError) => prop === '' ? setPropError(true) : setPropError(false)

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const handleTitleChange = handleChange(setTitle, setTitleError)

  const [body, setBody] = useState('')
  const [bodyError, setBodyError] = useState(false)
  const handleBodyChange = handleChange(setBody, setBodyError)

  const [author, setAuthor] = useState('')
  const [authorError, setAuthorError] = useState(false)
  const handleAuthorChange = handleChange(setAuthor, setAuthorError)
  
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        error={titleError}
        required 
        label="Title" 
        onBlur={() => handleBlur(title, setTitleError)} 
        value={title}
        onChange={handleTitleChange}
        helperText={titleError ? 'Cannot be blank!' : ''}
      />
      <TextField 
        error={bodyError}
        required 
        label="Body" 
        onBlur={() => handleBlur(body, setBodyError)} 
        value={body}
        onChange={handleBodyChange}
        helperText={bodyError ? 'Cannot be blank!' : ''}
      />
      <TextField 
        error={authorError}
        required 
        label="Author"
        onBlur={() => handleBlur(author, setAuthorError)} 
        value={author}
        onChange={handleAuthorChange}
        helperText={authorError ? 'Cannot be blank!' : ''} 
      />
    </form>
  )
}

export default CreatePost
