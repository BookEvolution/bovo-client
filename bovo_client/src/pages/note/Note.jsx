import { useParams } from "react-router-dom";

const Note = () => {
  const { book_id } = useParams();

  return (
    <div>
      <p>화면확인</p>
    </div>
  );
};

export default Note;