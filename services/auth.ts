import { deleteRequest, postRequest, getRequest } from './common'
import React from "react";
import Talk from "talkjs";

export interface AuthInfo {
  userId: string,
  password: string,
}

export class AuthService {
  private static _instance: AuthService
  static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService()
    }
    return AuthService._instance
  }

  public async login(body: AuthInfo): Promise<any> {
    const reqBody = {
      user_id: body.userId,
      password: body.password
    }
    return postRequest("/login", reqBody)
  }

  public async logout(): Promise<any> {
    return deleteRequest("/logout")
  }
}

export class Home extends React.Component{
  constructor(props){
    super(props);

    if(process.browser){
      this.session=this.makeTalkSession();
    }
    this.chatContainerRef=React.createRef();
  }

  public async makeTalkSession(){
    await Talk.ready;
    const me=new Talk.User({
      id:"5",
      name:"SampleMan",
      role:"buyer"
    });
    return new Talk.Session({
      appId:"tw3Ra4qD",
      me
    });
  }

  public async componentDidMount(){
    const session=await this.session;
    const coversation=session.getOrCreateConversation("87654");
    conversation.setParticipant(session.me);

    const chatbox=session.createChatbox(conversation);
    chatbox.mount(this.chatContainerRef.current);
  }
}