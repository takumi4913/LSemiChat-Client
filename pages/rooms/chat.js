import * as React from "react";
import Talk from "talkjs";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        if(process.browser) {
            this.session = this.makeTalkSession();
        }
        this.chatContainerRef = React.createRef();
    }
    async makeTalkSession() {
        await Talk.ready;
        const me = new Talk.User({
            id: "765432",
            name: "Alice",
            role: "buyer"
        });
        return new Talk.Session({
            appId: "YOUR_APP_ID",
            me
        }); 
    }

    async componentDidMount() {
        const session = await this.session;

        const conversation = session.getOrCreateConversation("87654");
        conversation.setParticipant(session.me);

        const chatbox = session.createChatbox(conversation);
        chatbox.mount(this.chatContainerRef.current);
    }

    render() {
        return <div>
            <style jsx>{`
            .chat-container {
                height: 500px;
                width: 400px;
            }
            `}</style>
            <div>Welcome to TalkJS on Next.js!</div>
            <div className="chat-container" ref={this.chatContainerRef}>loading chat...</div>
        </div>
    }
}