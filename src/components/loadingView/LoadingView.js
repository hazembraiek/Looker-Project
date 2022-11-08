import React from "react";

export const Spinner = () => {
  return (
    <div className="loading">
      <div id="circle2"></div>
    </div>
  );
};

function LoadingView({ children, loading }) {
  return <>{loading ? <Spinner /> : children}</>;
}

export default LoadingView;
