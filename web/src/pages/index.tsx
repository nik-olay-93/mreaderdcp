import React from "react";
import { NavBar } from "../components/NavBar";
import { withApollo } from "../utils/withApollo";

const Index: React.FC<{}> = ({}) => {
  return <NavBar variant="large" />;
};

export default withApollo({ ssr: true })(Index);
