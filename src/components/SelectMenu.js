import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { capitalizedString } from '../utils/helper';
import { switchCategory } from '../actions/appStatus';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const getCategories = categories => [{name: 'all', path: ''}, ...categories]

function SelectMenu(props) {
  const classes = useStyles();

  const { selectType, categories, currentCategory, switchCategory } = props
  const selections = selectType === 'categories' 
    ? getCategories(categories) 
    : []

  const handleChange = (event) => {
    switchCategory(event.target.value)
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Category</InputLabel>
      <Select
        value={currentCategory}
        onChange={handleChange}
      >
        {selections.map((selection, index) => 
          <MenuItem 
            value={selection.name} 
            key={selection.name} 
            component={Link} 
            to={`/${selection.path}`}
          >
            {selectType === 'categories' && index === 0
              ? <em>{capitalizedString(selection.name)}</em>
              : capitalizedString(selection.name)}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

const mapStatesToProps = ({ categories, appStatus }) => ({ 
  categories,
  currentCategory: appStatus.currentCategory
 })

export default connect(mapStatesToProps, { switchCategory })(SelectMenu)
