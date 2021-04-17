import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard"
// import { Link } from 'react-router-dom';

function CommentsDetailPage({ match }) {
  // get the team ID from the URL params (destructure props.match.params)
  const { params: { id } } = match;
  

  // set Team info in state
  const [resource, setResource] = useState([]);
  
  

  useEffect(() => {
    
    // TO DO LATER: change to use teamController.findTeam
    // GET team details by ID
    fetch("http://localhost:3000/resource/listAll")
      .then(response => response.json())
      .then(data => {
        const resource = data.filter(r => r._id === id)
        setResource(resource)
        
      })
      
      .catch(err => {
        console.log('GET FAILED', err);
      })
  }, [])


  

  return (
    <div className="container teamContainer">
      <div className="resourceCard">{resource.map(resource => <div key={resource._id}>
        

        <div className="link">
              <div className="resourceDomain">{resource.domain}</div>
              <div className="resourceTitle">{resource.title}</div>
              <div className="resourceDescription">{resource.description}</div>              
              <img src={resource.img} />
        </div>
        
        
        
        <CommentCard  resourceId={resource._id}></CommentCard>
      </div>)}
    
      </div>
      
    
    
    
  </div>
  
  );
}


export default CommentsDetailPage;