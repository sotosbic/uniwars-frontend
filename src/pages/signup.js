import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import AppIcon from '../media/logo.png'
import { Link } from 'react-router-dom'

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//Redux Stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
import { getUnis } from '../redux/actions/dataActions'
import { thisExpression } from '@babel/types';


const styles = (theme) => ({
    ...theme.spreadIt
});


class signup extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            confimPassword:'',
            handle:'',
            uniId:'',
            errors: {},
            unis: null
        }
    };

    componentDidMount(){
        this.props.getUnis();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading:true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
            uniId: this.state.uniId
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    render() {
        const { unis } = this.props.data;
        const { classes, UI: {loading} } = this.props
        const {errors} = this.state;   
        return (
            <Grid container className= {classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="logo" className={classes.img}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="handle" name="handle" label="Username" type="text" className={classes.textField}
                        value={this.state.handle} onChange={this.handleChange} helperText={errors.handle} error={errors.handle ? true : false } fullWidth/>
                    <TextField id="email" name="email" label="Email" type="email" className={classes.textField}
                        value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true : false } fullWidth/> 
                    <TextField id="password" name="password" label="password" type="Password" className={classes.textField}
                        value={this.state.password} onChange={this.handleChange} helperText={errors.password} error={errors.password ? true : false } fullWidth/>
                    <TextField id="confirmPassword" name="confirmPassword" label="Confirm Password" type="Password" className={classes.textField}
                        value={this.state.confirmPassword} onChange={this.handleChange} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false } fullWidth/>
                    <FormControl className={classes.formControl} fullWidth>
                        <Select id="uniId" name="uniId" label="Select a University" value={this.state.handle}  
                            onChange={this.handleChange} className={classes.textField} helperText={errors.selectUni} 
                            error={errors.selectUni ? true : false } fullWidth>
                            <MenuItem value="" disabled>Select a University</MenuItem>
                            {unis.map((uni) => <MenuItem value={uni.uniId}>{uni.uniName}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>Signup
                        {loading && (
                            <CircularProgress size={ 30 } className={classes.progress}/>
                        )}
                    </Button> <br/>
                    <small>Already have an account? Login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    getUnis: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapActionsToProps = { signupUser, getUnis };

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
    data: state.data
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));
