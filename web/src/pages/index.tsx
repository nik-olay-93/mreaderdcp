import React from "react";
import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";

const Index: React.FC<{}> = ({}) => {
  return <NavBar />;
};

export default withApollo({ ssr: true })(Index);
