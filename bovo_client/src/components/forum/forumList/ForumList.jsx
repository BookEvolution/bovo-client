import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ForumCard from "../forumCard/ForumCard";
import styles from './ForumList.module.css';

const ForumList = ({ chatrooms, onCardClick }) => {
    return (
        <Box className={styles.forumListContainer}>
            {chatrooms
                .filter((room) => room.admin !== true)
                .map((room) => (
                    <ForumCard key={room.id} room={room} onClick={onCardClick} />
                ))
            }
        </Box>
    );
};

ForumList.propTypes = {
    chatrooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        chatroom_name: PropTypes.string.isRequired,
        chatroom_ds: PropTypes.string.isRequired,
        admin: PropTypes.bool.isRequired,
        book_info: PropTypes.shape({
          book_img: PropTypes.string.isRequired,
          book_name: PropTypes.string.isRequired,
        }).isRequired,
        group_info: PropTypes.shape({
          current_people: PropTypes.number.isRequired,
          limit_people: PropTypes.number.isRequired,
        }).isRequired,
      })
    ).isRequired,
    onCardClick: PropTypes.func.isRequired,
};  

export default ForumList;