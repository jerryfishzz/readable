import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { 
  makeStyles,
  Typography,
  Container,
  Grid,
  IconButton
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import PostForm from './PostForm';
import { hideLoadingBar } from '../actions/appStatus';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    paddingTop: theme.spacing(2),

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margin: {
    marginLeft: theme.spacing(1)
  },
}));


function CreatePost(props) {
  const classes = useStyles();
  const { initialDropdown, hideLoadingBar } = props

  useEffect(() => {
    hideLoadingBar()
  })
  
  return (
    <Container maxWidth="lg" >
      <Grid container justify="center">
        <Grid item container direction="row" className={classes.root}>
          <Grid item container alignItems="center">
            <IconButton component={Link} to={`/${initialDropdown}`}>
              <NavigateBeforeIcon />
            </IconButton>
            <Typography className={classes.margin} variant="button">Back to Post List</Typography>
          </Grid>
          <PostForm />
        </Grid>
      </Grid>
    </Container>
  )
}

const mapStatesToProps = (state, { location }) => {
  let initialDropdown = ''
  if (location.search !== '') {
    const query = new URLSearchParams(location.search)
    initialDropdown = query.get('category')
  }

  return { 
    initialDropdown,
  }
}

export default withRouter(connect(mapStatesToProps, { hideLoadingBar })(CreatePost)) 
