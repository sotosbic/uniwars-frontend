import React, { Component } from 'react';
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';
import PostSkeleton from '../util/PostSkeleton'
import UniSide from '../components/uni/UniSide'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';

// Redux Stuff
import { connect } from 'react-redux'
import { getPosts, getUnis } from '../redux/actions/dataActions'

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.spreadIt,
    uniside:{
        marginTop: 20
    }
});

class home extends Component {
    state = {
        posts: null,
        unis: null
    }
    componentDidMount(){
        this.props.getPosts();

        const date = localStorage.getItem('universitiesDate');
        const uniDate = date && new Date(parseInt(date));
        const now = new Date();
        const dataAge = Math.round((now - uniDate) / (1000 * 60)); // in minutes
        const tooOld = dataAge >= 60;
        if(tooOld){
            this.props.getUnis()      
        } else {
            console.log('local storage data')
        }

        if (localStorage.getItem('topUniversities')){
            this.setState ={
                unis: JSON.parse(localStorage.getItem('topUniversities'))
            } 
        }
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        if(prevState.unis !== this.state.unis){
            localStorage.setItem('topUniversities', JSON.stringify(this.props.data.unis))
            localStorage.setItem('universitiesDate', Date.now())  
        }
    }
    
   /*  componentWillMount(){
        localStorage.getItem('topUniversities') && this.setState({
            unis: JSON.parse(localStorage.getItem('topUniversities'))
        })
    }  */

    

  
    render() {
     
        const { unis, posts, loading } = this.props.data;
        const {classes} = this.props
        let recentPostsMarkup = !loading ? (
           posts.map((post) => <Post key={post.postId} post={post}/>)
        ) : (
            <PostSkeleton/>
        );
        
            
        let uniSideScore = unis ? (
           unis.slice(0, 5).map((uni) => <UniSide key={uni.uniId} uni={uni}/>)
        ) : (
            <PostSkeleton/>
        );
              
        return (
           <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                    <Paper className={classes.uniside}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan="2"><Typography variant="h6">Top Universities</Typography></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>University</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {uniSideScore}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getUnis: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
    
};

const mapActionsToProps = { getPosts, getUnis };

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
