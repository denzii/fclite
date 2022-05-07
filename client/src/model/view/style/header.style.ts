import styled from 'styled-components';

export const StyledHeader = styled.header`
	display:flex;
	align-items:center;
	justify-content:space-between; 
    
    position: relative;
	z-index:1;
	background-color:rgb(35, 30, 38);
	padding-bottom:15px;
	border-radius:0 0 13px 13px;
	background:linear-gradient(145deg,#37323F,#534E5B);
	box-shadow:2px 5px 10px #37323F,4px -2px 16px #666;

    padding-left: 150px;
    & .menu__anchor{    
        /* all: unset; */
        /* height: inherit; */
        /* important, but not emphasized enough to be bold, so explicitly set to "kind of bold" but not really */
        font-weight:500;
        /* undo the default anchor styling which the browsers may apply */
        text-decoration: none;
        /* never break any text from the middle*/
        white-space: nowrap;
        /* scroll to the anchor but 100px above it, needed as the fixed position navbar covers the beginning of the sections once scrolled to */
        scroll-margin-top: 100px;

        /* underline element onhover*/
        &:hover{ text-decoration: underline; }
        & h3, & h4{
            font-weight:500;
	        white-space:nowrap;
	        scroll-margin-top:100px;
	        font-feature-settings:normal,"c2sc";
        }
    }

    & .header__nav{
        width: 575px;
        height: inherit;
        display: flex;
        /* align items in the center items along the cross axis (the exact axis depends on which one is the main axis and that is determined by flex-direction) */
        align-items: center;
        /* align items according to the space around them along the main axis (determined by flex-direction) */
        /* get each item contained inside to be pushed to the center */
        justify-content: space-around; 
        all: unset;
        height: inherit;
        & .nav__menu{
            padding-right:250px;
            display:flex;
	        align-items:center;
            justify-content:space-around;
            padding-top:2.5px;
            & .menu__element{
                list-style-type: none;
                & .element__anchor{
                    text-decoration: none;
                    &:hover{ text-decoration: underline; }
                }
            }
        }
    }
    
`;

