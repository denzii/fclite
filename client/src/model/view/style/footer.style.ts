import styled from 'styled-components';

export const StyledFooter = styled.footer`
	text-align: center;
    /* margin:auto; */
	text-align:center;
	margin:-2px auto auto;
    position: relative;   
    bottom: 0;
    width:100%;
    & * {
        position: relative;
        border-radius: 5.5%;
        /* margin: inherit; */
        margin: 0;
        padding: 37.5px;
    
        /* neumorphic shadow */
        background:linear-gradient(145deg,#37323F,#534E5B);
	    box-shadow:2px 5px 10px #37323F,4px -2px 16px #666;
    }
`;

