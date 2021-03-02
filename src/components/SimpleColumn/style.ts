export default {
    columnRow: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "stretch",
        flexWrap: "nowrap",
        padding: "10px"
    },
    columnCell: {
        minHeight: "75px",
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