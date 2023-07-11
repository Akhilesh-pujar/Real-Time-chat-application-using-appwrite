import { Databases } from "appwrite"
import React,{useState,useEffect} from "react";
import { COLLECTION_ID, DATABASE_ID, databases } from "../apwriteConfig";

function Room() {

  const [message,setmessages] = useState([])
  useEffect(()=>{
  getMessages();
 },[])
  const getMessages = async()=>{
    const response = await databases.listDocuments(DATABASE_ID,COLLECTION_ID)
    console.log('Response:',response)

    setmessages(response.documents)

  } 
  return (
    <div>
      <div>
        {message.map(message=>{
          <div key={message.$id}>
            <div>
              <p>{message.$createdAt}</p>
            </div>
            <div>
            <span>{message.body}</span>
              </div>
          
          </div>
        })}
        <h1>ufsdc</h1>
      </div>
    </div>
  )
}

export default Room
