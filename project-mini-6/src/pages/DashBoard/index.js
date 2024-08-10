import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CVStatistic from "./CVStatistic";
import CompanyAdmin from "./CompanyAdmin";
function DashBoard() {
  return (
    <>
      <h2>Tổng quan</h2>
      <Row gutter={[20, 20]}>
        <Col span={6}>
          <JobStatistic />
        </Col>
        <Col span={6}>
            <CVStatistic/>
        </Col>
        <Col span={6}>
            <CompanyAdmin/>
        </Col>
      </Row>
    </>
  );
}
export default DashBoard;
