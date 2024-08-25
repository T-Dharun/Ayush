import React from 'react';
import './progressBar.css';

function ProgressBar({ currentStep }) {
  const data = [
    {
      step: 1,
      title: 'Create Account',
      description: 'Create Account',
      complete: false,
      active: false,
    },
    {
      step: 2,
      title: 'Add Family Members',
      description: 'Add Family Members',
      complete: false,
      active: false,
    },
    {
      step: 3,
      title: 'Add Permanent Address',
      description: 'Add Permanent Address',
      complete: false,
      active: false,
    },
    {
      step: 4,
      title: 'Add Bank Details',
      description: 'Add Bank Details',
      complete: false,
      active: false,
    },
    {
      step: 5,
      title: 'Add Bank Details',
      description: 'Add Bank Details',
      complete: false,
      active: false,
    },
    {
      step: 6,
      title: 'Add Bank Details',
      description: 'Add Bank Details',
      complete: false,
      active: false,
    },
    {
      step: 7,
      title: 'Add Bank Details',
      description: 'Add Bank Details',
      complete: false,
      active: false,
    },
  ];

  // Update `complete` and `active` based on `currentStep`
  data.forEach((item, index) => {
    if (item.step < currentStep) {
      data[index].complete = true;
      data[index].active = true;
    } else if (item.step === currentStep) {
      data[index].active = true;
    }
  });

  return (
    <div className="progressBar">
      {data.map((item, index) => (
        <div key={index} className="progressBar-item">
          <div className="progressBar-info">
            <div
              className={`progressBar-circle ${item.complete ? 'complete' : ''} ${
                item.active ? 'active' : ''
              }`}
            >
              {!item.complete && <span>{item.step}</span>}
            </div>
            <div className="progressBar-text">
              <p className="progressBar-title">{item.title}</p>
              <p className="progressBar-description">{item.description}</p>
            </div>
          </div>
          {index < data.length - 1 && <div className="progressBar-line" />}
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
