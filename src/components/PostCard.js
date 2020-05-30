import React from 'react'
import { 
  makeStyles, 
  Typography,
  Grid,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  generalMargin: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  sidePadding: {
    '& > *': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    }
  },
  title: {
    fontWeight: 700
  },
  paper: {
    width: '100%',
    padding: theme.spacing(1),
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const { post } = props

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.generalMargin}>
        <Grid item container className={classes.sidePadding}>
          <Typography variant="h5" align="left">{post.title}</Typography>
        </Grid>
        <Grid item container alignItems="center">
          <Grid item container xs alignItems="center" className={classes.sidePadding}>
            <Typography variant="subtitle1" className={classes.title}>Author</Typography>
            <Typography variant="body1">{post.author}</Typography>
          </Grid>
          <Grid item container xs alignItems="center" className={classes.sidePadding}>
            <Typography variant="subtitle1" className={classes.title}>Category</Typography>
            <Typography variant="body1">{post.category}</Typography>
          </Grid>
        </Grid>
        <Grid item container className={classes.sidePadding}>
          <Typography variant="body1" align="left">{post.body}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostCard
