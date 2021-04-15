import React, { useEffect, useState } from "react";
import { Link, Route } from 'react-router-dom';


function HomePage() {
  const [_teams, setTeams] = useState([]);
  const [_resourceOne,setReourceOne] = useState([]);
  const [_resourceTwo,setReourceTwo] = useState([]);
  const [_resourceThree,setReourceThree] = useState([]);
  const [_resourceFour,setReourceFour] = useState([]);
  
  
  
  async function fetchedData() {
    const teamData = await fetch("http://localhost:3000/teams/list");
    const teams = await teamData.json();
    const firstFourTeams = teams.slice(0,4);
    firstFourTeams.map(async (team,index) => {
      const resources = await fetch("http://localhost:3000/resource/list",{
        method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({"teamId": team._id}),
      })
      const res = await resources.json();
      res.sort((a,b) => (a.votes < b.votes) ? 1: -1);        
      const resource = res.slice(0,4);

      if (index === 0) setReourceOne(resource);
      if (index === 1) setReourceTwo(resource);
      if (index === 2) setReourceThree(resource);
      if (index === 3) setReourceFour(resource);
    })
    
    setTeams(firstFourTeams);
    
    
  }

  useEffect(() => {
    fetchedData();
  }, [])

  
  const colors = [
    ['#ff4b1f', '#ff9068'],
    ['#16BFFD', '#CB3066'],
    ['#1D4350', '#A43931'],
    ['#a80077', '#66ff00'],
    ['#ff4b1f', '#1fddff'],
    ['#0D0D0D', '#434343'],
    ['#4B79A1', '#283E51'],
    ['#834d9b', '#d04ed6'],
    ['#0099F7', '#F11712'],
    ['#B24592', '#F15F79'],
    ['#673AB7', '#512DA8'],
    ['#005C97', '#363795']
  ]
  function colorPicker() {
    return Math.floor(Math.random() * colors.length);
  } 

    
  
  
  return (
    <div className="container">
      <h1>Home Page</h1>
      {
        _teams.map((team,index) => {
          return(
          <div className="teamCardHome" key={team.name}>
          <header>
            <div className="mask" style={{ background: `linear-gradient(${colors[colorPicker()][0]}, ${colors[colorPicker()][1]})` }}></div>
            <h1>{team.name}</h1>          
          </header>                 
          
           <div className="resourceContainer">      
            {index ===0 &&  _resourceOne.map((res) => {
              return(
              <div className="resourceCardHome" key={res._id + index}>
                <div className="link">
                {/* <Link to={res.link}>{res.link}</Link> */}
                <a href={res.link} target='_blank'>
                    <div className="resourceDomain">{res.domain}</div>
                    <div className="resourceTitle">{res.title}</div>
                    {/* <div className="resourceDescription">{res.description}</div>               */}
                    <img src={res.img} />
                </a>
                </div>
              </div>
              )}
            )}
            {index ===1 &&  _resourceTwo.map((res) => {
              return(
                <div className="resourceCardHome" key={res._id + index}>
                  <div className="link">
                    {/* <Link to={res.link}>{res.link}</Link> */}
                    <a href={res.link} target='_blank'>
                    <div className="resourceDomain">{res.domain}</div>
                    <div className="resourceTitle">{res.title}</div>
                    {/* <div className="resourceDescription">{res.description}</div>               */}
                    <img src={res.img} />
                   </a>
                  </div>
                </div>
              )}
            )}
            {index ===2 &&  _resourceThree.map((res) => {              
              return(
                <div className="resourceCardHome" key={res._id + index}>
                  <div className="link">
                    {/* <Link to={res.link}>{res.link}</Link> */}
                    <a href={res.link} target='_blank'>
                    <div className="resourceDomain">{res.domain}</div>
                    <div className="resourceTitle">{res.title}</div>
                    {/* <div className="resourceDescription">{res.description}</div>               */}
                    <img src={res.img} />
                  </a>
                  </div>
                </div>
              )}
            )}  
            {index ===3 &&  _resourceFour.map((res) => {              
              return(
                <div className="resourceCardHome" key={res._id + index}>
                  <div className="link">
                    {/* <Link to={res.link}>{res.link}</Link> */}
                    <a href={res.link} target='_blank' >
                    <div className="resourceDomain">{res.domain}</div>
                    <div className="resourceTitle">{res.title}</div>
                    {/* <div className="resourceDescription">{res.description}</div>               */}
                    <img src={res.img} />
                  </a>
                  </div>
                </div>
              )}
            )}  
          </div>
          <div className="meta">
              <div>{team.category}</div>
              <div><i className='bx bx-merge'></i> 342</div>
              <div><i className='bx bxs-user-account'></i> 24</div>
          </div>   
          </div>
          )
        })
      }

    </div>
  );
}

export default HomePage;