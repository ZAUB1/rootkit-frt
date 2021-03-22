export default {
    buttonsContainer: {
        position: "relative",
        display: "inline-flex",
        outline: 0,
        height: "36px",
        minWidth: "64px",
        padding: "0 16px",
        backgroundColor: "{ backgroundColor }",
        borderRadius: "{ borderRadius }",
        color: "{ fontColor }",
        cursor: "pointer",
        userSelect: "none",
        textDecoration: "none",
        //letterSpacing: ".0892857143em",
        //textIndent: ".0892857143em",
        textTransform: "{ uppercase }",
        fontWeight: "500",
        transitionDuration: ".28s",
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
        whitespace: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        hover: {
            backgroundColor: "#c7c7c7"
        },
    },
}