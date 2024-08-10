
import Header from "./Header";
import "./LayoutDefault.scss";
import Main from "./Main";
import Footer from "./Footer";
function LayoutDefault() {
  return (
    <>
      <div className="layout-default">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </>
  );
}
export default LayoutDefault;
