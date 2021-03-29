export default {
    columnRow: {
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap"
    },
    columnCell: {
        margin: "10px",
        minHeight: "75px",
        minWidth: "75px",
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