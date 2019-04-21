import React from "react";
import Layout from "../components/Layout";

export default WrappedComponent => {
  function WithLayout(props) {
    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    );
  }

  return WithLayout;
};
