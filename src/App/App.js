import { AuthProvider } from "../context/authContext";
import { ModalFormProvider } from "../context/modalFormContext";
import ErrorLayout from "../layouts/errorLayout/ErrorLayout";
import routes, { RenderRoutes } from "../routes";

const App = () => {
  return (
    <div className="App">
      <ErrorLayout>
        <AuthProvider>
          <ModalFormProvider>
            <RenderRoutes routes={routes} />
          </ModalFormProvider>
        </AuthProvider>
      </ErrorLayout>
    </div>
  );
};

export default App;
