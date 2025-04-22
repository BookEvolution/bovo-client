import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMainData } from "../api/Main";

function generateBookStyleByTitle(bookTitle) {
    let hash = 0;
    for (let i = 0; i < bookTitle.length; i++) {
        hash = bookTitle.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    const designs = ["lineA", "lineB", "lineC", "lineD", "lineE", "default"];
    const colors = ["#C1D5F0", "#B4F1E8", "#C3C1F0", "#DFE6FF", "#FBEFAB", "#BAEEF3", "#B3E4FE"];

    const width = `${(hash % 2) + 3.9}rem`;

    const displayTitleLength = bookTitle.length > 8 ? 7 : bookTitle.length;
    const baseHeight = 14.8;
    const extraHeight = displayTitleLength > 4 ? (displayTitleLength - 4) * 0.22 : 0;
    const height = `${(baseHeight + extraHeight).toFixed(2)}rem`;

    const backgroundColor = colors[hash % colors.length];
    const design = designs[hash % designs.length];

    return {
        width,
        height,
        backgroundColor,
        design,
    };
}

const useMainData = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [bookStyles, setBookStyles] = useState({});

    useEffect(() => {
        getMainData().then(({ data, error }) => {
            if (error) {
                if (error.response?.status === 401) {
                    console.log("AccessToken 만료 또는 인증 실패");
                    sessionStorage.removeItem("AccessToken");
                    navigate("/login");
                }
                return;
            }
            console.log("MainData", data);
            setUserData(data);

            const newBooks = data.book_list ? Object.values(data.book_list) : [];
            const updatedStyles = {};

            newBooks.forEach((book) => {
                updatedStyles[book] = generateBookStyleByTitle(book);
            });

            sessionStorage.setItem("bookStyles", JSON.stringify(updatedStyles));
            setBookStyles(updatedStyles);
        });
    }, [navigate]);

    return { userData, bookStyles };
};

export default useMainData;
