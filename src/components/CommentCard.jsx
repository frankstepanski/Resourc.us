import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Route this page
// Render resource
// Put request to upvote and downvote

function CommentCard({ resourceId }) {
  const [_comment, setComment] = useState([]);
  // const [_backupResource, setBackupResource] = useState([]);
  const [count, setCount] = useState(0);
  // const [tags, setTags] = useState([]);
  // const [_upvote, setUpvote] = useState({});

  let _payload = {};
  if(!resourceId){
     _payload = {};
  } else{
     _payload = { "resourceId": resourceId }
  }
  console.log(_payload);
  
  useEffect(() => {
    console.log(_payload)
    fetch("http://localhost:3000/comments/list", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setComment(data);
        console.log('_resource:', _comment)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });

    console.log("Resource ID in comment card: ", resourceId)
  }, [count]);

  //get resource id
  //get current resource vote
  //update state

  function deleteComment(event){
    console.log(event.target.value);
    const payload = {_id: event.target.value}
    fetch("http://localhost:3000/comments/delete", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data sent back:', data);
        
        setCount(count + 1);
        // setResource(newResource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }
  
  return (
    <div className="container">
      {_comment.map((comment,index) => (
      <div className="resourceContainerRS">
        <div
          className="resourceCard"
          key={comment._id + index}
        >
          <div className="deleteContainer">
          <button className="deleteResource" value={comment._id} onClick={deleteComment}>x</button>
          </div>
          <div className="resourceArea">
            <div className="link">
              {/* <Link to={resource.link}>{resource.link}</Link> */}
              <div className="resourceDomain">{comment.userId}</div>
              <div className="resourceTitle">{comment.text}</div>
            </div>
          </div>
        </div>
      </div>
        
      ))}
    </div>
  );
}

export default CommentCard;
