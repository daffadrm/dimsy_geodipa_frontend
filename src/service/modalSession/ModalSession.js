import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './ModalSession.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ModalSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogState: true
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        console.log("props", this.props);
    }

    logOut() {
        this.setState({ dialogState: false }, () => {
            localStorage.removeItem("persist:geo-dipa-energi-persero")
            window.location.replace(window.location.origin + "/logout");
        });
    }

    render() {
        const { dialogState } = this.state;
        return (
            <Dialog
                open={dialogState}
                keepMounted
                // onClose={this.handleOk.bind(this)}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.data?.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    {this.props.data?.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={this.logOut} className="btn btn-sm btn-danger">
                    {this.props.data?.button}
                    </button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ModalSession;