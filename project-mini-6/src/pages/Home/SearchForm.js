import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../ulities";
import { useNavigate } from "react-router";
const { Option } = Select;

function SearchForm() {
  const [city, setCity] = useState([]);
  const navigate =useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get("city");
      const obJ = {
        key: 0,
        value: "All",
      };
      response.unshift(obJ);
      setCity(response);
    };
    fetchApi();
  }, []);
  const handleSearch = (e) => {
    let city=e.city || "";
    city = city==="All" ? "":city;
    let keyword=e.keyword || "";
    navigate(`/search?city=${city}&keyword=${keyword}`);
  };
  return (
    <>
      <h2>1000+ IT Jobs For Developers</h2>
      {city && (
        <Form onFinish={handleSearch}>
          <Row gutter={[20, 20]}>
            <Col span={4}>
              <Form.Item name="city">
                <Select options={city} placeholder="Chọn thành phố"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="keyword">
                <Input placeholder="Nhập từ khóa" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}
export default SearchForm;
