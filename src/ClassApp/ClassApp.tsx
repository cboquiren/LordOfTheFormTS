import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation } from "../types";
import { ProfileInformation } from "../ProfileInformation";

type ClassState = {
  userData: UserInformation | null;
};

export class ClassApp extends Component {
  state: ClassState = {
    userData: null,
  };
  render() {
    const { userData } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={userData} />
        <ClassForm
          userDataHandler={(validatedData) => this.setState({ userData: validatedData })}
        />
      </>
    );
  }
}
