import { Box, Modal, Typography } from "@mui/material";

const NoteBottomSheet = ({ open, onClose }) => {
  return (
    <Modal 
    open={open} onClose={onClose} sx={{ 
      display: "flex", 
      alignItems: "flex-end", 
      justifyContent: "center" 
      }}>
      <Box className="bottomSheet">
        <Typography className="sheet-title">위치 확인</Typography>
      </Box>
    </Modal>
  );
};

export default NoteBottomSheet;