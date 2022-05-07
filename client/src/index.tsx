import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './model/view/App';
import GlobalStyles from "./model/view/style/global.style";

const renderView = (TargetView: () => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null, targetDomNode: HTMLElement | null) => {
	if (targetDomNode) {
		ReactDOM.createRoot(targetDomNode)
				.render(
					<React.StrictMode>
						<ApolloProvider client={ new ApolloClient({uri: "http://localhost:4000/graphql", cache: new InMemoryCache()}) }>
							<BrowserRouter>
								<GlobalStyles />
								<TargetView />
							</BrowserRouter>
						</ApolloProvider>		
					</React.StrictMode>
				)
		return;
	}

	throw new Error('The target DOM Node which had been specified is currently not defined, no rendering will occur...');	
}


renderView(App, document.getElementById('root'))