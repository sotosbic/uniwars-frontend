import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import NoImg from '../media/no-img.png';

//MUI Stuff
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
    ...theme.spreadIt,
    card:{
        position: 'relative',
        display: 'block',
        marginBottom: 20,
        maxWidth:600
    },
    cardContent:{
        width: '100%',
        flexDirection:'column',
        padding: 15
    },
    cover:{
        minWidth:200,
        minHeight: 580
    },
    handle:{
        width:50,
        height: 18,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date:{
        height:14,
        width: 80,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10
    },
    title:{
        height: 31,
        width: '70%',
        padding:16
    },
    halfLine:{
        height: 15,
        width: '50%',
        marginBottom:10,
        backgroundColor: 'rgba(0,0,0,0.6)'
    }
})

const PostSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardHeader className={classes.title} title="Loading battle"/>
            <CardMedia component="img" className={classes.cover} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.halfLine}/>               
            </CardContent>

        </Card>
    ))

    return <Fragment> {content} </Fragment>
}

PostSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostSkeleton);
