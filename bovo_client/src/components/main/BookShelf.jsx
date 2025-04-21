//책장 부분
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

// 기본형
const DefaultBookDesign = ({ width, height, backgroundColor, title }) => (
    <Box sx={{ width, height, backgroundColor, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.2rem", padding: "0.8rem 0", border: "1.8px solid #D9D9D9" }} >
        <Typography variant="caption" sx={{ writingMode: "vertical-rl", textOrientation: "upright", whiteSpace: "nowrap", fontSize: "1.7rem", fontWeight: "500",letterSpacing: "0.001em", wordSpacing: "-0.9em" }}>
            {title.length > 8 ? `${title.substring(0, 8)}:` : title}
        </Typography>
    </Box>
);

// 상/하단 얇은 2줄
const BookDesignLineA = ({ width, height, backgroundColor, title }) => (
    <Box sx={{ position: "relative", width, height, backgroundColor, borderRadius: "0.2rem", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 0", overflow: "hidden", border: "1.8px solid #D9D9D9" }} >
        <Box sx={{ position: "absolute", top: "0.8rem", left: 0, right: 0, height: "0.3rem", backgroundColor: "#fff" }} />
        <Box sx={{ position: "absolute", top: "1.4rem", left: 0, right: 0, height: "0.3rem", backgroundColor: "#fff" }} />
        <Box sx={{ position: "absolute", bottom: "0.8rem", left: 0, right: 0, height: "0.3rem", backgroundColor: "#fff" }} />
        <Box sx={{ position: "absolute", bottom: "1.4rem", left: 0, right: 0, height: "0.3rem", backgroundColor: "#fff" }} />
        <Typography variant="caption" sx={{ writingMode: "vertical-rl", textOrientation: "upright", fontSize: "1.7rem", fontWeight: "500", letterSpacing: "0.001em", wordSpacing: "-0.9em", whiteSpace: "nowrap", zIndex: 1}}>
            {title.length > 8 ? `${title.substring(0, 7)}:` : title}
        </Typography>
    </Box>
);

// 상/하단 굵은 1줄
const BookDesignLineB = ({ width, height, backgroundColor, title }) => (
    <Box sx={{ position: "relative", width, height, backgroundColor, borderRadius: "0.2rem", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 0", overflow: "hidden", border: "1.8px solid #D9D9D9" }} >
        <Box sx={{ position: "absolute", top: "0.6rem", left: 0, right: 0, height: "0.8rem", backgroundColor: "#fff" }} />
        <Box sx={{ position: "absolute", bottom: "0.8rem", left: 0, right: 0, height: "0.8rem", backgroundColor: "#fff" }} />
        <Typography variant="caption" sx={{ writingMode: "vertical-rl", textOrientation: "upright", fontSize: "1.7rem", fontWeight: "500", letterSpacing: "0.001em", wordSpacing: "-0.9em", whiteSpace: "nowrap", zIndex: 1 }}>
            {title.length > 8 ? `${title.substring(0, 7)}:` : title}
        </Typography>
    </Box>
);

// 하단 굵/얇 한 줄씩
const BookDesignLineC = ({ width, height, backgroundColor, title }) => (
    <Box sx={{ position: "relative", width, height, backgroundColor, borderRadius: "0.2rem", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 0", overflow: "hidden", border: "1.8px solid #D9D9D9" }}>
        <Box sx={{ position: "absolute", bottom: "0.5rem", left: 0, right: 0, height: "0.9rem", backgroundColor: "#fff" }} />
        <Box sx={{ position: "absolute", bottom: "1.7rem", left: 0, right: 0, height: "0.3rem", backgroundColor: "#fff" }} />
        <Typography variant="caption" sx={{ writingMode: "vertical-rl", textOrientation: "upright", fontSize: "1.7rem", fontWeight: "500", letterSpacing: "0.001em", wordSpacing: "-0.9em", whiteSpace: "nowrap", zIndex: 1, marginBottom: "0.5rem"}}>
            {title.length > 8 ? `${title.substring(0, 7)}:` : title}
        </Typography>
    </Box>
);

// 직선 2개
const BookDesignLineD = ({ width, height, backgroundColor, title }) => (
    <Box
sx={{ position: "relative", width, height, backgroundColor, borderRadius: "0.2rem", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 0", overflow: "hidden", border: "1.8px solid #D9D9D9", }}>
        <Box sx={{ position: "absolute", top: 0, left: "10%", transform: "translateX(-50%)", width: "0.35rem", height: "19rem", backgroundColor: "#fff" }} />
        <Box sx={{ position: "absolute", top: 0, left: "90%", transform: "translateX(-50%)", width: "0.35rem", height: "19rem", backgroundColor: "#fff" }} />
        <Typography variant="caption" sx={{ writingMode: "vertical-rl", textOrientation: "upright", fontSize: "1.7rem", fontWeight: "500", letterSpacing: "0.001em", wordSpacing: "-0.9em", whiteSpace: "nowrap", zIndex: 1, marginBottom: "0.5rem" }}>
            {title.length > 8 ? `${title.substring(0, 8)}:` : title}
        </Typography>
    </Box>
);

// 타원형
const BookDesignLineE = ({ width, height, backgroundColor, title }) => (
    <Box sx={{ position: "relative", width, height, backgroundColor, borderRadius: "0.2rem", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.8rem 0", overflow: "hidden", border: "1.8px solid #D9D9D9", }}>
        <Box sx={{ position: "absolute", top: "50%", transform: "translate(-50%, -50%)", left: "50%", width: "2rem", height: "15rem", borderRadius: "1rem", backgroundColor: "#fff" }} />
        <Typography variant="caption" sx={{ writingMode: "vertical-rl", textOrientation: "upright", fontSize: "1.7rem", fontWeight: "500", letterSpacing: "0.001em", wordSpacing: "-0.9em", whiteSpace: "nowrap", zIndex: 1, marginBottom: "0.5rem", }}>
            {title.length > 8 ? `${title.substring(0, 7)}:` : title}
        </Typography>
    </Box>
);

// 전체 책장
const BookShelf = ({ bookArray, bookStyles }) => (
    <Box sx={{ marginTop: "7.5rem", width: "100%" }}>
        {bookArray.length > 0 ? (
            <>
                <Box sx={{ display: "flex", gap: 2.4, justifyContent: "center", alignItems: "flex-end", height: "15rem" }}>
                    {bookArray.map((book, index) => {
                        const { width, height, backgroundColor, design } = bookStyles[book] || {
                            width: "4rem",
                            height: "14rem",
                            backgroundColor: "#D5ECF2",
                            design: "default",
                        };

                        const props = { width, height, backgroundColor, title: book };

                        if (design === "lineA") return <BookDesignLineA key={index} {...props} />;
                        if (design === "lineB") return <BookDesignLineB key={index} {...props} />;
                        if (design === "lineC") return <BookDesignLineC key={index} {...props} />;
                        if (design === "lineD") return <BookDesignLineD key={index} {...props} />;
                        if (design === "lineE") return <BookDesignLineE key={index} {...props} />;
                        return <DefaultBookDesign key={index} {...props} />;
                    })}
                </Box>
                <Box sx={{ backgroundColor: "#739CD4", height: "2rem", borderRadius: "0.3rem", width: "100%" }} />
            </>
        ) : (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "3.1rem", textAlign: "center", fontWeight: "600", color: "#6D6D6D", marginBottom: "1.8rem" }}>
                    소통하는 독서 플랫폼, <br />
                    <span style={{ color: "#BDE5F1", fontWeight: "600" }}>보보</span>에 오신 것을 환영합니다!
                </Typography>
                <Box sx={{ backgroundColor: "#739CD4", height: "2rem", borderRadius: "0.3rem", width: "100%", marginTop: "3rem" }} />
            </Box>
        )}
    </Box>
);

DefaultBookDesign.propTypes =
BookDesignLineA.propTypes =
BookDesignLineB.propTypes =
BookDesignLineC.propTypes =
BookDesignLineD.propTypes =
BookDesignLineE.propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    backgroundColor: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

BookShelf.propTypes = {
    bookArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    bookStyles: PropTypes.object.isRequired,
};

export default BookShelf;
