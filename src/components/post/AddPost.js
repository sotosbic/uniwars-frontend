import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'

//MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'

//Icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'


//Redux Stuff
import { connect } from 'react-redux'
import { addPost, clearErrors } from '../../redux/actions/dataActions'

const styles = theme => ({
    ...theme.spreadIt,
    submitButton:{
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner:{
        prosition: 'absolute'
    },
    closeButton:{
        position: 'absolute',
        left: '90%',
        top: '4%'
    }
});

class AddPost extends Component {
    state = {
        open: false,
        imgUrl: '',
        title:'',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({imgUrl:'', title:'', open: false, errors: {} });
        };
    };
    handleOpen = () => {
        this.setState({open: true})
    };
    handleClose = () => {
        this.props.clearErrors()
        this.setState({open: false, errors: {}})
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPost({imgUrl: this.state.imgUrl,title: this.state.title})
    };
    render(){
        const {errors} = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Add a post!">
                    <AddIcon color="primary"/>
                </MyButton>
                
                
                
                <Dialog open={this.state.open} close={this.handleClose} fullWidth maxWidth="sm" onBackdropClick={this.handleClose}>
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    
                    <DialogTitle>Add a new post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField 
                                name="title" 
                                type="text" 
                                label="Title" 
                                placeholder="Add a title" 
                                error={errors.body ? true : false} 
                                helperText={errors.body} 
                                className={classes.TextField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                            <TextField 
                                name="imgUrl" 
                                type="text" 
                                label="Post" 
                                placeholder="Add a post" 
                                error={errors.body ? true : false} 
                                helperText={errors.body} 
                                className={classes.TextField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});


export default connect(mapStateToProps, {addPost, clearErrors})(withStyles(styles)(AddPost));