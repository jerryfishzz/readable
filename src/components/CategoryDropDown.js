import React from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { capitalizedString } from '../utils/helper';
import { handleGetCategories } from '../actions/categories';
import { loadingPosts, loadingCategories, getCategoriesReady } from '../actions/appStatus';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CategoryDropDown(props) {
  const classes = useStyles();

  const { categories, path, loadingPosts, loadingCategories, getCategoriesReady } = props
  const selections = [{name: 'all', path: ''}, ...categories]

  const handleChange = e => {
    loadingPosts()

    if (e.target.value === 'all') {
      loadingCategories()
      props.handleGetCategories()
        .then(() => getCategoriesReady())
        .catch(err => alert(err))
    }
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Category</InputLabel>
      <Select 
        value={path}
        onChange={handleChange}
      >
        {selections.map((selection, index) => 
          <MenuItem 
            value={selection.name} 
            key={selection.name} 
            component={Link} 
            to={`/${selection.path}`}
          >
            {index === 0
              ? <em>{capitalizedString(selection.name)}</em>
              : capitalizedString(selection.name)}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

const mapStatesToProps = ({ categories }, props) => {
  let pathName = props.location.pathname
  let path = pathName.slice(1) ? pathName.slice(1) : 'all'

  return { 
    path,
    categories,
  }
}

export default withRouter(
  connect(
    mapStatesToProps, 
    {  
      handleGetCategories, 
      loadingPosts,
      loadingCategories,
      getCategoriesReady
    }
  )(CategoryDropDown)
)
