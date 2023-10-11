import { ProfileInformation } from "../ProfileInformation";
import { UserInformation } from "../types";
import { FunctionalForm } from "./FunctionalForm";
import { useState } from "react";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<UserInformation | null>(null);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm userDataHandler={(newUser) => setUserData(newUser)} />
    </>
  );
};
