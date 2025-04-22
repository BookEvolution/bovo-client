import { Box } from "@mui/material";
import { useState } from "react";
import BookSearchBar from "../../components/bookSearch/BookSearchBar";
import BookList from "../../components/bookSearch/BookList";
import SearchBarDetails from "../../components/bookSearch/SearchBarDetails";
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
