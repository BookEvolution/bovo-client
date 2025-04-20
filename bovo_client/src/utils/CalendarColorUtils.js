export const hashStringToNumber = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };
    
    export const getPastelColor = (bookName) => {
        const hash = hashStringToNumber(bookName);
        const hue = Math.abs(hash) % 360;
        const saturation = 70;
        const lightness = 70;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
    
    export const getSessionColor = (bookName) => {
        const stored = sessionStorage.getItem("bookColors");
        const storedColors = stored ? JSON.parse(stored) : {};
    
        if (!storedColors[bookName]) {
        const color = getPastelColor(bookName);
        storedColors[bookName] = color;
        sessionStorage.setItem("bookColors", JSON.stringify(storedColors));
    }
    return storedColors[bookName];
};
