import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const NoteShareBtn = React.memo(function NoteShareBtn({ onClick }) {
    console.log('NoteShareBtn rendered');

    return (
        <IconButton
            onClick={onClick}
            sx={{ 
                '&.MuiIconButton-root': {
                    width: "3.5rem",
                    height: "3.5rem",
                },
            }}
        >
            <AddCircleIcon sx={{ fontSize: "3.5rem", color: "#739CD4" }} />
        </IconButton>
    );
});

// PropTypes 정의
NoteShareBtn.propTypes = {
    onClick: PropTypes.func.isRequired, // onClick은 필수 함수
};

export default NoteShareBtn;