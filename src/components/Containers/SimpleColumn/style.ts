export default {
    columnRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "nowrap",
        padding: "0px"
    },
    columnCell: {
        minHeight: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        flexBasis: "100%"
    },
    media_maxWidth_768px: {
        columnRow: {
            flexWrap: "wrap"
        },
        gjsCell: {
            width: "100%",
            display: "block"
        }
    }
}