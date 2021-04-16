import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Route this page
// Render resource
// Put request to upvote and downvote

function ResourceCard({ teamId }) {
  const [_resource, setResource] = useState([]);
  const [_backupResource, setBackupResource] = useState([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);
  // const [_upvote, setUpvote] = useState({});
  console.log("teamID",teamId);
  console.log("resource",_resource);
  let _payload = {};
  if(!teamId){
     _payload = {};
  } else{
     _payload = { "teamId": teamId }
  }
  console.log(_payload);
  
  useEffect(() => {
    console.log(_payload)
    fetch("http://localhost:3000/resource/list", {
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
        console.log('data',data);
        data.sort((a,b) => (a.votes < b.votes) ? 1: -1);
        const tag = data.map( el =>  el.category);
        console.log('tags',getUnique(tag));
        setTags(getUnique(tag));
        setResource(data);
        setBackupResource(data);
        console.log('_resource:', _resource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });

    console.log("TEAM ID in resource card: ", teamId)
  }, [count]);

  function getUnique(arr){
    const result = [];
    arr.forEach( el => {
      if(!result.includes(el)) result.push(el);
    });
    return result;
  }

  function getCategory(event){
    const category = event.target.innerHTML;
    console.log(category)
    if (category === 'All') setResource(_backupResource);
    else {
    const newResource = _backupResource.filter(res => {
      if(res.category === category) return true;
      return false;
    })
    console.log('filter result',newResource);
    setResource(newResource)
    }
  }
  //get resource id
  //get current resource vote
  //update state
  function handleUpvote(event) {

    console.log('COUNT', count)
    event.preventDefault();
    const id = event.target.id;
    console.log(id);
    
    const votes = Number(event.target.getAttribute('votes'));
    // console.log('HERE',teamid);
    const payload = {
      "_id": id,
      "votes": votes,
      "upvote": true
    }
    console.log('payload:', payload)
    // POST the payload to database
    fetch("http://localhost:3000/resource/upvote", {
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
        const newResource = _resource;
        for (let i = 0; i < newResource.length; i++) {
          if (newResource[i].link === data.link) {
            newResource[i] = data;
          }
        }
        setCount(count + 1);
        setResource(newResource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }

  function handleDownvote(event) {

    console.log('COUNT', count)
    event.preventDefault();
    const id = event.target.id;

    
    const votes = Number(event.target.getAttribute('votes'));
    // console.log('HERE',teamid);
    const payload = {
      "_id": id,
      "votes": votes,
      "upvote": false
    }
    console.log('payload:', payload)
    // POST the payload to database
    fetch("http://localhost:3000/resource/upvote", {
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
        const newResource = _resource;
        for (let i = 0; i < newResource.length; i++) {
          if (newResource[i].link === data.link) {
            newResource[i] = data;
          }
        }
        setCount(count + 1);
        setResource(newResource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }

  function deleteResource(event){
    console.log(event.target.value);
    const payload = {_id: event.target.value}
    fetch("http://localhost:3000/resource/delete", {
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
      <div className= "tagContainer">
        <h2>Filter:</h2>             
        <div className="meta" onClick={getCategory}>
          <div>All</div>
          { tags.map((tag) =>
          <div>{tag}</div>
          )}          
        </div>        
      
      </div>
      {_resource.map((resource,index) => (
        <div className="resourceContainerRS">
        
        <div
          className="resourceCard"
          key={resource._id + index}
        >
          <div className="deleteContainer">
          <button className="deleteResource" value={resource._id} onClick={deleteResource}>x</button>
          </div>
          <div className="resourceArea">
            <div className="votes">
              <div className="voteCount">{resource.votes}</div>
              <div className="actions">
                <button><i onClick={handleUpvote}  votes={resource.votes} id={resource._id} class='bx bxs-upvote'></i></button>
                <button><i onClick={handleDownvote} votes={resource.votes} id={resource._id} class='bx bxs-downvote' ></i></button>
              </div>
            </div>
            <div className="link">
              {/* <Link to={resource.link}>{resource.link}</Link> */}
              <a target=" _blank" href={resource.link} >
              <div className="resourceTitle">{resource.title}</div>
              <div className="resourceDescription">{resource.description}</div>              
              <img src={resource.img} />
              </a>
            </div>
          </div>
          
          <div className="meta" onClick={getCategory}>
            <div>{resource.category}</div>
          </div>
        </div>
        
        </div>
        
      ))}
    </div>
  );
}

export default ResourceCard;

