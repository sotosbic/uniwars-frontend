import React, { Component } from 'react'
import PropTypes from 'prop-types'

//MUI Stuff

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


export class UniSide extends Component {


    render() {
        const { uni : { uniName, score}}= this.props;
        return (
            <TableRow>
                <TableCell component="th" scope="row">
                    {uniName}
                </TableCell>
                <TableCell align="right">{score}</TableCell>
            </TableRow>
        )
    }
}

UniSide.propTypes = {
    uni: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}



export default (UniSide);

