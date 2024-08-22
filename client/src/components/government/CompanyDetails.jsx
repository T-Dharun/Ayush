import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../config';
const CompanyDetails = () => {
    const { startupId } = useParams();
    const [loading, setLoading] = useState(true);
    const [companyData, setCompanyData] = useState({
        name: '',
        typeOfEntity: '',
        dateOfIncorporation: '',
        registrationNumber: '',
        registeredAddress: '',
        manufacturingUnitAddress: '',
        contactPerson: '',
        productCategory: '',
        productionCapacity: '',
        bankDetails: {
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            branch: ''
        },
        documents: {
            certificate: '',
            license: '',
            otherDocuments: []
        }
    });

    useEffect(() => {
        fetchCompanyData();
    }, []);
    const navigate=useNavigate();
    const verifyCompany = async () => {
        try {
            const response = await axiosInstance.patch(`http://localhost:5000/api/government/startups/verify/${startupId}`);
            console.log(response);            
            alert(response.data.msg)
            navigate('/government')
        }
        catch (error) {
            console.error('Fetch error:', error);
        }
    }
    const rejectCompany = async () => {
        try {
            const response = await axiosInstance.patch(`http://localhost:5000/api/government/startups/reject/${startupId}`);
            console.log(response);            
            alert(response.data.msg)
            navigate('/government')
        }
        catch (error) {
            console.error('Fetch error:', error);
        }
    }
    const fetchCompanyData = async () => {

        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjNGEyZmY3YmM5ZmRhMDEzY2NiODA3Iiwicm9sZSI6ImNsZXJrIn0sImlhdCI6MTcyNDI2MTQ3MCwiZXhwIjoxNzI0MjY1MDcwfQ.hdtnTljzQBQ4pEOUyX27x9-UZ_Qhwkhcb4W1uiAgDFE'; // replace with the actual token value
            const axiosInstance = axios.create({
                headers: {
                    'x-auth-token': token
                }
            });
            const response = await axiosInstance.get(`http://localhost:5000/api/government/startups/${startupId}`);
            setCompanyData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container py-5">
            <h1 className="fs-51 mb-5 fw-500">Company Details</h1>
            <p className="lead">Startup ID: {startupId}</p>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <h5 className="card-header">Company Information</h5>
                        <div className="card-body">
                            <p><strong>Name:</strong> {companyData.name}</p>
                            <p><strong>Type of Entity:</strong> {companyData.typeOfEntity}</p>
                            <p><strong>Date of Incorporation:</strong> {companyData.dateOfIncorporation}</p>
                            <p><strong>Registration Number:</strong> {companyData.registrationNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <h5 className="card-header">Address</h5>
                        <div className="card-body">
                            <p><strong>Registered Address:</strong> {companyData.registeredAddress}</p>
                            <p><strong>Manufacturing Unit Address:</strong> {companyData.manufacturingUnitAddress}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <h5 className="card-header">Contact</h5>
                        <div className="card-body">
                            <p><strong>Contact Person:</strong> {companyData.contactPerson}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4">
                        <h5 className="card-header">Product Information</h5>
                        <div className="card-body">
                            <p><strong>Product Category:</strong> {companyData.productCategory}</p>
                            <p><strong>Production Capacity:</strong> {companyData.productionCapacity}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <h5 className="card-header">Bank Details</h5>
                        <div className="card-body">
                            <p><strong>Bank Name:</strong> {companyData.bankDetails.bankName}</p>
                            <p><strong>Account Number:</strong> {companyData.bankDetails.accountNumber}</p>
                            <p><strong>IFSC Code:</strong> {companyData.bankDetails.ifscCode}</p>
                            <p><strong>Branch:</strong> {companyData.bankDetails.branch}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <h5 className="card-header">Documents</h5>
                        <div className="card-body">
                            <p><strong>Certificate:</strong> {companyData.documents.certificate}</p>
                            <p><strong>License:</strong> {companyData.documents.license}</p>
                            <p><strong>Other Documents:</strong>
                                <ul>
                                    {companyData.documents.otherDocuments.map((doc, index) => (
                                        <li key={index}>{doc}</li>
                                    ))}
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-12 text-center">
                    <button className="btn btn-success btn-lg mr-3" onClick={verifyCompany}>Verify</button>
                    <button className="btn btn-danger m-3 btn-lg mr-3" onClick={rejectCompany}>Reject</button>
                    <button className="btn btn-secondary btn-lg">Chat</button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;