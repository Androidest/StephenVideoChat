import styled from 'styled-components';
import { Css, GlobalStyle } from 'commons/SharedStyle';
import AuthProvider from 'providers/AuthProvider'; //登录验证的逻辑组件
import PeerClientProvider from 'providers/PeerClientProvider'; //Peer 节点组件
import PeerServerProvider from 'providers/PeerServerProvider'; //特殊的 Peer 节点，节点服务器

import AppRouter from 'views_router/AppRouter';

function App() {
  	return (
		<AppContainer>
			<GlobalStyle/>
			<AuthProvider>
				<PeerServerProvider>
					<PeerClientProvider>

						<AppRouter />

					</PeerClientProvider>
				</PeerServerProvider>
			</AuthProvider>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	background-color: #ffffff;
	width: 100%;
	height: 100%;
	overflow: hidden;
	${Css.flex_col.horz.center}
	${Css.flex_col.vert.center}
	background-image: linear-gradient(150deg,  #4f719b,  #583056 , #003e3e);
`

export default App;
