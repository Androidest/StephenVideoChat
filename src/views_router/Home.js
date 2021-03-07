import { Css } from "commons/SharedStyle";
import { usePeerClient } from "providers/PeerClientProvider";
import { useClientUsers } from "providers/PeerClient_UsersProvider";
import { useEffect,useState } from "react";
import styled from "styled-components";

function UserSlot({user}) {

	return (
		<SlotContainer>
			<UserPhoto src={user.photoURL}/>
			<SlotInnerContainer>{user.name}</SlotInnerContainer> 
		</SlotContainer>
	);
}

export default function Home() {
	const {list} = useClientUsers();
	
	return (
		<UserList>
			{list.map((user, index)=>(
				<UserSlot user={user} />
			))}
		</UserList>
	)
}

const UserPhoto = styled.img `
	height: 6ch;
	width: 6ch;
	border-radius: 3ch;
	margin: 3ch;
`;

const SlotContainer = styled.div `
	height: 10ch;
	width: 100%;
	overflow: hidden;
	${Css.flex_row.horz.left}
	${Css.flex_row.vert.center}
`;

const SlotInnerContainer = styled.div `
	flex: 1;
	height: 100%;
	overflow: hidden;
	border-bottom: 2px solid rgba(0,0,0,0.15);
	${Css.flex_row.horz.left}
	${Css.flex_row.vert.center}
`;

const UserList = styled.div `
	height: 100%;
	width: 100%;
	background-color: white;
	${Css.flex_col.vert.top}
	${Css.flex_col.horz.center}
	user-select: text;
`