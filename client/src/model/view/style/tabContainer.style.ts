import styled from 'styled-components';

export const StyledTabContainer = styled.div`
    height: auto;
    min-height: 400px;
    /* margin: 3.5rem auto 1.5rem; */
    padding: 2rem 1rem;
    color: #E8F0F2;
    & .tab-container__nav {
        width: 60%;
        margin: 0 auto 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid;
        border-radius: 2rem;
        padding-left: 0px;
        
        & *{
            width: 50%;
            padding: 1rem;
            list-style: none;
            text-align: center;
            cursor: pointer;
            transition: all 0.25s;
            border-bottom-left-radius: 2rem;
            border-top-left-radius: 2rem;
            &:nth-child(2) {
                border-radius: 0;
                border-bottom-right-radius: 2rem;
                border-top-right-radius: 2rem;
            }
            &:hover{
                background: rgba(115, 109, 121, 0.45);
            }
            &.active{
                background:  rgb(27, 19, 51);
            }
        }
        
    }
    // style only those which have the suffix specified in the wildcard
    & [class$="-tab"] {
        font-size: 1.5rem;
        text-align: center;
    }
`;

