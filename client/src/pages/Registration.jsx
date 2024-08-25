import { useState, useEffect } from "react";
import { ProgressBar } from "../components/Home";
import AddressDetails from "../components/Registration/AddressDetails";
import EntityDetails from "../components/Registration/EntityDetails";
import InformationRequired from "../components/Registration/InformationRequired";
import FounderDetails from "../components/Registration/FounderDetails";
const Registration = () => {
  const [step, setStep] = useState(0);

  // Define the component based on the step
  const renderComponent = () => {
    switch (step) {
      case 0:
        return <EntityDetails setStep={setStep} />;
      case 1:
        return <AddressDetails />;
      case 3:
        return <FounderDetails setStep={setStep}/>
      case 5:
        return <InformationRequired setStep={setStep}/>;
      // You can add more cases here as you add more steps
      default:
        return null; // or some default component or message
    }
  };

  return (
    <>
      <section className="d-flex">
        <ProgressBar currentStep={step} />
        {renderComponent()}
      </section>
    </>
  );
};

export default Registration;
