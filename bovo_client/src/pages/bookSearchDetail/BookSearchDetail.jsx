import { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NoteStateModal from "../../components/bookSearchDetail/NoteStateSelectModal";
import ForumCompleteModal from "../../components/forumCreateModal/ForumCreateModal";
import BookInfo from "../../components/bookSearchDetail/BookInfo";
import BookDescription from "../../components/bookSearchDetail/BookDescription";
import Buttons from "../../components/bookSearchDetail/Buttons";

const BookSearchDetail = () => {
    const location = useLocation();
    const book = location.state?.book;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isForumModalOpen, setIsForumModalOpen] = useState(false);

    if (!book) {
        return (
        <Typography sx={{ fontSize: "2rem", color: "red", marginTop: "3rem" }}>
            책 정보를 찾을 수 없습니다.
        </Typography>
        );
    }

    const daumBookUrl = book.title
        ? `https://search.daum.net/search?w=book&q=${encodeURIComponent(book.title)}`
        : "#";

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "3rem" }}>
        
        <BookInfo book={book} />
        
        <Buttons
            onOpenNoteModal={() => setIsModalOpen(true)}
            onOpenForumModal={() => setIsForumModalOpen(true)}
        />

        <BookDescription description={book.contents} />

        <Box sx={{ position: "absolute", bottom: "14rem", display: "flex", justifyContent: "space-between", alignItems: "center", width: "74%", backgroundColor: "white", padding: "1.5rem 2rem", textAlign: "center" }} >
            <Link href={daumBookUrl} target="_blank" rel="noopener noreferrer" sx={{ fontSize: "1.6rem", fontWeight: "600", textDecoration: "none", color: "#4682B4" }} >
            추가 정보 확인하기
            </Link>
            <Typography sx={{ fontSize: "1.3rem", color: "#454545" }}>
            책 정보 제공 : 다음카카오
            </Typography>
        </Box>

        <NoteStateModal open={isModalOpen} onClose={() => setIsModalOpen(false)} book={book} />
        <ForumCompleteModal open={isForumModalOpen} onClose={() => setIsForumModalOpen(false)} book={book} />
        </Box>
    );
};

export default BookSearchDetail;
