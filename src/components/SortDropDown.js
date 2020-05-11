import React from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { capitalizedString } from '../utils/helper';
import { switchSort } from '../actions/appStatus';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SortDropDown(props) {
  const classes = useStyles();

  const { currentSort, switchSort } = props
  const selections = ['default', 'date', 'score']

  const handleChange = (event) => {
    switchSort(event.target.value)
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Sort by</InputLabel>
      <Select
        value={currentSort}
        onChange={handleChange}
      >
        {selections.map((selection, index) => 
          <MenuItem 
            value={selection} 
            key={selection} 
          >
            {index === 0
              ? <em>{capitalizedString(selection)}</em>
              : capitalizedString(selection)}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

const mapStatesToProps = ({ appStatus }) => ({ 
  currentSort: appStatus.currentSort
})

export default connect(mapStatesToProps, { switchSort })(SortDropDown)
