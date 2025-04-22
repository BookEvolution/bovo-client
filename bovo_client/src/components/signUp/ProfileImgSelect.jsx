import PropTypes from "prop-types";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProfileBottomSheet from "../profileImgBottomSheet/ProfileBottomSheet";

const ProfileImgSelect = ({ profileImage, setProfileImage, isBottomSheetOpen, setIsBottomSheetOpen }) => {
    const handleProfileSelect = (profile) => {
        setProfileImage(profile.src);
        setIsBottomSheetOpen(false);
    };

    return (
        <>
            <Box
                position="relative"
                onClick={() => setIsBottomSheetOpen(true)}
                sx={{
                    width: "18.75rem",
                    height: "18.75rem",
                    backgroundColor: "#E8F1F6",
                    borderRadius: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "2rem",
                }}
            >
                <img src={profileImage} alt="프로필 이미지" style={{ width: "14rem", height: "14rem", marginTop: "4.7rem" }} />
                <SearchIcon
                    sx={{
                        position: "absolute",
                        top: "6%",
                        right: "6%",
                        fontSize: "3.8rem",
                        color: "#739CD4",
                    }}
                />
            </Box>

            <ProfileBottomSheet
                open={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
                onSelectProfile={handleProfileSelect}
                selectedProfile={profileImage}
            />
        </>
    );
};

ProfileImgSelect.propTypes = {
    profileImage: PropTypes.string.isRequired,
    setProfileImage: PropTypes.func.isRequired,
    isBottomSheetOpen: PropTypes.bool.isRequired,
    setIsBottomSheetOpen: PropTypes.func.isRequired,
};

export default ProfileImgSelect;
