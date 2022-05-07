import { StyledFooter } from "./style/footer.style";
import { StyledHeader } from "./style/header.style";
import { StyledHero } from "./style/hero.style";
import { StyledMain } from "./style/main.style";
import TabContainer from "./TabContainer";
import _ from './keyableFragment';

const Root = () => {
	const spaSectionKeys = ["Demo"];
	return <>
		<div className="app">
			<StyledHeader role="banner" className={'app__header'} aria-labelledby='header__description'>
				<h2 className='header__description hidden'> Navigation links pertaining to the various sections of the page. </h2>
					<a className="menu__anchor" href="/#" title='Scroll to Top'>
						<h3>FC Lite</h3>
					</a>
					<nav className="header__nav">
						<ul className="nav__menu">
							{spaSectionKeys.map((key: string) => <_ key={`menu__element-${key}`}>
								<li className="menu__element">
									<a className="element__anchor" title={`Scroll to ${key} section`} href={ `#${key}`}> 
										<h4>{key}</h4>
									</a>
								</li>
							</_>)}
						</ul>
					</nav>
			</StyledHeader>
			<hr/>
			<StyledHero role="img" className={"app__hero"} aria-labelledby='hero__description'>
				<h2 className='hero__description hidden' id="hero__description"> Presentational hero section</h2>
				<article className="hero__cta">
					<div role="presentation" className="cta__content">
						<h1 className="hero__title">FilmChain is awesome :)</h1>
						<h3 className="hero__body">This is just a tribute to that fact! Feel free to use the tabs below to view the demo...</h3>
					</div>
				</article>
			</StyledHero>
			<hr />
			<StyledMain className={"app__main"} id="Demo" aria-labelledby='demo__description'>
				<h2 className='demo__description hidden' aria-busy="false"> 
					Views which had been requested for the task are represented with the tabs below.
				</h2>
				<TabContainer className="demo__tab-container"/>
        	</StyledMain>	
			<hr/>
			<StyledFooter role="banner" className={"app__footer"} aria-labelledby='footer__description'> 
				<h2 className='footer__description hidden'> Footer info such as author and copy-right notice. </h2>
				<p className="footer__text"> Deniz Arca Submission 04/05/2022 </p>
			</StyledFooter>
		</div>
	</>
}

export default Root;