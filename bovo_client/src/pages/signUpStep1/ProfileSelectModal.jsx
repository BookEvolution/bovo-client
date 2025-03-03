import React, { useState } from "react";
import { Box, Button, Modal, Typography, Slide } from "@mui/material";

const profileImages = [
    "/src/assets/profile/profile_1.png",
    "/src/assets/profile/profile_2.png",
    "/src/assets/profile/profile_3.png",
    "/src/assets/profile/profile_4.png",
    "/src/assets/profile/profile_5.png",
    "/src/assets/profile/profile_6.png",
    ];

    const ProfileSelectModal = ({ open, onClose, onSelect }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <Modal open={open} onClose={onClose} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Box
            sx={{
                width: "44.125rem",
                height:"40rem",
                backgroundColor: "#E8F1F6",
                borderRadius: "1.5rem 1.5rem 0rem 0rem",
                padding: "2rem",
                border: "none", //아직 border 제거 안됨
            }}
            >

            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3} justifyContent="center">
                {profileImages.map((image, index) => (
                <Box
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    sx={{
                    width: "13.5rem",
                    height: "13.5rem",
                    borderRadius: "1rem",
                    backgroundColor: selectedImage === image ? "#BDE5F1" : "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop:"1rem",
                    }}
                >
                    <img src={image} alt={`프로필 ${index + 1}`} style={{ width: "11rem", height: "11rem", marginTop:"3rem"}} />
                </Box>
                ))}
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{
                marginTop: "3.3rem",
                fontSize: "2rem",
                fontWeight: "600",
                padding: "1rem",
                borderRadius: "0.8rem",
                backgroundColor: "#BDE5F1",
                boxShadow: "none",
                }}
                onClick={() => {
                if (selectedImage) {
                    onSelect(selectedImage);
                    onClose();
                }
                }}
                disabled={!selectedImage}
            >
                선택하기
            </Button>
            </Box>
        </Slide>
        </Modal>
    );
};

export default ProfileSelectModal;
