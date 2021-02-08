import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {sendMessageAC, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";


const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)
    let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id}/>)
    let newMessageBody = state.newMassageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageAC());
    }
    let onSendMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyAC(body));
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div> {messagesElements}</div>
                <div><textarea onChange={onSendMessageChange} value={newMessageBody} placeholder={'Enter your message'}></textarea></div>
                <div>
                    <button onClick={onSendMessageClick}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;