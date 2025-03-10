import PropTypes from "prop-types";

// memo
export const memoPropType = PropTypes.shape({
  memo_id: PropTypes.number.isRequired,
  memo_date: PropTypes.string.isRequired,
  memo_Q: PropTypes.string.isRequired,
  memo_A: PropTypes.string.isRequired,
});

//book
export const bookPropType = PropTypes.shape({
  book_id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  star: PropTypes.number,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  status: PropTypes.string.isRequired,
  memos: PropTypes.arrayOf(memoPropType),
});