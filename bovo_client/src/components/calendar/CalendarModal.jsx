import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PropTypes from "prop-types";

const CalendarModal = ({
  modalOpen,
  closeModal,
  selectedDateKey,
  calendarData,
  selectedBook,
  setSelectedBook,
  handleMoveToRecord,
}) => {
  const selectedBooks = selectedDateKey ? calendarData[selectedDateKey] || [] : [];

  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "38rem",
          backgroundColor: "#ffffff",
          borderRadius: "1.2rem",
          padding: "2rem",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "2.8rem", marginLeft: "2rem" }}>
            독서 기록
          </Typography>
          <CloseRoundedIcon
            sx={{ fontSize: "2.5rem", marginRight: "0.5rem", cursor: "pointer" }}
            onClick={closeModal}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            margin: "1rem 1rem",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: selectedBooks.length === 0 ? "center" : "flex-start",
          }}
        >
          {selectedBooks.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "25rem",
                gap: 3,
              }}
            >
              <LibraryBooksIcon sx={{ fontSize: "7rem", color: "#b0b0b0" }} />
              <Typography sx={{ fontSize: "1.9rem", color: "#888" ,whiteSpace: "pre-line"}}>
                기록된 도서가 없습니다{"\n"}
                (데이터 연결 필요)
              </Typography>
            </Box>
          ) : (
            selectedBooks.map((book, idx) => (
              <Box
                key={idx}
                onClick={() => setSelectedBook(book)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: selectedBook?.book_id === book.book_id ? "#DDEFFD" : "#E8F1F6",
                  borderRadius: "0.8rem",
                  padding: "1.2rem 1rem",
                  marginBottom: "1.1rem",
                  gap: 4,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "9rem",
                    height: "11rem",
                    backgroundColor: book.thumbnail ? "transparent" : "#d3d3d3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "0.4rem",
                    overflow: "hidden",
                  }}
                >
                  {book.thumbnail ? (
                    <Box
                      component="img"
                      src={book.thumbnail}
                      alt="썸네일"
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography sx={{ fontSize: "1.2rem", color: "#666" }}>이미지 없음</Typography>
                  )}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "1.9rem",
                      marginBottom: "0.5rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      color: "#555",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      marginBottom: "1rem",
                    }}
                  >
                    {book.author || "저자 없음"}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor:
                        book.reading_status === "ing"
                          ? "#BDE5F1"
                          : book.reading_status === "end"
                          ? "#BDF1BD"
                          : book.reading_status === "wish"
                          ? "#FFE0A3"
                          : "#ccc",
                      padding: "0.5rem 1.2rem",
                      borderRadius: "1rem",
                      fontSize: "1.2rem",
                      color: "#000",
                      display: "inline-block",
                    }}
                  >
                    {book.reading_status === "ing"
                      ? "읽는 중"
                      : book.reading_status === "end"
                      ? "다 읽음"
                      : book.reading_status === "wish"
                      ? "읽고 싶음"
                      : "상태 미정"}
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Button
          variant="contained"
          onClick={handleMoveToRecord}
          disabled={!selectedBook}
          sx={{
            marginTop: "1rem",
            backgroundColor: !selectedBook ? "#D8D8D8" : "#739CD4",
            fontSize: "1.8rem",
            borderRadius: "0.6rem",
            padding: "1rem 0",
          }}
        >
          기록으로 이동하기
        </Button>
      </Box>
    </Modal>
  );
};

CalendarModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedDateKey: PropTypes.string,
  calendarData: PropTypes.object.isRequired,
  selectedBook: PropTypes.object,
  setSelectedBook: PropTypes.func.isRequired,
  handleMoveToRecord: PropTypes.func.isRequired,
};

export default CalendarModal;

