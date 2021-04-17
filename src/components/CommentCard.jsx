import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Route this page
// Render resource
// Put request to upvote and downvote

function CommentCard({ resourceId,userinfo}) {
  const [_comment, setComment] = useState([]);  
  const currentSession = localStorage.getItem("session");
  const [user, setUser] = useState({});
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({		
    text: '',
    resourceId: resourceId
	});
  const { register, handleSubmit } = useForm();

  
  console.log('user',user)   
  console.log('userinfo in comment card',userinfo);
  
  
  let _payload = {};
  if(!resourceId){
     _payload = {};
  } else{
     _payload = { "resourceId": resourceId }
  }
  console.log(_comment);
  
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
        fetch(`http://localhost:3000/user/${currentSession}`)
          .then(response => response.json())
          .then( user => {
            console.log('user',user);
            setUser(user);
            
          })
               
        
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


  const onSubmit = handleSubmit((event) => {
    const _payload = {
      text:values.text,
      resourceId: resourceId,
      userId: user.firstname,
    }
    console.log('this is payload',_payload)
    fetch('http://localhost:3000/comments/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_payload)
    })
      .then(resp => console.log(resp))
      .then(data => {
        // Enter something that stores or handles cookies or JWT
        setCount(count+1);
      })
      .catch(err => console.log('Auth Form won\'t fetch, error:', err));
  })

  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    const valuesCopy = values;
    valuesCopy[id] = value;
    setValues(valuesCopy);
    console.log(values);
  }
  
  
  
  

  return (
    <div className="container">
      { currentSession &&
      <div className="commentArea">
        <form onSubmit={onSubmit}>
          <div className="form-inline">
            <label>{user.firstname && ((user.firstname).charAt(0).toUpperCase()+(user.firstname).slice(1))}</label>
            <input type="text" className="form-control" placeholder="Enter Your Comment" id="text" ref={register} onChange={handleChange} style={{ height: "80px",width:"70%"}} />
            <button type="submit" className="btn btn-primary">Enter</button>
          </div>           
        </form>
      </div>
      }
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
              <div className="resourceDomain">{(comment.userId).charAt(0).toUpperCase()+(comment.userId).slice(1)}</div>
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
