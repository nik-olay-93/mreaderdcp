import React from "react";
import { Wrapper } from "../components/Wrapper";
import { withApollo } from "../utils/withApollo";

const Index: React.FC<{}> = ({}) => {
  return <Wrapper></Wrapper>;
};

export default withApollo({ ssr: true })(Index);
