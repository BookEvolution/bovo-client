import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import bedgeImages from "../../constant/BedgeImg";

const BedgeInfoModal = ({open, onClose}) => {

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
                    {bedgeImages.map((badge, index) => (
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