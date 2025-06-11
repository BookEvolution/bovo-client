import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const MemoCheckbox = ({ checked, onChange }) => {
    // 이 컴포넌트에서 모든 체크박스 관련 이벤트 처리를 담당
    const handleClick = (e) => {
        // ✅ 핵심: 체크박스 자체의 클릭 이벤트만 처리하고,
        // 이 이벤트가 AccordionSummary로 버블링되지 않도록 여기서 명확하게 막습니다.
        // 이렇게 하면 상위 컴포넌트(TemplateListItem)의 AccordionSummary는
        // 체크박스 클릭에 대해 아무것도 알지 못하게 됩니다.
        e.stopPropagation(); 
    };

    const handleChange = (e) => {
        // 체크박스의 onChange 이벤트는 여기서 최종적으로 처리
        // 부모에게 변경된 checked 상태만 전달
        onChange(e.target.checked);
    };

    return (
        <Checkbox
            checked={checked}
            onClick={handleClick} // 클릭 이벤트 버블링 방지
            onChange={handleChange} // 실제 체크 상태 변경 처리
            icon={<CheckBoxOutlineBlankIcon sx={{ fontSize: "2rem" }} />}
            checkedIcon={<CheckBoxIcon sx={{ fontSize: "2rem", color: "#739CD4" }} />}
        />
    );
};

MemoCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default MemoCheckbox;