import React from 'react';
import { useState } from 'react';
const AddClerk = () => {
  const [create,setCreate]=useState({
    name:'',
    email:'',
    password:''
  })
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add Clerk</h5>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control mt-3 mb-3" id="email" placeholder="Enter email" />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control mt-3 mb-3" id="password" placeholder="Enter username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control mt-3 mb-3" id="password" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary">Add Clerk</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClerk;