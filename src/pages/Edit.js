import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");
  return (
    <div>
      <h2>Edit</h2>
      <button onClick={() => setSearchParams({ who: "ey" })}>바꾸기</button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        home으로
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
    </div>
  );
};

export default Edit;
