import React from 'react'
import { 
  makeStyles, 
  Typography,
  Grid,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
  padding: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  title: {
    fontWeight: 700
  },
  flexExtend: {
    flex: 1
  }
}));

function PostCard(props) {
  const classes = useStyles();
  const { post, setIsEditable } = props

  const handleEdit = () => setIsEditable(true)

  return (
    <Grid container className={classes.generalMargin}>
      <Grid item container alignItems="center">
        <Typography 
          variant="h5" 
          align="left" 
          className={`${classes.flexExtend} ${classes.padding}`}
        >
          {post.title}
        </Typography>
        <IconButton color="primary" disabled={false} onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton color="secondary"><DeleteIcon /></IconButton>
      </Grid>
      <Grid item container alignItems="center">
        <Grid 
          item 
          container 
          xs 
          alignItems="center" 
          className={classes.sidePadding}
        >
          <Typography variant="subtitle1" className={classes.title}>
            Author
          </Typography>
          <Typography variant="body1">{post.author}</Typography>
        </Grid>
        <Grid 
          item 
          container 
          xs 
          alignItems="center" 
          className={classes.sidePadding}
        >
          <Typography variant="subtitle1" className={classes.title}>
            Category
          </Typography>
          <Typography variant="body1">{post.category}</Typography>
        </Grid>
      </Grid>
      <Grid item container className={classes.sidePadding}>
        <Typography variant="body1" align="left">{post.body}</Typography>
      </Grid>
    </Grid>
  )
}

export default PostCard
