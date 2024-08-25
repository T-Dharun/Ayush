import { useState, useEffect } from "react";
import { ProgressBar } from "../components/Home";
import AddressDetails from "../components/Registration/AddressDetails";
import EntityDetails from "../components/Registration/EntityDetails";
import InformationRequired from "../components/Registration/InformationRequired";
import FounderDetails from "../components/Registration/FounderDetails";
import AuthorizedDetails from "../components/Registration/AuthorizedDetails";
import CertificateDetails from "../components/Registration/CertificateDetails";
import Final from "../components/Registration/Final";

const Registration = () => {
    const [step, setStep] = useState(0);
    const renderComponent = () => {
        switch (step) {
            case 0:
                return <EntityDetails setStep={setStep} />;
            case 1:
                return <AddressDetails setStep={setStep} />;
            case 2:
                return <AuthorizedDetails setStep={setStep} />;
            case 3:
                return <FounderDetails setStep={setStep}/>
            case 4:
              return <InformationRequired setStep={setStep}/>;
            case 5:
                return <CertificateDetails setStep={setStep}/>;
            case 6:
                return <Final setStep={setStep}/>;
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
