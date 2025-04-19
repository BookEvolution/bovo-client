import PropTypes from "prop-types";  // PropTypes import
import List from '@mui/material/List';
import styles from "./MyForum.module.css";
import MyForumList from "./myForumList/MyForumList";

const MyForum = ({ myChatrooms }) => {
     // myChatrooms가 null이나 빈 배열일 경우 처리
     if (!myChatrooms || myChatrooms.length === 0) {
        return <div>No chatrooms available.</div>;
    }

    console.log("내채팅방", myChatrooms)

    return (
        <List className={styles.chatRoomContainer}>
            {myChatrooms.map((myChatroom) => {
                return <MyForumList key={myChatroom.id} myChatroom={myChatroom} />;
            })}
        </List>
    );
};

export default MyForum;

// PropTypes 설정
MyForum.propTypes = {
    myChatrooms: PropTypes.array.isRequired,
};