import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import CommentCard from "./CommentCard"
// import { Link } from 'react-router-dom';

function CommentsDetailPage({ match }) {
  // get the team ID from the URL params (destructure props.match.params)
  const { params: { id } } = match;
  const currentSession = localStorage.getItem("session");
  const [user, setUser] = useState({});
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({		
    text: '',
    resourceId: id
	});

  
  console.log('user',user)

  // set Team info in state
  const [resource, setResource] = useState([]);
  const { register, handleSubmit } = useForm()

  

  useEffect(() => {
    
    // TO DO LATER: change to use teamController.findTeam
    // GET team details by ID
    fetch("http://localhost:3000/resource/listAll")
      .then(response => response.json())
      .then(data => {
        const resource = data.filter(r => r._id === id)
        setResource(resource)
        fetch(`http://localhost:3000/user/${currentSession}`)
          .then(response => response.json())
          .then( user => {
            console.log('user',user);
            setUser(user);
            
          })
      })
      
      .catch(err => {
        console.log('GET FAILED', err);
      })
  }, [count])


  const onSubmit = handleSubmit(() => {
    const _payload = {
      text:values.text,
      resourceId: id,
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
        window.location.reload(false);
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
    <div className="container teamContainer">
      <div className="resourceCard">{resource.map(resource => <div key={resource._id}>
        

        <div className="link">
              <div className="resourceDomain">{resource.domain}</div>
              <div className="resourceTitle">{resource.title}</div>
              <div className="resourceDescription">{resource.description}</div>              
              <img src={resource.img} />
        </div>
        
        
        
        <CommentCard count={count} userinfo={user} resourceId={resource._id}></CommentCard>
      </div>)}
    <div className="commentArea">
    <form onSubmit={onSubmit}>
    <div className="form-inline">
      <label>{user.firstname && ((user.firstname).charAt(0).toUpperCase()+(user.firstname).slice(1))}</label>
      <input type="text" className="form-control" placeholder="Enter Your Comment" id="text" ref={register} onChange={handleChange} style={{ height: "80px",width:"70%"}} />
      <button type="submit" className="btn btn-primary">Enter</button>
    </div>
    
    
    <div className="form-group">
      
    </div>
  </form>
  </div>
      </div>
      
    
    
    
  </div>
  
  );
}


export default CommentsDetailPage;