import styled from "styled-components";

export const StyledMain = styled.main`
    padding:40px;
    /* neumorphic shadow */
	border-radius:0 0 13px 13px;
	background:linear-gradient(190deg,#37323F,#191133);
	box-shadow:2px 3px 4px #37323F,4px -2px 10px rgb(35, 30, 38);

    /* background-image: linear-gradient(to bottom right rgb(35, 30, 38),rgb(27, 23, 40) ); */
    & p:last-of-type {
        margin-bottom: 0;
        padding:10px;
    }
`