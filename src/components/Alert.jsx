import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = ({ alerts }) => {
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    useEffect(() => {
        if (alerts) {
            if (alerts.alertType === 'success') {
                setAlertMessage(alerts.msg);
                setAlertSeverity('success');
                setOpen(true);
            }
            if (alerts.alertType === 'danger') {
                setAlertMessage(alerts.msg);
                setAlertSeverity('error');
                setOpen(true);
            }
            if (alerts.alertType === 'warning') {
                setAlertMessage(alerts.msg);
                setAlertSeverity('warning');
                setOpen(true);
            }
        }
    }, [alerts]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
                {alertMessage}
            </MuiAlert>
        </Snackbar>
    );
}

const mapStateToProps = (state) => ({ alerts: state.alert });
export default connect(mapStateToProps)(Alert);