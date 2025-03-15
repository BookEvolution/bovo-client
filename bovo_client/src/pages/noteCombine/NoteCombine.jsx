import { useParams } from "react-router-dom";
import CombineModal from "../../components/combineModal/CombineModal";
import useNoteCombine from "../../hooks/useNoteCombine";
import NoteCombineUI from "../../components/noteCombine/NoteCombineUI";

const NoteCombine = () => {
  const { book_id } = useParams();
  const { loading, error, bookInfo, localMemos, modalOpen, openModal, closeModal, handleUpdateMemos } = useNoteCombine(book_id);

  return (
    <>
      <NoteCombineUI 
        bookInfo={bookInfo}
        localMemos={localMemos}
        loading={loading}
        error={error}
        openModal={openModal}
      />

      {modalOpen && (
        <CombineModal open={modalOpen} onClose={closeModal} memos={localMemos} setMemos={handleUpdateMemos} />
      )}
    </>
  );
};

export default NoteCombine;
