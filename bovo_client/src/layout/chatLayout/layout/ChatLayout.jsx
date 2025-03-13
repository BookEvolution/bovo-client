import { Box, Container, IconButton, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from "./ChatLayout.module.css";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import ReadingShareModal from "../../../components/forum/readingShareModal/ReadingShareModal";

const ChatLayout = () => {
    const [modalOpen, setModalOpen] = useState(false); //독서 기록 공유 모달 상태 관리
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (open) => () => {
        setSidebarOpen(open);
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <Container className={styles.layout}>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <Outlet/>
            <Box className={styles.inputContainer}>
                <IconButton className={styles.addBtn} onClick={handleOpenModal}>
                    <AddCircleIcon sx={{fontSize: "3.5rem", color: "#739CD4"}} />
                </IconButton>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    sx={{
                        backgroundColor: "#E8F1F6",
                        width: "35.25rem",
                        height: "4rem",  // ✅ 입력창 높이 조정
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "1.5625rem",
                        "& input": {
                            display: "flex",
                            alignItems: "center", // ✅ Y축 중앙 정렬
                            fontSize: "1.5rem",
                            height: "2.5rem", 
                            padding: "1rem", // ✅ 내부 여백 제거
                        },
                        "& fieldset": { border: "none" }, // ✅ 아웃라인 제거
                    }}
                />
                <IconButton 
                    className={styles.addBtn}
                    sx={{
                        borderRadius: "3.125rem",
                        backgroundColor: "#739CD4",
                    }}      
                >
                    <ArrowUpwardIcon sx={{fontSize: "2rem", color: "#FFFFFF", fontWeight: "bold"}} />
                </IconButton>
            </Box>
            <ReadingShareModal 
                open={modalOpen} 
                onClose={handleCloseModal} 
            />
        </Container>
    );
};

export default ChatLayout;