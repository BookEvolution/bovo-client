import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./TemplateListItem.module.css";
import { memo, useState } from "react";

const TemplateListItem = ({ checked, handleCheckboxChange, memo }) => {
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        // Accordion이 열리거나 닫히는 동작을 제어
        setExpanded(isExpanded);
    };

    const handleCheckboxChangeWithPrevent = (e) => {
        e.stopPropagation(); // 클릭 이벤트가 Accordion에 전달되지 않도록 막기
        handleCheckboxChange(e.target.checked); // **체크박스 상태 변경** (변경된 부분)
    };

    const handleAccordionSummaryClick = (e) => {
        // 클릭 이벤트가 AccordionSummary에만 전파되도록
        e.stopPropagation(); 
    };

    return (
        <Box 
            className={styles.templateListItem}
            sx={{
                backgroundColor: checked ? "#739CD4" : "#FFFFFF", // 체크된 상태에 따라 배경색 변경
                transition: "background-color 0.3s ease", // 부드러운 배경색 변경 효과
            }}
        >
            <Accordion expanded={expanded} onChange={handleAccordionChange("panel1")}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.625rem" }} />} // 화살표 아이콘
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={handleAccordionSummaryClick} // 화살표 클릭 시만 열림/닫힘
                >
                    <Checkbox
                        checked={checked}
                        onChange={handleCheckboxChangeWithPrevent}
                        icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: "2rem" }} />}
                        checkedIcon={<CheckBoxIcon sx={{ fontSize: "2rem", color: "#739CD4" }} />}
                    />
                    <Typography
                        sx={{
                            fontSize: "1.75rem",
                            letterSpacing: "0.0175rem",
                            width: "27rem", // 너비 고정
                            height: "2.5rem", // 높이 고정
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis", // 넘칠 경우 '...' 표시
                        }}
                    >
                        {memo.memo_Q} {/* 질문 표시 */}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        sx={{
                        fontSize: "1.5rem",
                            letterSpacing: "0.0175rem",
                            color: "#739CD4",
                        }}
                    >
                        {memo.memo_A} {/* 답변 표시 */}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default memo(TemplateListItem);

TemplateListItem.propTypes = {
    checked: PropTypes.bool.isRequired, // checked은 boolean 타입이고 필수 props
    handleCheckboxChange: PropTypes.func.isRequired, // handleCheckboxChange는 함수 타입이고 필수 props
    memo: PropTypes.object.isRequired,  // memo는 객체 타입으로 변경
};