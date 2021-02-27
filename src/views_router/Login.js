import { useAuth } from "providers/AuthProvider";
import { Css } from "commons/SharedStyle";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { useChatUser } from "providers/ChatUserProvider";
import LoginSpace from "views/LoginSpace";
import LoginPanel1 from "views/LoginPanel1";

export default function Login() {
	const auth = useAuth();
    const cUser = useChatUser();

	return (
		<LoginSpace>
            <LoginPanel1/>
		</LoginSpace>
	)
}


//======================= style ==========================

