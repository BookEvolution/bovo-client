// //주요 확인 사항
// // main, calendar 수정까지는 괜찮았는데 BookSearch 수정 후 무한 무한 로딩 가끔 발생 -> 확인 필요
// // '읽는중' 책 메인화면 표시 안됨 현상 나타남 -> bear, podo 새로 생성한 계정 모두 발생한 현상이라 확인 필요

import { Box } from "@mui/material";
import { useState } from "react";
import BookSearchBar from "../../components/bookSearch/BookSearchBar";
import BookList from "../../components/bookSearch/BookList";
import SearchBarDetails from "../../components/bookSearch/SearchBarDetails"; // 추가
import useBookSearch from "../../hooks/useBookSearch";

const BookSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("accuracy");

    const { books, loading, fetchMoreBooks, hasMore } = useBookSearch(searchTerm, sort);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "2rem" }}>
            <BookSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <SearchBarDetails books={books} sort={sort} setSort={setSort} />

            <BookList
                books={books}
                loading={loading}
                searchTerm={searchTerm}
                fetchMoreBooks={fetchMoreBooks}
                hasMore={hasMore}
            />
        </Box>
    );
};

export default BookSearch;
