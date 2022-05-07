import styled from "styled-components";

export const StyledMainForm = styled.div`
    & select {
        margin-top:15px;
    }
    & button {
        margin-top:20px;
    }
    & input {
         display: flex;
    }   
    & form {
        & input, & textarea {
            border-radius: 20px;
            background: #e0e0e0;
            box-shadow: inset 5px 5px 6px #8d8d8d,
                        inset -5px -5px 6px #ffffff;

        }

        & button {
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.25s;
            
            &:hover{
                background: rgba(115, 109, 121, 0.45);
            }
            &.active{
                background:  rgb(27, 19, 51);
            }
            border-radius: 35px;
        }
        
        display: flex;
        justify-content: center;
    }
    

    & fieldset {
        border-radius: 0.5rem;
        width: 500px;
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
    & label {
        padding-bottom:15px;
        padding-top: 15px;
        & abbr {
            color: red;
        }
    }
`