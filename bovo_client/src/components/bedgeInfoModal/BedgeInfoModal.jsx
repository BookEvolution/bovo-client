import PropTypes from "prop-types";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import badge1 from '../../assets/bedge/bedge1.png';
import badge2 from '../../assets/bedge/bedge2.png';
import badge3 from '../../assets/bedge/bedge3.png';
import badge4 from '../../assets/bedge/bedge4.png';
import badge5 from '../../assets/bedge/bedge5.png';
import badge6 from '../../assets/bedge/bedge6.png';
import badge7 from '../../assets/bedge/bedge7.png';
import badge8 from '../../assets/bedge/bedge8.png';
import badge9 from '../../assets/bedge/bedge9.png';

const BedgeInfoModal = ({open, onClose}) => {
    const badgeInfoList = [
            {key: "bedge1", src: badge1, text: "독서 기록 및 커뮤니티 참여 총 2회 진행"},
            {key: "bedge2", src: badge2, text: "독서 기록 및 커뮤니티 참여 총 4회 진행"},
            {key: "bedge3", src: badge3, text: "독서 기록 및 커뮤니티 참여 총 7회 진행"},
            {key: "bedge4", src: badge4, text: "독서 기록 및 커뮤니티 참여 총 10회 진행"},
            {key: "bedge5", src: badge5, text: "독서 기록 및 커뮤니티 참여 총 20회 진행"},
            {key: "bedge6", src: badge6, text: "독서 기록 및 커뮤니티 참여 총 40회 진행"},
            {key: "bedge7", src: badge7, text: "독서 기록 및 커뮤니티 참여 총 60회 진행"},
            {key: "bedge8", src: badge8, text: "독서 기록 및 커뮤니티 참여 총 80회 진행"},
            {key: "bedge9", src: badge9, text: "독서 기록 및 커뮤니티 참여 총 100회 이상 진행"},
    ]


    return (
        <Dialog 
            open={open}
            onClose={onClose} 
            sx={{
                "& .MuiDialog-paper": {
                    width: "40.625rem",               // 너비 변경
                    height: "60rem",
                    padding: "4.6875rem 2.6875rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFF",  // 배경색 변경
                    borderRadius: "1.25rem",         // 모서리 둥글게
                },
            }}
        >
            <DialogTitle
                sx={{
                        fontSize: "3rem", 
                        fontWeight: "bold", 
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center" 
                    }}
            >
                독서성과 정보
            </DialogTitle>
            <DialogContent
                sx={{
                    width: "100%",
                    height: "14.25rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0",
                    marginBottom: "2rem"
                }}
            >
                <Typography sx={{ width: "100%", fontSize: "1.75rem" }}>
                    독서기록, 커뮤니티 항목에 한해서 활동량에 따라 독서 성과 훈장이 부여됩니다.
                </Typography>
                <List>
                    {badgeInfoList.map((badge, index) => (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar src={badge.src} sx={{ width: "2rem", height: "2rem" }} />
                            </ListItemAvatar>
                            <ListItemText 
                                primary={
                                    <Typography sx={{ fontSize: "1.5rem" }}>
                                        {badge.text}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Button 
                    onClick={onClose}
                    sx={{
                        width: "31.25rem",
                        height: "6.25rem",
                        borderRadius: "2.5rem",
                        backgroundColor: "#BDE5F1",
                        color: "#FFF",
                        fontSize: "2.1875rem",
                        textAlign: "center",
                    }}  
                >
                    확인했어요!
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// PropTypes 설정
BedgeInfoModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default BedgeInfoModal;