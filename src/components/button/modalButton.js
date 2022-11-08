export const FormButton = ({ label }) => {
  return (
    <div className="button-form">
      <button className="submitButton" type="submit">
        <p>{label}</p>
      </button>
    </div>
  );
};
