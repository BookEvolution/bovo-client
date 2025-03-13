import PropTypes from "prop-types";
import { Checkbox, ListItem, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import styles from "./TemplateListItem.module.css";
import { memo } from "react";

const TemplateListItem = ({ checked, handleCheckboxChange }) => {
    return (
        <ListItem 
            disablePadding
            className={styles.templateListItem}
            sx={{
                display: "flex",  // ✅ flex 컨테이너 적용
                justifyContent: "space-between",  // ✅ 요소 사이 간격 동일하게
                alignItems: "center",
                border: checked ? "2px solid #739CD4" : "none", // 체크 여부에 따라 border 색상 변경
            }}
        >
            <Typography
                sx={{
                    width: "6.25rem",
                    height: "3rem",
                    borderRadius: "3.125rem",
                    backgroundColor: "aliceblue",
                    fontSize: "1.5rem",
                    letterSpacing: "0.015rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                공통
            </Typography>
            <Typography
                sx={{
                    maxWidth: "20.625rem",
                    maxHeight: "2.5rem",
                    fontSize: "1.75rem",
                    letterSpacing: "0.0175rem"
                }}
            >
                책 읽은 계기가 무엇인가요?
            </Typography>
            <Checkbox
                checked={checked}
                onChange={handleCheckboxChange} // 체크박스 상태 변경 핸들러
                icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: "2rem" }} />} // ✅ 기본 체크박스 크기
                checkedIcon={<CheckBoxIcon sx={{ fontSize: "2rem", color: "#739CD4" }} />} // ✅ 체크된 상태 크기
                sx={{
                    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                    "&.Mui-checked": {
                        transform: "scale(1.2)",
                        opacity: 1,
                    },
                    "&.Mui-unchecked": {
                        transform: "scale(1)",
                        opacity: 0.7,
                    },
                }}
            />
        </ListItem>
    );
};

export default memo(TemplateListItem);

TemplateListItem.propTypes = {
    checked: PropTypes.bool.isRequired, // checked은 boolean 타입이고 필수 props
    handleCheckboxChange: PropTypes.func.isRequired, // handleCheckboxChange는 함수 타입이고 필수 props
};