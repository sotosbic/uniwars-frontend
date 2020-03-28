import React from 'react'
import PropTypes from 'prop-types'
import NoImgProfile from '../media/no-img-profile.png'

//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'

//Icons
import SchoolIcon from '@material-ui/icons/School'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import { classes } from 'istanbul-lib-coverage'

const styles = (theme) => ({
    ...theme.spreadIt,
    handle: {
        height:20,
        backgroundColor: theme.palette.primary.main,
        width:60,
        margin: '0 auto 7px auto'
    },
    fullLine: {
        height:15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10
    },
    halfLine: {
        height:15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10
    },
    imageWrapper: {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
    },
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    }
})

const ProfileSkeleton = (props) => {

    const { styles } = props;

    return (
       <Paper className={classes.paper}>
           <div className={classes.profile}>
               <div className={classes.imageWrapper}>
                   <img src={NoImgProfile} alt="profile" className={classes.profileImage}/>
               </div>
               <hr/>
               <div className="profile-details">
                   <div className={classes.handle}/>
                   <hr/>
                   <div className={classes.fullLine}/>
                   <div className={classes.fullLine}/>
                   <hr/>
                   <SchoolIcon color="primary"/><span> Univeristy</span>
                   <hr/>
                   <LinkIcon color="primary"/> https://website.com/
                   <hr/> 
                   <CalendarToday color="primary"/> Joined date
               </div>
           </div>
       </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
