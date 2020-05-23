import React, { useState } from 'react'
import { connect } from 'react-redux';
import { 
  makeStyles, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
  Button
} from '@material-ui/core';

import { capitalizedString } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

  const { categories } = props

  const [dropdown, setDropdown] = useState('')
  const [dropdownError, setDropdownError] = useState(false)
  const handleDropdownChange = handleChange(setDropdown, setDropdownError)

  const validateForm = () => {
    const validateTitle = validateInput(title, setTitleError)
    const validateBody = validateInput(body, setBodyError)
    const validateAuthor = validateInput(author, setAuthorError)
    const validateDropdown = validateInput(dropdown, setDropdownError)

    return validateTitle && validateBody && validateAuthor && validateDropdown
  }
  
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
        variant="contained"
        onClick={validateForm}
      >
        Submit
      </Button>
    </form>
  )
}

const mapStatesToProps = ({ categories }) => {
  return { 
    categories: categories.map(category => category.name)
  }
}

export default connect(mapStatesToProps)(CreatePost)
