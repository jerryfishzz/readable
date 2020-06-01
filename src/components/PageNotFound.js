import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { 
  makeStyles,
  Typography,
  Container,
  Grid,
  IconButton
} from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
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
  description: {
    width: '100%'
  }
}));

function PageNotFound(props) {
  const classes = useStyles();

  useEffect(() => {
    props.hideLoadingBar()
  })

  return (
    <Container maxWidth="lg" >
      <Grid container justify="center">
        <Grid item container direction="row" className={classes.root}>
          <Grid item container alignItems="center">
            <IconButton component={Link} to="/">
              <NavigateBeforeIcon />
            </IconButton>
            <Typography className={classes.margin} variant="button">Back to Post List</Typography>
          </Grid>
          <Typography variant="body1" align="center" className={classes.description}>
            404 Page not found.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default connect(null, { hideLoadingBar })(PageNotFound)
