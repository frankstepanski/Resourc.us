import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard"
// import { Link } from 'react-router-dom';

function CommentsDetailPage({ match }) {
  // get the team ID from the URL params (destructure props.match.params)
  const { params: { id } } = match;

  // set Team info in state
  const [resource, setResource] = useState([]);

  // set Team Resources in state
  const [resourceComments, setResourceComments] = useState([]);

  useEffect(() => {
    // TO DO LATER: change to use teamController.findTeam
    // GET team details by ID
    fetch("http://localhost:3000/resource/listAll")
      .then(response => response.json())
      .then(data => {
        const resource = data.filter(r => r._id === id)
        // console.log('teams data:', data)
        // console.log('individual team data:', team)
        setResource(resource)
      })
      // .then(() => {
      //   // // GET resources that belong to current team by team ID
      //   // fetch("http://localhost:3000/comments/list")
      //   //   .then(response => response.json())
      //   //   .then(data => {
      //   //     const currentComments = data.filter(c => c.resourceId === id)
      //   //     // console.log("resources: ", data)
      //   //     setResourceComments(currentComments)
      //   //   })
      // })
      .catch(err => {
        console.log('GET FAILED', err);
      })
  }, [])

  return (
    <div className="container teamContainer">
      <div className="teamCard teamHero">{resource.map(r => <div key={r._id}>
        <header>
          <div className="mask"></div>
          <h1>{r.title}</h1>
        </header>
        <section>
        <div className="meta">
          <div>{r.category}</div>
        </div>
        <article><p>{r.description}</p></article>  
        </section>
        
        <CommentCard resourceId={r._id}></CommentCard>
      </div>)}</div>
    </div>
  );
}


export default CommentsDetailPage;