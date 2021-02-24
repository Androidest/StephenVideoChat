import * as tf from '@tensorflow/tfjs'
import * as WebCam from 'react-webcam' 
import styled from 'styled-components';
import { GlobalStyle } from 'modules/SharedStyle';
import { AuthProvider } from 'modules/Auth';
import AppRouter from 'router/AppRouter';

function App() {
  	return (
		<AppContainer>
			<GlobalStyle/>
			<AuthProvider>

				<AppRouter />

			</AuthProvider>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	background-color: #ffffff;
	width: 100%;
	height: 100%;
`

export default App;
