import { Box, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import styles from './Exp.module.css';
import { useEffect, useState } from "react";
import QuestInfoModal from "../../components/questInfoModal/QuestInfoModal";
import BedgeInfoModal from "../../components/bedgeInfoModal/BedgeInfoModal";
import bedgeImages from "../../constant/BedgeImg";
import { fetchRewards } from "../../api/RewardService";
import QuestList from "../../components/quest/questList/QuestList";

const Exp = () => {
    const [openQuestModal, setOpenQuestModal] = useState(false); // quest info 모달 상태 추가
    const [openBedgeModal, setOpenBedgeModal] = useState(false); // bedge info 모달 상태 추가
    const [quests, setQuests] = useState([]); // 퀘스트 및 뱃지 저장
    const [medal, setMedal] = useState();

    // API 호출
    useEffect(() => {
        const getRewards = async () => {
            const data = await fetchRewards();
            if (data) {
                setQuests(data.missions);
                setMedal(data.medal_type);
            }
        };
        getRewards();
    }, []);

    // questInfoModal 관련 함수
    const handleOpenQuestModal = () => {
        setOpenQuestModal(true);
    };

    const handleCloseQuestModal = () => {
        setOpenQuestModal(false);
    };

    // bedgeInfoModal 관련 함수
    const handleOpenBedgeModal = () => {
        setOpenBedgeModal(true);
    };

    const handleCloseBedgeModal = () => {
        setOpenBedgeModal(false);
    };

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
                    <Box className={styles.iconWrapper} onClick={handleOpenQuestModal}>
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
                    <Box className={styles.iconWrapper} onClick={handleOpenBedgeModal}>
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
            <QuestInfoModal open={openQuestModal} onClose={handleCloseQuestModal} />
            <BedgeInfoModal open={openBedgeModal} onClose={handleCloseBedgeModal} />
        </Box>
    );
};

export default Exp;