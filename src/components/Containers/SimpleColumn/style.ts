export default {
    columnRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "nowrap",
        padding: "10px"
    },
    columnCell: {
        minWidth: "100px",
        minHeight: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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