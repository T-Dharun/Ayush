import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateWebinar = () => {
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("data"));
    
    // Optional: Add a fallback for when data or data.role is undefined
    const role = data?.role;
    console.log(role)

    return (
        <div className="d-flex justify-content-center mt-5">
            {role === "mentor" ? (
                <button 
                    onClick={() => navigate("/mentor/meeting")}
                    className="btn btn-primary btn-lg shadow-lg"
                    style={{
                        backgroundColor: '#007bff', // Bootstrap primary color
                        borderColor: '#007bff',
                        borderRadius: '50px', // Rounded corners
                        padding: '12px 24px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Create a Webinar Session
                </button>
            ) : (
                <button 
                    onClick={() => navigate("/mentor/meeting")}
                    className="btn btn-primary btn-lg shadow-lg"
                    style={{
                        backgroundColor: '#007bff', // Bootstrap primary color
                        borderColor: '#007bff',
                        borderRadius: '50px', // Rounded corners
                        padding: '12px 24px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Ask for Mentoring Session
                </button>
            )}
        </div>
    );
};

export default CreateWebinar;
