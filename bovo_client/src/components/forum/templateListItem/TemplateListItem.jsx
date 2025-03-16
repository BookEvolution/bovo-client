import PropTypes from "prop-types";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./TemplateListItem.module.css";
import { memo } from "react";

const TemplateListItem = ({ checked, handleCheckboxChange, memo }) => {
    return (
        <Accordion className={styles.templateListItem}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />} // 화살표 아이콘
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: "2rem" }} />}
                    checkedIcon={<CheckBoxIcon sx={{ fontSize: "2rem", color: "#739CD4" }} />}
                />
                <Typography
                    sx={{
                        fontSize: "1.75rem",
                        letterSpacing: "0.0175rem",
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
    );
};

export default memo(TemplateListItem);

TemplateListItem.propTypes = {
    checked: PropTypes.bool.isRequired, // checked은 boolean 타입이고 필수 props
    handleCheckboxChange: PropTypes.func.isRequired, // handleCheckboxChange는 함수 타입이고 필수 props
    memo: PropTypes.object.isRequired,  // memo는 객체 타입으로 변경
};