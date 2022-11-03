import React from "react";
// import ErrorModal from "../../components/modalError/ErrorModal";

function ErrorLayout({ children }) {
  // const { show } = useApiErrorContext();

  return (
    <main>
      {children}

      {/* <ErrorModal /> */}
    </main>
  );
}

export default ErrorLayout;
