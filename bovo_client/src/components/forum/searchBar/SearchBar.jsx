import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value); // 입력값을 부모로 보내기만 함
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          onSearch(searchValue); // 검색어 넘김
        }
    };

    return (
        <>
            <TextField
                variant="standard" // 외부 border를 제거하는 방법
                placeholder="토론방 검색"
                value={searchValue} // 입력 값 상태 바인딩
                onChange={handleChange} // 입력값 업데이트
                onBlur={() => onSearch(searchValue)} // 블러 시 검색 처리
                onKeyDown={handleKeyDown}
                sx={{ 
                        width: '39.5rem',
                        backgroundColor: "#E8F1F6",
                        borderRadius: "1.5625rem",
                        border: "none",
                        padding: "0.5rem 1.25rem",
                        margin: "1.8125rem 0",
                        "& .MuiInputBase-input": {
                            width: "35.5rem",
                            fontSize: "1.75rem",  // 입력창 글자 크기 변경
                        }    
                    }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{fontSize: "2.5rem", color: "#739CD4", margin: "0 0.75rem"}}/>
                        </InputAdornment>
                    ),
                    // input 요소의 스타일을 이곳에서 조정
                    disableUnderline: true, // underline 제거
                }}
            />
        </>
    );
};

// 여기 추가!
SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;