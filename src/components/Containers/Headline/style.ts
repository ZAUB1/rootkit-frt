import colStyle from "../SimpleColumn/style";

export default {
    ...colStyle,
    mainCont: {
        minHeight: "600px",
        width: "100%",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: "50%",
        width: "45%"
    },
    textCont: {
        display: "flex",
        flexDirection: "column",
        width: "45%",
        alignItems: "center",
        textAlign: "center"
    }
};