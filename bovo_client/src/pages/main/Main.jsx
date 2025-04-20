import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import useMainData from "../../hooks/useMain";
import UserInfo from "../../components/main/UserInfo";
import RecentBook from "../../components/main/RecentBook";
import BookShelf from "../../components/main/BookShelf";

const Main = () => {
    const navigate = useNavigate();
    const { userData, bookStyles } = useMainData();

    const {
        nickname,
        profile_picture,
        level,
        total_book_num,
        recent_book_info = {},
        book_list = {},
    } = userData || {};

    console.log("recent_book_info", recent_book_info);
    console.log("book_list", book_list);

    const bookArray = book_list ? Object.values(book_list) : [];
    return (
        <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4rem" }}>
            {userData && (
                <>
                    <Box sx={{ backgroundColor: "#E8F0F8", borderRadius: "2rem", padding: "2.5rem", width: "37rem", height: "45rem", display: "flex", flexDirection: "column", alignItems: "center", position: "relative"}}>
                        <UserInfo
                            level={level}
                            nickname={nickname}
                            profile_picture={profile_picture}
                            total_book_num={total_book_num}
                        />
                        <RecentBook recent_book_info={recent_book_info} navigate={navigate} />
                    </Box>

                    <BookShelf bookArray={bookArray} bookStyles={bookStyles} />
                </>
            )}
        </Container>
    );
};

export default Main;
