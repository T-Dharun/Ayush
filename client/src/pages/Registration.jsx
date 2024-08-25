import { useState, useEffect } from "react";
import { ProgressBar } from "../components/Home";
import AddressDetails from "../components/Registration/AddressDetails";
import EntityDetails from "../components/Registration/EntityDetails";
import AuthorizedDetails from "../components/Registration/AuthorizedDetails";
import CertificateDetails from "../components/Registration/CertificateDetails";
import Final from "../components/Registration/Final";
import { getStep } from "../services/registrationService";

const Registration = () => {
    const [step, setStep] = useState(0);
    
    useEffect(() => {
        const fetchStep = async () => {
            const response = await getStep();
            let a=(response[0].progress)
            if(response){
                let s= parseInt(a);
                console.log(s+" "+a);
                setStep(s);
            }
        };
        
        fetchStep();
    }, []);
    const renderComponent = () => {
        switch (step) {
            case 0:
                return <EntityDetails setStep={setStep} step={step}/>;
            case 1:
                return <AddressDetails setStep={setStep} step={step} />;
            case 2:
                return <AuthorizedDetails setStep={setStep}  step={step}/>;
            case 3:
                return <CertificateDetails setStep={setStep}/>;
            case 4:
                    return <Final setStep={setStep} step={step}/>;
            default:
                return null; // or some default component or message
        }
    };
    console.log(step)
    return (
        <>
            <section className="d-flex">
                <ProgressBar currentStep={step}  setStep={setStep}/>
                {renderComponent()}
            </section>
        </>
    );
};

export default Registration;
