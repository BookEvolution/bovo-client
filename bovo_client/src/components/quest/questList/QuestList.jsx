import PropTypes from 'prop-types';
import { Box, LinearProgress, Typography } from "@mui/material";
import styles from './QuestList.module.css';
import QuestBtn from '../questBtn/QuestBtn';
import { increaseExp } from '../../../api/RewardService';

const QuestList = ({ quest }) => {
    // 미션 제목 반환
    const getMissionTitle = (missionId) => {
        switch (missionId) {
            case 1:
                return "출석";
            case 2:
                return "커뮤니티 참여";
            case 3:
                return "책 등록";
            default:
                return "독서 기록";
        }
    };

    // 미션별 cnt 값 반환
    const getMissionCount = (quest) => {
        switch (quest.mission_id) {
            case 1:
                return quest.login_cnt;
            case 2:
                return quest.community_cnt;
            case 3:
                return quest.book_reg_cnt;
            case 4:
                return quest.note_cnt;
            default:
                return 0;
        }
    };

    // 미션 완료 여부 반환
    const isMissionCompleted = (quest) => {
        switch (quest.mission_id) {
            case 1:
                return quest.is_login_completed;
            case 2:
                return quest.is_community_completed;
            case 3:
                return quest.is_book_reg_completed;
            case 4:
                return quest.is_note_completed;
            default:
                return false;
        }
    };

    const currentCount = getMissionCount(quest);
    const isCompleted = isMissionCompleted(quest);
    const progress = isCompleted ? 100 : (currentCount / 7) * 100; // 7회 기준 진행률 계산

    // 확인 버튼 클릭 시 데이터 요청
    const handleQuestButtonClick = async () => {
        if (!isCompleted && currentCount === 7) {
            try {
                const response = await increaseExp(quest.mission_id); // mission_id 전송
                console.log('성공적으로 경험치 증가:', response);
                // 성공 시 추가 처리 (예: 사용자에게 알림, UI 업데이트 등)
            } catch (error) {
                console.error('경험치 증가 실패:', error);
                // 실패 시 알림 처리 등
            }
        }
    };

    return (
        <Box className={styles.questWrapper}>
            <Box className={styles.questTitle}>
                <Typography 
                    sx={{fontSize: "1.75rem", display: "flex", alignItems: "center"}} 
                    fontWeight="bold"
                >
                    {getMissionTitle(quest.mission_id)} &nbsp;
                </Typography>
                <Typography
                    sx={{
                        fontSize: "1.75rem", 
                        display: "flex", 
                        alignItems: "center", 
                        color: "#739CD4"
                    }} 
                    fontWeight="bold"
                >
                    7
                </Typography>
                <Typography
                    sx={{fontSize: "1.75rem", display: "flex", alignItems: "center"}} 
                    fontWeight="bold"
                >
                    회
                </Typography>
            </Box>
            <Box>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        width: "100%",
                        height: "1.25rem",
                        borderRadius: "6.25rem",
                        backgroundColor: "#E8F1F6",
                        "& .MuiLinearProgress-bar": {
                            borderRadius: "6.25rem",
                            background: "#739CD4",
                        },
                    }}
                />
            </Box>
            <Box className={styles.questCount}>
                <Typography sx={{fontSize: "1.25rem", color: "#739CD4"}}>
                    {currentCount}회&nbsp;
                </Typography>
                <Typography sx={{fontSize: "1.25rem"}}>
                    / 7회
                </Typography>
            </Box>
            <QuestBtn 
                isCompleted={isCompleted} 
                currentCount={currentCount}
                onClick={handleQuestButtonClick} // 클릭 시 데이터 요청 
            />
        </Box>
    );
};

export default QuestList;

// ✅ propTypes 설정
QuestList.propTypes = {
    quest: PropTypes.shape({
        mission_id: PropTypes.number.isRequired,
        login_cnt: PropTypes.number,
        is_login_completed: PropTypes.bool,
        community_cnt: PropTypes.number,
        is_community_completed: PropTypes.bool,
        book_reg_cnt: PropTypes.number,
        is_book_reg_completed: PropTypes.bool,
        note_cnt: PropTypes.number,
        is_note_completed: PropTypes.bool,
    }).isRequired,
};