import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import DeletePost from './DeletePost'
import PostDialog from './PostDialog'
import LikeButton from './LikeButton'

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//Icons
import ChatIcon from '@material-ui/icons/Chat'

//Redux Stuff
import { connect } from 'react-redux'

const styles = {
    card: {
        position: 'relative',
        display: 'block',
        marginBottom: 20,
        maxWidth:600
    },
    image:{
        maxWidth:600
    },
    content:{
        padding: 15
    }
}

class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, post : { imgUrl, createdAt, userHandle, title, postId, likeCount, commentCount, uniName}, user:{ authenticated, credentials: { handle } } }= this.props;
        
        const deleteButton = authenticated && userHandle === handle ?(
            <DeletePost postId={postId}/>
        ) : null
        return (
            <Card className={classes.card}>
                    <CardHeader title={title} subheader={deleteButton}/>
                    <CardMedia component="img" image = { imgUrl } className={classes.image}/>
                    <CardContent className={classes.content}>
                        <Typography variant="body1" >{uniName}</Typography>
                        <Typography variant="body2" color="Primary" component={Link} to={`/users/${userHandle}`}>{userHandle}</Typography>                        
                        <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                        <LikeButton postId={postId}/>
                        <span>{likeCount} likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary"/>
                        </MyButton>
                        <span>{commentCount} comments</span>
                        <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                    </CardContent>
            </Card>
        )
    }
}

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Post));
