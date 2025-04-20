import { useState, useEffect } from "react";
import { BookSearch } from "../api/BookSearch";

const useBookSearch = (searchTerm, sort) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchBooks = async (query, newPage = 1) => {
        if (!query.trim()) {
            setBooks([]);
            setHasMore(false);
            return;
        }

        setLoading(true);
        const { data, error } = await BookSearch(query, sort, newPage);
        if (!error) {
            if (newPage === 1) {
                setBooks(data);
            } else {
                setBooks((prev) => [...prev, ...data]);
            }
            setHasMore(data.length >= 20);
        } else {
            setBooks([]);
            setHasMore(false);
        }
        setLoading(false);
    };

    const fetchMoreBooks = () => {
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchBooks(searchTerm, nextPage);
            return nextPage;
        });
    };

    useEffect(() => {
        setPage(1);
        fetchBooks(searchTerm, 1);
    }, [searchTerm, sort]);

    return { books, loading, fetchMoreBooks, hasMore };
};

export default useBookSearch;