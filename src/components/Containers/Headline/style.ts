import colStyle from "../SimpleColumn/style";

export default {
    ...colStyle,
    mainCont: {
        minHeight: "600px",
        width: "100%",
        background: "url('https://www.goodfreephotos.com/albums/austria/other-austria/mountain-valley-landscape-with-stream-running-through.jpg')",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
};