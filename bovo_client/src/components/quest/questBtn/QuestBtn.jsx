import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import styles from './QuestBtn.module.css';

const QuestBtn = ({ isCompleted, currentCount, onClick }) => {
    let backgroundColor, color, text;

    if (isCompleted && currentCount === 7) {
        backgroundColor = "#FFFFFF";
        color = "#739CD4";
        text = "퀘스트 달성";
    } else if (!isCompleted && currentCount === 7) {
        backgroundColor = "#739CD4";
        color = "#FFFFFF";
        text = "확인";
    } else if (!isCompleted && currentCount !== 7) {
        backgroundColor = "#E8F1F6";
        color = "#8D90A0";
        text = "미획득";
    }

    return (
        <Button
            className={styles.questBtn}
            onClick={onClick}
            sx={{
                borderRadius: "0.625rem",
                backgroundColor: backgroundColor,
                color: color,
                fontSize: "1.25rem",
            }}
        >
            {text}
        </Button>
    );
};

QuestBtn.propTypes = {
    isCompleted: PropTypes.bool.isRequired,
    currentCount: PropTypes.number.isRequired,
    onClick: PropTypes.func,
};

export default QuestBtn;