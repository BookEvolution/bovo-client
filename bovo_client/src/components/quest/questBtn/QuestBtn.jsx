import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import styles from './QuestBtn.module.css';
import { QuestButtonStyle } from '../../../constant/QuestBtnStyle';

// 버튼 스타일을 결정하는 헬퍼 함수
const getButtonStyle = (isCompleted, currentCount) => {
    if (isCompleted && currentCount >= 7) return QuestButtonStyle.completeBtn;
    if (!isCompleted && currentCount >= 7) return QuestButtonStyle.confirmBtn;
    return QuestButtonStyle.notAcquiredBtn;
};

const QuestBtn = ({ isCompleted, currentCount, onClick }) => {
    // 버튼 스타일과 텍스트 추출
    const { btnSx, btnText, isNotConfirm } = getButtonStyle(isCompleted, currentCount);

    const handleClick = () => {
        if (isNotConfirm) {
            onClick(); // onClick이 설정되어 있을 경우 호출
        }
    };

    return (
        <Button
            className={styles.questBtn}
            onClick={handleClick}
            sx={{
                borderRadius: "0.625rem",
                fontSize: "1.25rem",
                ...btnSx,
            }}
            disabled={!isNotConfirm}
        >
            {btnText}
        </Button>
    );
};

QuestBtn.propTypes = {
    isCompleted: PropTypes.bool.isRequired,
    currentCount: PropTypes.number.isRequired,
    onClick: PropTypes.func,
};

export default QuestBtn;