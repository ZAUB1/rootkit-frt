export default {
    "_nav ul": {
        width: "100%",
        padding: 0,
        margin: 0,
        listStyleType: "none"
    },
    
    "_nav ul li": {
        width: "100%",
        display: "inline-block",
        backgroundColor: "#E64A19"
    },
    
    "_nav a": {
        display: "block",
        padding: "0 10px",
        color: "#FFF",
        fontSize: "20px",
        lineHeight: "60px",
        textDecoration: "none"
    },
    
    "nav a:hover": { 
        backgroundColor: "#000000"
    },
    
    "nav ul ul": {
        display: "none",
        position: "absolute", 
        top: "60px" /* the height of the main nav */
    },

    "nav ul li:hover > ul": {
        display: "inherit",
    },
    
    "nav ul ul li": {
        float: "none",
        display: "list-item",
        position: "relative"
    },
    
    "nav ul ul ul li": {
        position: "relative",
        top: "-60px", 
        left: "170px"
    },
    
    "_li > a:after": { content:  ' +' },
    "_li > a:only-child:after": { content: '' }
    
}