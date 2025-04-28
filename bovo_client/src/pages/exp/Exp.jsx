import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import styles from './Exp.module.css';
import { useEffect, useState } from "react";
import QuestInfoModal from "../../components/questInfoModal/QuestInfoModal";
import BedgeInfoModal from "../../components/bedgeInfoModal/BedgeInfoModal";
import bedgeImages from "../../constant/BedgeImg";
import { useRewardsQuery } from "../../api/RewardService";
import QuestList from "../../components/quest/questList/QuestList";
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const Exp = () => {
    const [openQuestModal, setOpenQuestModal] = useState(false); // quest info 모달 상태 추가
    const [openBedgeModal, setOpenBedgeModal] = useState(false); // bedge info 모달 상태 추가
    const [quests, setQuests] = useState([]); // 퀘스트 및 뱃지 저장
    const [medal, setMedal] = useState();
    const { data: rewardData, isLoading, isError } = useRewardsQuery();

    // rewardData가 변경될 때마다 상태 업데이트
    useEffect(() => {
        if (rewardData) {
            setQuests(rewardData.missions);
            setMedal(rewardData.medal_type);
        }
    }, [rewardData]);  // rewardData가 변경될 때만 실행

    // questInfoModal 관련 함수
    const handleOpenQuestModal = (open) => setOpenQuestModal(open);

    // bedgeInfoModal 관련 함수
    const handleOpenBedgeModal = (open) => setOpenBedgeModal(open);

    // 로딩 중 또는 에러 처리
    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Typography>데이터를 불러오는 데 실패했습니다.</Typography>;

    return (
        <Box className={styles.expPageConainer}>
            <Box className={styles.expContainer}>
                <Box className={styles.expAndBedgeHeader}>
                    <Typography 
                        sx={{ fontSize: "2rem", paddingLeft: "1rem" }} 
                        fontWeight="bold"
                    >
                        퀘스트 항목
                    </Typography>
                    <Box className={styles.iconWrapper} onClick={() => handleOpenQuestModal(true)}>
                        <InfoIcon sx={{fontSize: "2rem"}}/>
                    </Box>
                </Box>
                <Box className={styles.questContainer}>
                    {quests.map((quest)=>(
                        <QuestList key={quest.mission_id} quest={quest} />
                    ))}
                </Box>
            </Box>
            <Box className={styles.bedgeListContainer}>
                <Box className={styles.expAndBedgeHeader}>
                    <Typography 
                        sx={{ fontSize: "2rem", paddingLeft: "1rem" }} 
                        fontWeight="bold"
                    >
                        지난주 독서 성과
                    </Typography>
                    <Box className={styles.iconWrapper} onClick={() => handleOpenBedgeModal(true)}>
                        <InfoIcon sx={{fontSize: "2rem"}}/>
                    </Box>
                </Box>
                <Box className={styles.bedgeList}>
                    <Box className={styles.bedgeContainer}>
                        {bedgeImages.map((bedge) => {
                            // medal 값과 bedge.key를 비교하여 활성화된 배지 설정
                            const isActive = medal === bedge.key;

                            return (
                                <Box 
                                    key={bedge.key} 
                                    className={styles.bedgeWrapper}
                                    sx={{
                                        background: isActive ? 
                                            "linear-gradient(to bottom, #FFF, #E8F1F6)" 
                                            : "#FFFFFF",
                                        border: isActive ? "0.25rem solid #B0D3F0" : "none",
                                    }}
                                >
                                    <Box className={styles.bedgeImg}>
                                        <img 
                                            src={bedge.src} 
                                            alt={bedge.key} 
                                            style={{opacity: isActive  ? "1" : "0.5"}}
                                        />
                                    </Box>
                                </Box>
                            );
                            }
                        )}
                    </Box>
                </Box>
            </Box>
            <QuestInfoModal open={openQuestModal} onClose={() => handleOpenQuestModal(false)} />
            <BedgeInfoModal open={openBedgeModal} onClose={() => handleOpenBedgeModal(false)} />
        </Box>
    );
};

export default Exp;