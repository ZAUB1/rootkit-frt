export default {
    columnRow: {
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        border: "{ border }",
        borderRadius: "{ borderRadius }"
    },
    columnCell: {
        margin: "10px",
        minHeight: "75px",
        minWidth: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "{ border }",
        borderRadius: "50%"
    },
    media_maxWidth_768px: {
        columnRow: {
            flexWrap: "wrap"
        },
    }
}