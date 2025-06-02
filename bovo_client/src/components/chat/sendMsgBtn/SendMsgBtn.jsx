import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const SendMsgBtn = React.memo(function SendMsgBtn({ onClick }) {
    console.log('SendMsgBtn rendered');

    return (
        <IconButton
            onClick={onClick}
            sx={{
                '&.MuiIconButton-root': {
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "3.125rem",
                    backgroundColor: "#739CD4",
                },
            }}
        >
            <ArrowUpwardIcon sx={{ fontSize: "2rem", color: "#FFFFFF", fontWeight: "bold" }} />
        </IconButton>
    );
});

// PropTypes 정의
SendMsgBtn.propTypes = {
    onClick: PropTypes.func.isRequired, // onClick은 필수 함수
};

export default SendMsgBtn;