import styled, { createGlobalStyle, css } from "styled-components"

//############### Styled #############################################################################
export const Styled = {
    
}



//############### CSS #############################################################################
const flex_row = css `
    display: flex;
    flex-direction: row;
`;

const flex_col = css `
    display: flex;
    flex-direction: column;
`;

export const Css = {
    //==================== flex row =====================
    flex_row: {
        horz: {
            left : css ` ${flex_row} justify-content: flex-start;`,
            center : css ` ${flex_row} justify-content: center;`,
            right : css ` ${flex_row} justify-content: flex-end;`,
            in_space : css ` ${flex_row} justify-content: space-between;`,
            in_out_space : css ` ${flex_row} justify-content: space-evenly;`
        },
        
        vert: {
            top : css `align-items:flex-start;`,
            center : css `align-items:center;`,
            bottom : css `align-items:flex-end;`,
            stretch : css `align-items:stretch;`
        }
    },

    //==================== flex col =====================
    flex_col: {
        vert: {
            top : css ` ${flex_col} justify-content: flex-start;`,
            center : css ` ${flex_col} justify-content: center;`,
            bottom : css ` ${flex_col} justify-content: flex-end;`,
            in_space : css ` ${flex_col} justify-content: space-between;`,
            in_out_space : css ` ${flex_col} justify-content: space-evenly;`
        },
        
        horz: {
            left : css `align-items:flex-start;`,
            center : css `align-items:center;`,
            right : css `align-items:flex-end;`,
            stretch : css `align-items:stretch;`
        }
    },
}



//############### Global Style #####################################################################
export const GlobalStyle = createGlobalStyle `
    html, body, #root {
        height: 100%;
        width: 100%;
	    overflow: hidden;
    }

    body {
        margin: 0;
        background-color: rgb(255, 255, 255);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`; 