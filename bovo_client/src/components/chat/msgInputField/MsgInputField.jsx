import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@mui/material/TextField';

const MsgInputField = React.memo(function MsgInputField ({ value, onChange }) {
    console.log('MessageInputField rendered'); // 리렌더링 확인용

    return (
        <TextField
            fullWidth
            variant="outlined"
            type="text"
            sx={{
                backgroundColor: "#E8F1F6",
                flexGrow: 1, // 남은 공간을 채우도록 설정
                height: "4rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1.5625rem",
                "& input": {
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    height: "2.5rem",
                    padding: "1rem",
                },
                "& fieldset": { border: "none" },
            }}
            value={value}
            onChange={onChange}
        />
    );
});

// PropTypes 정의
MsgInputField.propTypes = {
    value: PropTypes.string.isRequired, // value는 필수 문자열
    onChange: PropTypes.func.isRequired, // onChange는 필수 함수
};

export default MsgInputField;