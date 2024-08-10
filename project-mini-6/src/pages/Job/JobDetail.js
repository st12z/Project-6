import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllCompany } from "../../Service/getAllCompany";
import { getJobById } from "../../Service/getJobById";
import { getCompanyById } from "../../Service/getCompanyById";
import GoBack from "../GoBack";
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Input, notification, Row, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CreateCV } from "../../Service/CreateCV";
import { getTimeCurrent } from "../../Service/getTimeCurrent";
function JobDetail() {
  const params = useParams();
  const id = params.id;
  const [data, setData] = useState();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const fetchApi = async () => {
      const jobData = await getJobById(id);
      const companyData = await getCompanyById(jobData[0].idCompany);
      const jobDetail = {
        ...jobData[0],
        infoCompany: companyData[0],
      };
      setData(jobDetail);
    };
    fetchApi();
  }, []);
  const handleSubmit = async (e) => {
    e.idJob = data.id;
    e.idCompany = data.infoCompany.id;
    e.createAt = getTimeCurrent();
    const response = await CreateCV(e);
    if (response) {
      api.success({
        message: "Gửi yêu cầu thành công",
        description:
          "Nhà liên hệ sẽ liên hệ với bạn trong thời gian tới",
        duration: 0,
      });
    }
    else{
        api.error({
            message:"Gửi bị lỗi vui lòng gửi lại"
        })
    }
  };
  return (
    <>
      {contextHolder}
      <GoBack />
      <h2>{data && data.name}</h2>
      <p>
        <Button
          href="#formApply"
          type="primary"
          style={{ textDecoration: "none" }}
        >
          Ứng tuyển ngay
        </Button>
      </p>
      <p>
        <span>Tags: </span>
        {data &&
          data.tags.map((item, index) => (
            <Tag color="blue" key={index}>
              {item}
            </Tag>
          ))}
      </p>
      <p>
        <span>Thành phố: </span>
        {data &&
          data.city.map((item, index) => (
            <Tag color="yellow" key={index}>
              {item}
            </Tag>
          ))}
      </p>
      <p>
        <span>Mức lương: </span>
        {data && <span style={{ fontWeight: 700 }}>{data.salary}$</span>}
      </p>
      <p>
        <span>Địa chỉ công ty: </span>
        {data && (
          <span style={{ fontWeight: 700 }}>{data.infoCompany.address}</span>
        )}
      </p>
      <p>
        <span>Mô tả công việc: </span>
        {data && <span>{data.description}</span>}
      </p>
      <div className="container">
        <Card title="Ứng tuyển ngay" id="formApply">
          <Form layout="vertical" onFinish={handleSubmit}>
            <Row gutter={[10, 10]}>
              <Col span={6}>
                <Form.Item label="Họ và tên" name="name" required="true">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Số điện thoại" name="phone" required="true">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Email" name="email" required="true">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Thành phố" name="city" required="true">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Form.Item label="Giới thiệu bản thân" name="description">
                  <TextArea style={{ height: 200 }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Form.Item
                  label="Danh sách project đã làm"
                  name="linkProject"
                  required="true"
                >
                  <TextArea style={{ height: 200 }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi yêu cầu
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
export default JobDetail;
