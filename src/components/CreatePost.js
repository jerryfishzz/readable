import * as ReadableAPI from '../utils/api'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { 
  makeStyles, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Button,
  Typography,
  Container,
  Grid,
  IconButton
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import uniqid from 'uniqid'

import { capitalizedString } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),

    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    textAlign: 'left'
  },
  button: {
    marginTop: theme.spacing(2),
  },
  title: {
    flex: 1
  }
}));

const validateInput = (input, setInputError) => {
  if (input === '') {
    setInputError(true)
    return false
  }
  return true
}

function CreatePost(props) {
  const classes = useStyles();

  const handleChange = (setMethod, setInputError) => e => {
    setMethod(e.target.value)
    if(e.target.value !== '') setInputError(false)
  }
  const handleBlur = (input, setInputError) => input === '' ? setInputError(true) : setInputError(false)

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const handleTitleChange = handleChange(setTitle, setTitleError)

  const [body, setBody] = useState('')
  const [bodyError, setBodyError] = useState(false)
  const handleBodyChange = handleChange(setBody, setBodyError)

  const [author, setAuthor] = useState('')
  const [authorError, setAuthorError] = useState(false)
  const handleAuthorChange = handleChange(setAuthor, setAuthorError)

  const { categories, initialDropdown, areCategoriesReady } = props

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

      const post = {
        id: uniqid(),
        timestamp: Date.now(),
        title: title,
        body: body,
        author: author,
        category: dropdown,
      }

      ReadableAPI.addPost(post)
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
    }
  }
  
  return (
    <Container maxWidth="lg" >
      <Grid container justify="center">
        {areCategoriesReady
          ? <form className={classes.root} noValidate autoComplete="off">
              <Grid container alignItems="center">
                <ArrowBackIosIcon />
                <Button component={Link} to={`/${initialDropdown}`}>Post List</Button>
              </Grid>
              <Typography variant="h5" align="right" className={classes.title}>ADD POST</Typography>
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
              <TextField 
                fullWidth
                error={authorError}
                required 
                label="Author"
                onBlur={() => handleBlur(author, setAuthorError)} 
                value={author}
                onChange={handleAuthorChange}
                helperText={authorError ? 'Cannot be blank!' : ''} 
              />
              <FormControl 
                className={classes.formControl} 
                error={dropdownError}
                required
                fullWidth
              >
                <InputLabel shrink id="create-dropdown">
                  Category
                </InputLabel>
                <Select 
                  labelId="create-dropdown"
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
              <Button 
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                className={classes.button}
                disabled={isButtonDisabled}
                color="primary"
              >
                Submit
              </Button>
            </form>
          : <Typography variant="h4">Loading...</Typography>
        }
      </Grid>
    </Container>
  )
}

const mapStatesToProps = ({ categories, appStatus }, { location }) => {
  let initialDropdown = ''
  if (location.search !== '') {
    const query = new URLSearchParams(location.search)
    initialDropdown = query.get('category')
  }

  return { 
    initialDropdown,
    categories: categories.map(category => category.name),
    areCategoriesReady: appStatus.areCategoriesReady
  }
}

export default withRouter(connect(mapStatesToProps)(CreatePost)) 
