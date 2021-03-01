import * as tf from '@tensorflow/tfjs'
import * as WebCam from 'react-webcam' 
import styled from 'styled-components';
import { Css, GlobalStyle } from 'commons/SharedStyle';
import { AuthProvider } from 'providers/AuthProvider';
import { ChatUserProvider } from 'providers/ChatUserProvider';

import AppRouter from 'views_router/AppRouter';

function App() {
  	return (
		<AppContainer>
			<GlobalStyle/>
				<AuthProvider>
					<ChatUserProvider>

						<AppRouter />

					</ChatUserProvider>
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
