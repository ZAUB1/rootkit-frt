export default {
    editorTraitContainer: {
        position: "absolute",
        height: "100vh",
        right: "0px",
        minWidth: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    editorTraitMenu: {
        position: "absolute",
        height: "50%",
        top: "10%",
        right: "3%",
        width: "300px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 16px 64px 0px, rgba(0, 0, 0, 0.01) 0px 0px 0px 1px",
        transition: "box-shadow .1s linear, opacity .1s ease-in-out",
    },
    header: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40px",
        fontSize: "15px"
    },
    traits: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px",
        fontSize: "15px",
    },
    label: {
        marginRight: "15px",
        width: "25%",
        fontSize: "13.5px"
    },
    inputField: {
        width: "70%",
        borderRadius: "5px",
        boxShadow: "none",
        padding: "5px 7.5px",
        marginLeft: "10px",
        border: "1px solid #30364c",
        background: "none",
        fontSize: "14px"
    },
    trait: {
        display: "flex",
        alignItems: "center",
        width: "90%",
        margin: "5px 0px"
    }
};