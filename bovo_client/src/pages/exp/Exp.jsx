import { Box, Button, LinearProgress, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import styles from './Exp.module.css';
import bedge1 from '../../assets/bedge/bedge1.png';
import bedge2 from '../../assets/bedge/bedge2.png';
import bedge3 from '../../assets/bedge/bedge3.png';
import bedge4 from '../../assets/bedge/bedge4.png';
import bedge5 from '../../assets/bedge/bedge5.png';
import bedge6 from '../../assets/bedge/bedge6.png';
import bedge7 from '../../assets/bedge/bedge7.png';
import bedge8 from '../../assets/bedge/bedge8.png';
import bedge9 from '../../assets/bedge/bedge9.png';
import { useState } from "react";
import QuestInfoModal from "../../components/questInfoModal/QuestInfoModal";
import BedgeInfoModal from "../../components/bedgeInfoModal/BedgeInfoModal";

const Exp = () => {
    const [openQuestModal, setOpenQuestModal] = useState(false); // quest info 모달 상태 추가
    const [openBedgeModal, setOpenBedgeModal] = useState(false); // bedge info 모달 상태 추가

    const questList = [
        {title: "출석", count: 7},
        {title: "커뮤니티 참여", count: 7},
        {title: "책 등록", count: 7},
        {title: "독서 기록", count: 7}
    ]

    const bedgeList = [
        {key: "bedge1", src: bedge1, active: true},
        {key: "bedge2", src: bedge2, active: false},
        {key: "bedge3", src: bedge3, active: false},
        {key: "bedge4", src: bedge4, active: false},
        {key: "bedge5", src: bedge5, active: false},
        {key: "bedge6", src: bedge6, active: false},
        {key: "bedge7", src: bedge7, active: false},
        {key: "bedge8", src: bedge8, active: false},
        {key: "bedge9", src: bedge9, active: false},
    ]

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
                    {questList.map((quest)=>(
                        <Box key={quest.title} className={styles.questWrapper}>
                            <Box className={styles.questTitle}>
                                <Typography 
                                    sx={{fontSize: "1.75rem", display: "flex", alignItems: "center"}} 
                                    fontWeight="bold"
                                >
                                    {quest.title} &nbsp;
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
                                    value={100}
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
                                    7회&nbsp;
                                </Typography>
                                <Typography sx={{fontSize: "1.25rem"}}>
                                    / 7회
                                </Typography>
                            </Box>
                            <Button 
                                className={styles.questBtn}
                                sx={{
                                    borderRadius: "0.625rem",
                                    backgroundColor: "#739CD4",
                                    color: "#FFFFFF",
                                    fontSize: "1.25rem"
                                }}
                            >
                                    확인
                            </Button>
                        </Box>
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
                        {bedgeList.map((bedge) => (
                            <Box 
                                key={bedge.key} 
                                className={styles.bedgeWrapper}
                                sx={{
                                    background: bedge.active ? 
                                        "linear-gradient(to bottom, #FFF, #E8F1F6)" 
                                        : "#FFFFFF",
                                    border: bedge.active ? "0.25rem solid #B0D3F0" : "none",
                                }}
                            >
                                <Box className={styles.bedgeImg}>
                                    <img 
                                        src={bedge.src} 
                                        alt={bedge.key} 
                                        style={{opacity: bedge.active ? "1" : "0.5"}}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <QuestInfoModal open={openQuestModal} onClose={handleCloseQuestModal} />
            <BedgeInfoModal open={openBedgeModal} onClose={handleCloseBedgeModal} />
        </Box>
    );
};

export default Exp;