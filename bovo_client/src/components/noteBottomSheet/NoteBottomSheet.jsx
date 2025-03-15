import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bookPropType } from "../../utils/propTypes";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate } from "react-router-dom";
import { updateBook } from "../../api/NoteApi";
import NoteBottomSheetUI from "./NoteBottomSheetUI";

dayjs.extend(customParseFormat);

const NoteBottomSheet = ({ open, onClose, book }) => {
    const [status, setStatus] = useState("ing");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rating, setRating] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        window.location.reload();
    };

    // 기존 데이터 불러오기
    useEffect(() => {
        if (open && book) {
            console.log("전달된 book 데이터:", book);
    
            setStatus(book.status || "ing");
    
            if (book.start_date) {
                const parsedStartDate = dayjs(book.start_date, "YY.MM.DD");
                console.log("Parsed start date:", parsedStartDate.format("YYYY-MM-DD"), parsedStartDate.isValid());
                setStartDate(parsedStartDate.isValid() ? parsedStartDate : null);
            } else {
                setStartDate(null);
            }
    
            if (book.end_date) {
                const parsedEndDate = dayjs(book.end_date, "YY.MM.DD");
                setEndDate(parsedEndDate.isValid() ? parsedEndDate : null);
            } else {
                setEndDate(null);
            }
    
            setRating(book.star || 0);
        }
    }, [open, book]);
    
    const handleStatusChange = (event, newStatus) => {
        if (newStatus !== null) setStatus(newStatus);
    };

    const handleSave = async () => {
        if (!book) return;
        try {
            const updatedBookData = {
                book_id: book.book_id,
                status,
                start_date: startDate ? startDate.format("YY.MM.DD") : null,
                end_date: endDate ? endDate.format("YY.MM.DD") : null,
                star: rating
            };
            await updateBook(book.book_id, updatedBookData);
            console.log("책 정보 수정 완료");
            handleClose();
        } catch (error) {
            console.error("책 정보 수정 실패:", error);
        }
    };

    const handleDeleteModalOpen = () => {
        setOpenDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setOpenDeleteModal(false);
    };

    const handleDeleteSuccess = () => {
        handleDeleteModalClose();
        onClose();
        navigate("/archive");
    };

    return (
        <NoteBottomSheetUI
            open={open}
            onClose={handleClose}
            book={book}
            status={status}
            startDate={startDate}
            endDate={endDate}
            rating={rating}
            openDeleteModal={openDeleteModal}
            onStatusChange={handleStatusChange}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onRatingChange={(event, newValue) => setRating(newValue * 2)}
            onSave={handleSave}
            onDeleteClick={handleDeleteModalOpen}
            onDeleteModalClose={handleDeleteModalClose}
            onDeleteSuccess={handleDeleteSuccess}
        />
    );
};

NoteBottomSheet.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: bookPropType.isRequired,
};

export default NoteBottomSheet;