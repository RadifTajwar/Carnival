import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import CommentIcon from '@mui/icons-material/Comment';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './Chat.css';
const Chat = () => {
    const [visible, setVisible] = useState(false)
    const items = [
        {
          id: 1,
          title: 'headset 1',
          description: "nlf; hgibklvop'p;k",
          imagePath: '/assets/images/1001.png',
          price: 1650,
        },
        {
          id: 2,
          title: 'headset 2',
          description: "nlf; hgibklvop'p;k",
          imagePath: '/assets/images/1002.png',
          price: 1650,
        },
        {
          id: 3,
          title: 'headset 3',
          description: "nlf; hgibklvop'p;k",
          imagePath: '/assets/images/1003.png',
          price: 1650,
        },
        {
          id: 4,
          title: 'headset 4',
          description: "nlf; hgibklvop'p;k",
          imagePath: '/assets/images/1004.png',
          price: 1650,
        },
        {
          id: 5,
          title: 'headset 5',
          description: "nlf; hgibklvop'p;k",
          imagePath: '/assets/images/1005.png',
          price: 1650,
        },
        {
          id: 6,
          title: 'headset 6',
          description: "nlf; hgibklvop'p;k",
          imagePath: '/assets/images/1006.png',
          price: 1650,
        },
      ];

    const [typing,setTyping]=useState(false);
    const [messages,setMessages] = useState([
        {
            message :"Hello, I am Chatgpt!",
            sender:""
        }
    ]);
const handleSend = async (message)=>{
    const newMessage={
        message:message,
        sender:"user",
        direction:"outgoing"
    }
    const newMessages = [...messages,newMessage];
    setMessages(newMessages);

    setTyping(true);
    await processMessageToChatGpt(newMessages);
}

async function processMessageToChatGpt(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
        let role = '';
        if (messageObject.sender === "ChatGpt") {
            role = "assistant"
        } else {
            role = "user"
        }
        return {
            role: role,
            content: messageObject.message
        }
    });
    const systemMessage = {
        role: "system",
        content: "I'd like to introduce you to our products: " +
        items.map(item=> '${item.title}:$${item.price}').join('\n')
    }
    const apiRequestBody = {
        "model": "gpt-4",
        "messages": [
            systemMessage,
            ...apiMessages
        ]
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        });

        const data = await response.json();
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages(
            [...chatMessages,{
                message:data.choices[0].message.content,
                sender:"ChatGpt"
            }

            ]);
            setTyping(false);
    } catch (error) {
        console.error("Error:", error);
    }
}
    
return (
    
        <div className="App">

    { visible &&(
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', height: '500px', width: '500px', zIndex: '999'}} >
            <button className='btn btn-danger ' style={{marginBottom:"-8px"}} onClick={()=>{setVisible(!visible)}}>Close</button>
                <MainContainer style={{borderRadius:"15px" }}>
                    <ChatContainer>
                        <MessageList
                            typingIndicator={typing ? <TypingIndicator content="ChatGpt is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />;
                            })}
                        </MessageList>
                        <MessageInput placeholder='Type msg here' onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
    )
        
    }
    {
        !visible &&(
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '999' }}>
            <div className="icon" style={{ display: 'flex', alignItems: 'center', backgroundColor: "green", borderRadius: "20px", padding: "10px", border: "1px solid black" ,cursor:"pointer"}} onClick={()=>{setVisible(!visible)}}>
              <span style={{ marginRight: "10px" }}>Can I help?</span>
              <CommentIcon color="danger" fontSize="large" />
            </div>
          </div>
        )
    }
            


        </div>
    
                        
);
}

export default Chat
