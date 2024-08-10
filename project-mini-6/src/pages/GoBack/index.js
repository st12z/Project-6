import { Button } from "antd";

function GoBack() {
  function goBack() {
    window.history.back();
  }
  return (
    <>
      <Button onClick={goBack}>Trở lại</Button>
    </>
  );
}
export default GoBack;
