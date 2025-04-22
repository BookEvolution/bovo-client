import { useState, useEffect, useCallback } from "react";
import { BookSearch } from "../api/BookSearch";

const useBookSearch = (searchTerm, sort) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchBooks = useCallback(async (query, sortOption, pageNum = 1) => {
        if (!query.trim()) {
        setBooks([]);
        setHasMore(false);
        return;
        }

        setLoading(true);
        const { data, error } = await BookSearch(query, sortOption, pageNum);
        if (!error) {
        if (pageNum === 1) {
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
    }, []);

    const fetchMoreBooks = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchBooks(searchTerm, sort, nextPage);
    };

    useEffect(() => {
        setPage(1);
        fetchBooks(searchTerm, sort, 1);
    }, [searchTerm, sort, fetchBooks]);

    return { books, loading, fetchMoreBooks, hasMore };
};

export default useBookSearch;
