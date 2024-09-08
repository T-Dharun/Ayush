import { useState,useEffect } from "react"
import { CompanyDetailsForm, TransactionDetailsForm, CertificateForm } from "../components/Home"
import Bot from "../pages/bot"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Home = () => {
  const [active, setActive] = useState(0);
  const [details, setDetails] = useState({
    "name": "",
    "typeOfEntity": "",
    "dateOfIncorporation": "",
    "registrationNumber": "",
    "registeredAddress": "",
    "contactPerson": "",
    "manufacturingUnitAddress": "",
    "productCategory": "",
    "productionCategory": "",

    "gmpCertificate": "",
    "coppCertificate": "",
    "ayushLicenseCertificate": "",
    "manufacturingLicense": "",
    "companyIncorporationCertificate": "",

    "panCard": "",
    "gstRegistrationNo": "",
    "ieCode": "",
    "capitalInvestment": "",
    "bankAccountDetails": "",
    "bankName": "",
    "accountNumber": "",
    "ifscCode": ""
  })
  const navigate=useNavigate();
  const submit = () => {
    console.log("submitted")
    
    navigate('/status');
  }
  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const a = JSON.parse(localStorage.getItem('user'));
      const data = JSON.parse(localStorage.getItem('data'));

      const response = await axios.get(`http://localhost:5000/api/status/startup/${data._id}`, {
        headers: {
          'x-auth-token': a.token,
        },
      });
      console.log(response.data.company.progress)
      if(response.data.company){
        switch(response.data.company.progress){
          case 'step1':setActive(1);break;
          case 'step2':setActive(2);break;
          case 'step3':{navigate('/');alert("Already registered !!!");};break;
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const steps = [
    { title: 'First', description: 'Company Details' },
    { title: 'Second', description: 'Certificate Details' },
    { title: 'Third', description: 'Transaction Details' },
  ]

  return (
    <div className="screen center flex-col gap-5" style={{backgroundColor:"white"}}>
      <section className="w-[48rem]">
        hello
      </section>
      <Bot/>

      {active === 0 ?
        <CompanyDetailsForm setActive={setActive} details={details} setDetails={setDetails} /> :
      active === 1 ?
        <CertificateForm setActive={setActive} details={details} setDetails={setDetails} /> :
        <TransactionDetailsForm details={details} setDetails={setDetails} onSubmit={submit} />
      }
    </div>
  )
}

export default Home
