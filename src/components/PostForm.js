import * as ReadableAPI from '../utils/api'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { 
  makeStyles, 
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Button,
} from '@material-ui/core';
import uniqid from 'uniqid'

import { capitalizedString, validateInput } from '../utils/helper';
import { handleUpdatePost } from '../actions/posts';

const useStyles = makeStyles((theme) => ({
  generalMargin: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  formControl: {
    paddingLeft: theme.spacing(1),
    flex: 1
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    textAlign: 'left'
  },
  cancel: {
    marginLeft: theme.spacing(1),
  },
  author: {
    paddingRight: theme.spacing(1),
    flex: 1
  },
  title: {
    width: '100%'
  },
  form: {
    padding: theme.spacing(1)
  },
  buttonContainer: {
    marginTop: theme.spacing(2)
  }
}));

function PostForm(props) {
  const classes = useStyles();
  const { post, setIsEditable, handleUpdatePost } = props

  const handleChange = (setMethod, setInputError) => e => {
    setMethod(e.target.value)
    if(e.target.value !== '') setInputError(false)
  }
  const handleBlur = (input, setInputError) => input === '' ? setInputError(true) : setInputError(false)

  const initialTitle = post ? post.title : ''
  const [title, setTitle] = useState(initialTitle)
  const [titleError, setTitleError] = useState(false)
  const handleTitleChange = handleChange(setTitle, setTitleError)

  const initialBody = post ? post.body : ''
  const [body, setBody] = useState(initialBody)
  const [bodyError, setBodyError] = useState(false)
  const handleBodyChange = handleChange(setBody, setBodyError)

  const initialAuthor = post ? post.author : ''
  const [author, setAuthor] = useState(initialAuthor)
  const [authorError, setAuthorError] = useState(false)
  const handleAuthorChange = handleChange(setAuthor, setAuthorError)

  const { categories, routerDropdown } = props

  const initialDropdown = post ? post.category : routerDropdown
  const [dropdown, setDropdown] = useState(initialDropdown)
  const [dropdownError, setDropdownError] = useState(false)
  const handleDropdownChange = handleChange(setDropdown, setDropdownError)

  const validateForm = () => {
    const validateTitle = validateInput(title, setTitleError)
    const validateBody = validateInput(body, setBodyError)
    const validateAuthor = validateInput(author, setAuthorError)
    const validateDropdown = validateInput(dropdown, setDropdownError)

    return validateTitle && validateBody && validateAuthor && validateDropdown
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const handleSubmit = () => {
    const isFormValid = validateForm()

    if (isFormValid) {
      setIsButtonDisabled(true)

      const submittedPost = post 
        ? {
            title: title,
            body: body,
          }
        : {
            id: uniqid(),
            timestamp: Date.now(),
            title: title,
            body: body,
            author: author,
            category: dropdown,
          }

      !post 
        ? ReadableAPI.addPost(submittedPost)
            .then(() => {
              alert('Post has been added successfully!')

              setTitle('')
              setBody('')
              setAuthor('')
              setDropdown('')
              setIsButtonDisabled(false)
            })
            .catch(err => {
              alert(err)
              setIsButtonDisabled(false)
            })
        : handleUpdatePost(post.id, submittedPost)
            .then(() => {
              alert('Post has been updated successfully!')
              setIsButtonDisabled(false)
            })
            .catch(err => {
              alert(err)
              setIsButtonDisabled(false)
            })
    }
  }

  const handleCancel = () => setIsEditable(false)

  return (
    <form noValidate autoComplete="off" className={classes.form}>
      <Grid container className={classes.generalMargin}>
        {!post && 
          <Typography variant="h5" align="left" className={classes.title}>
            ADD POST
          </Typography>}
        <TextField 
          fullWidth
          error={titleError}
          required 
          label="Title" 
          onBlur={() => handleBlur(title, setTitleError)} 
          value={title}
          onChange={handleTitleChange}
          helperText={titleError ? 'Cannot be blank!' : ''}
        />
        <Grid item container> 
          <TextField
            error={authorError}
            required 
            label="Author"
            inputProps={post ? { readOnly: true } : {}}
            onBlur={() => handleBlur(author, setAuthorError)} 
            value={author}
            onChange={handleAuthorChange}
            helperText={authorError ? 'Cannot be blank!' : ''} 
            className={classes.author}
          />
          <FormControl 
            className={classes.formControl} 
            error={dropdownError}
            required
          >
            <InputLabel shrink id="create-dropdown">
              Category
            </InputLabel>
            <Select 
              labelId="create-dropdown"
              inputProps={post ? { readOnly: true } : {}}
              value={dropdown}
              displayEmpty
              className={classes.selectEmpty}
              onChange={handleDropdownChange}
              onBlur={() => handleBlur(dropdown, setDropdownError)}
            >
              <MenuItem value="">
                <em>Choose A Category</em>
              </MenuItem>
              {categories.map((category, index) => 
                <MenuItem 
                  value={category} 
                  key={index} 
                >
                  {capitalizedString(category)}
                </MenuItem>
              )}
            </Select>
            <FormHelperText>
              {dropdownError ? 'Must choose a category' : ''}
            </FormHelperText>
          </FormControl>
        </Grid>
        <TextField 
          fullWidth
          error={bodyError}
          required 
          label="Body" 
          onBlur={() => handleBlur(body, setBodyError)} 
          value={body}
          onChange={handleBodyChange}
          helperText={bodyError ? 'Cannot be blank!' : ''}
          multiline
          rows={2}
        />
        <Grid item container justify="flex-end" className={classes.buttonContainer}>
          {post && 
            <Button 
              variant="contained"
              onClick={handleCancel}
              color="secondary"
            >
              CANCEL
            </Button>}
          <Button 
            fullWidth={!post}
            variant="contained"
            onClick={handleSubmit}
            className={classes.cancel}
            disabled={isButtonDisabled}
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

const mapStatesToProps = ({ categories }, { location }) => {
  let routerDropdown = ''
  if (location.search !== '') {
    const query = new URLSearchParams(location.search)
    routerDropdown = query.get('category')
  }

  return { 
    routerDropdown,
    categories: categories.map(category => category.name),
  }
}

export default withRouter(connect(mapStatesToProps, { handleUpdatePost })(PostForm))
