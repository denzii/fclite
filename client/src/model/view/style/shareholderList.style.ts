import styled from "styled-components";

export const StyledShareHolderList = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: row;
    & fieldset {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 580px;

        & button {
        margin-top:20px;
        
        }
        
    }
    & input {
         display: flex;
    }   
    & form {
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
    }
    

    & fieldset {
        border-radius: 0.5rem;
        display:flex;
        flex-direction:column;
        justify-content:center;
    }

`