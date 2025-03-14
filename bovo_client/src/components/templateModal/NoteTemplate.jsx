import { useState } from "react";
import templateData from "../../assets/data/template.json";
import {
  Dialog,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const TemplateModal = ({ open, onClose, onApplyTemplate }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("전체");

  // 카테고리 목록
  const categories = ["전체", ...templateData.map((cat) => cat.category)];

  // 검색 및 카테고리 필터링
  const filteredTemplates = templateData
    .filter((category) => categoryFilter === "전체" || category.category === categoryFilter)
    .flatMap((category) =>
      category.questions
        .filter((q) => q.includes(searchText))
        .map((q) => ({ category: category.category, text: q }))
    );

  // 템플릿 적용
  const handleApplyTemplate = () => {
    if (selectedItem) {
      onApplyTemplate(selectedItem);
      onClose();
    }
  };

  // 카테고리 변경
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
    setSelectedItem(null);
  };

  // 카테고리별 색상 지정
  const getCategoryColor = (category) => {
    switch (category) {
      case "공통":
        return "lightblue";
      case "비문학":
        return "lightgray";
      case "문학":
        return "lightyellow";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiPaper-root": { borderRadius: "1.25rem" }
      }}
    >
      <Box
        sx={{
          width: "42rem",
          height: "55.5rem",
          backgroundColor: "white",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "3rem",
        }}
      >
        {/* 닫기 버튼 */}
        <IconButton
          sx={{
            position: "absolute",
            right: "1.25rem",
            top: "1.25rem",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        {/* 제목 */}
        <h2
          style={{
            textAlign: "left",
            fontSize: "2rem",
            marginTop: "0.5rem",
            marginBottom: "2rem",
            position: "absolute",
            top: "3rem",
            left: "3rem",
          }}
        >
          템플릿 형식 선택
        </h2>

        {/* 내부 요소 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          {/* 검색 + 필터 */}
          <Box 
            sx={{display: "flex",alignItems: "center", gap: "1rem", width: "34rem" }}> {/* 544px */}
            {/* 카테고리 드롭다운 */}
            <Select
              value={categoryFilter}
              onChange={handleCategoryChange}
              displayEmpty
              sx={{
                minWidth: "8rem",
                height: "5rem",
                fontSize: "1.5rem",
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category} sx={{ fontSize: "1.5rem" }}>
                  {category}
                </MenuItem>
              ))}
            </Select>

            {/* 검색창 */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="템플릿 검색"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{
                flex: 1,
                height: "5rem",
                fontSize: "1.2rem",
                "& .MuiOutlinedInput-root": {
                  height: "5rem",
                  fontSize: "1.2rem",
                },
              }}
            />
          </Box>

          {/* 템플릿 리스트 */}
          <List
            sx={{
              width: "34rem",
              maxHeight: "30rem",
              overflowX: "hidden",
              overflowY: "auto",
              borderRadius: "0.625rem",
              marginBottom: "2rem",
              border: "0.0625rem solid #E0E0E0",
            }}
          >
            {filteredTemplates.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => setSelectedItem(item.text)}
                sx={{
                  height: "auto",
                  minHeight: "3.75rem",
                  backgroundColor: selectedItem === item.text ? "#E8F1F6" : "transparent",
                  margin: "0.125rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "1rem",
                }}
              >
                <Chip
                  label={item.category}
                  size="small"
                  sx={{
                    backgroundColor: getCategoryColor(item.category),
                    marginRight: "0.75rem",
                    fontSize: "0.875rem",
                  }}
                />
                <ListItemText 
                    primary={item.text} 
                    slotProps={{ primary: { sx: { fontSize: "1.5rem" } } }} 
                />
                </ListItem>
              
            ))}
          </List>

          {/* 추가하기 */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyTemplate}
            sx={{
              width: "36rem",
              height: "4.5rem",
              backgroundColor: "#BDE5F1",
              color: "white",
              fontWeight: "bold",
              borderRadius: "1.25rem",
              alignSelf: "center",
              fontSize: "1.5rem",
            }}
            Disable elevation
            disabled={!selectedItem}
          >
            추가하기
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

TemplateModal.propTypes = {
  open: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
  onApplyTemplate: PropTypes.func.isRequired,
};


export default TemplateModal;
