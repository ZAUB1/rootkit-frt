export default {
    columnRow: {
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap"
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