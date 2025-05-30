import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import styles from './QuestList.module.css';
import QuestBtn from '../questBtn/QuestBtn';
import { increaseExp } from '../../../api/RewardService';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../store/queryClient/queryClient';
import { missionKeys } from '../../../constant/QuestList';

const QuestList = ({ quest }) => {

    // 📌 mutation 설정
    const { mutate: increaseExpMutate, isLoading: isMutating } = useMutation({
        mutationFn: () => increaseExp(quest.mission_id),
        onSuccess: (data) => {
            console.log('경험치 증가 성공:', data);
            // ✅ 리워드 데이터를 다시 가져오기
            queryClient.invalidateQueries(['rewards']);
        },
        onError: (error) => {
            console.error('경험치 증가 실패:', error);
        }
    });

    // 📌 mission 정보 가져오기
    const mission = missionKeys[quest.mission_id] || {};

    const title = mission.title;
    const currentCount = quest?.[mission.countKey];
    const isCompleted = quest?.[mission.completedKey];
    const progress = currentCount >= 7 ? 100 : (currentCount / 7) * 100; // 7회 기준 진행률 계산

    // 확인 버튼 클릭 시 mutation 호출
    const handleQuestButtonClick = () => {
        if (isMutating) return;
        increaseExpMutate();
    };

    return (
        <Box className={styles.questWrapper}>
            <Box className={styles.questTitle}>
                <Typography 
                    sx={{fontSize: "1.75rem", display: "flex", alignItems: "center"}} 
                    fontWeight="bold"
                >
                    {title} &nbsp;
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