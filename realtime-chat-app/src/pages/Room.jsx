import {useState,useEffect} from "react";
import client,{ COLLECTION_ID, DATABASE_ID, databases } from "../apwriteConfig";
import Navbar from "../components/Navbar";

import {ID , Query,Permission,Role} from "appwrite"
import {Trash2} from 'react-feather'

import { userAuth } from "../utils/AuthContext";

function Room() {

  const [message,setmessages] = useState([])
  const [messageBody,setMessageBody] =useState('')
  const {user} = userAuth()


  useEffect(()=>{
  getMessages();

   const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.document `, response=>{

    console.log('Real time',response)

    if(response.events.includes("databases.*.collections.*.document.*.create")){
    console.log('A mmessage was created')
    }
    if(response.events.includes("databases.*.collections.*.document.*.delete")){
      console.log('A mmessage was deleted')
      }
  });
  console.log(unsubscribe )
  return ()=>{
    unsubscribe ();
  };

 },[]);

const handlesubmit = async(e)=>{
  e.preventDefault()

  const permissions=[
    Permission.write(Role.user(user.$id)),
  ]

  const payload = {
    user_id:user.$id,
    username:user.name,
    body:messageBody
  }

  const response = await databases.createDocument(
    DATABASE_ID,
    COLLECTION_ID,
    ID.unique(),
    payload,
    permissions
 

  )
 
  console.log('RESPONSE:', response)
  setMessageBody('')
}


  const getMessages = async()=>{
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(100),
      ]
      )
      console.log(response.documents)
    setmessages(response.documents)

  } 


  const deleteMessage = async (message_id)=>{
    databases.deleteDocument(DATABASE_ID,COLLECTION_ID, message_id);

    // setmessages(prevState => message.filter(message=>message.$id !== message_id))
  }
  return (
    <main className="container">
      {/* <Link to="/login">
      <button>Login</button>
      </Link> */}
      <Navbar/>
      <div className="room--container">
      
      <form id="message--form" onSubmit={handlesubmit}>
      <div>
        <textarea required maxLength="1000"  placeholder="say something.."
        onChange={(e)=>{setMessageBody(e.target.value)}}
        value={messageBody}
        >
          
        </textarea>
      </div>
      <div className="send-btn--wrapper">
        <button className="btn btn--secondary" type="submit" value="send">send</button>
      </div>

      </form>


      <div>
        {message.map(messag => (

          <div key={messag.$id} className="message--wrapper">

            <div className="message--header">
              <small className="message-timestamp">{new Date(messag.$createdAt).toLocaleString()}</small>

              <Trash2 className="delete--btn" onClick={() => {deleteMessage(messag.$id)}}/>

            </div>

            <div className={"message--body" + (messag.user_id === user.$id ? ' message--body--owner' : '')}>
            <span>{messag.body}</span>
            </div>
          
          </div>
        ))}
      
      </div>

      </div>



 
    </main>
  )
}

export default Room
