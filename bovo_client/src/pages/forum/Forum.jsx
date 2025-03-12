import { Box, Button, Tab, Tabs } from "@mui/material";
import styles from "./Forum.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import EntireForum from "../../components/forum/entireForum/EntireForum";
import MyForum from "../../components/forum/myForum/MyForum";

const Forum = () => {
    const [value, setValue] = useState(0); // 탭 상태

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box className={styles.ForumContainer}>
            <Box className={styles.TabContainer}>
                <Tabs value={value} onChange={handleChange} aria-label="discussion tabs">
                    <Tab 
                        label="토론방"
                        sx={{ 
                                width: "13rem", 
                                height: "4rem",
                                fontSize: "1.5rem",
                                letterSpacing: "0.015rem",
                                fontWeight: "bold"
                            }} 
                    />
                    <Tab 
                        label="내 토론" 
                        sx={{ 
                            width: "13rem", 
                            height: "4rem",
                            fontSize: "1.5rem",
                            letterSpacing: "0.015rem",
                            fontWeight: "bold"
                        }}
                    />
                </Tabs>
                <Link to="/forum/forum-make">
                    <Button 
                        className={styles.ForumMakeBtn}
                        sx={{
                            borderRadius: "1.5625rem",
                            backgroundColor: "#739CD4",
                            fontSize: "1.5rem",
                            letterSpacing: "0.015rem",
                            color: "#FFFFFF"
                        }}
                    >
                        방 만들기
                    </Button>
                </Link>
            </Box>
            {value === 0 && <EntireForum />}
            {value === 1 && <MyForum />}
        </Box>
    );
};

export default Forum;
