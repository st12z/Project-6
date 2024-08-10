import { Card, Col,Row } from "antd";
import { Link } from "react-router-dom";
import { getAllCompany } from "../../Service/getAllCompany";
import { useEffect, useState } from "react";

function Company() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const dataCompany = await getAllCompany();
      setData(dataCompany);
    };
    fetchApi();
  }, []);
  return (
    <>
     
      <h2>Danh sách</h2>
      <Row gutter={[20, 20]} className="mb-10">
        {data.map((item, index) => (
          <Col span={8} key={index}>
            <Link to={`/company/${item.id}` }>
              <Card>
                <p>
                  <span>Công ty: </span>
                  <span style={{ fontWeight: 700 }}>{item.companyName}</span>
                </p>
                <p>
                  <span>Nhân sự: </span>
                  <span style={{ fontWeight: 700 }}>{item.quantityPeople}</span>
                </p>
                <p>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 700 }}>{item.address}</span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default Company;
