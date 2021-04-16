import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// Route this page
// Render resource
// Put request to upvote and downvote

function AddComment({ resourceId,userinfo }) {
    const [values, setValues] = useState({
		username: userinfo.firstname,
		userID: userinfo.userID,
        comment: '',
        resourceId: resourceId
	});
  const { register, handleSubmit } = useForm()
  

  // 'data' is an object where the keys are the names of the form fields, 
  // and the values are the form input values
  const onSubmit = handleSubmit(() => {
    fetch('/comment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(resp => console.log(resp))
      .then(data => {
        // Enter something that stores or handles cookies or JWT
        history.push("/");
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
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Enter Your Comment" id="comment" ref={register} onChange={handleChange} />
        </div>
        
        
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Enter</button>
        </div>
      </form>
  )
}

export default AddComment;