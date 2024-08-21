import { Link } from "react-router-dom";

const CompanyCard = (props) => {
  return (
    <div className="card shadow-sm mb-4 bg-white">
      <div className="card-body p-4">
        <h2 className="card-title fs-4 fw-bold">{props.name}</h2>
        <h3 className="card-subtitle fs-5 mb-2 text-muted">{props.typeOfEntity}</h3>
        <p className="card-text fs-6">{props.registeredAddress}</p>
        <p className="card-text fs-6">Category: {props.productCategory}</p>
        <Link to={`/startupView/${props._id}`}>
          <button className="btn btn-primary btn-block py-2 px-4 mt-2">Verify</button>
        </Link>
      </div>
    </div>
  )
}

export default CompanyCard;