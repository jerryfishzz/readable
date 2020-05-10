import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { capitalizedString } from '../utils/helper';

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

  const { selectType, categories } = props
  const choices = selectType === 'categories' 
    ? getCategories(categories) 
    : []

  const [choice, setChoice] = React.useState(choices[0]);

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
        {choices.map((choice, index) => 
          <MenuItem 
            value={choice.name} 
            key={choice.name} 
            component={Link} 
            to={`/${choice.path}`}
          >
            {selectType === 'categories' && index === 0
              ? <em>{capitalizedString(choice.name)}</em>
              : capitalizedString(choice.name)}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

const mapStatesToProps = ({ categories }) => ({ categories })

export default connect(mapStatesToProps)(SelectMenu)
