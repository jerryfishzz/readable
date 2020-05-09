import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SelectMenu(props) {
  const classes = useStyles();
  const [choice, setChoice] = React.useState('all');

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Category</InputLabel>
      <Select
        value={choice}
        onChange={handleChange}
      >
        <MenuItem value="all" component={Link} to="/">
          <em>All</em>
        </MenuItem>
        <MenuItem value="react" component={Link} to="/react">React</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectMenu
