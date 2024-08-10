import { Button, Card, Col, Form, Input, Row, notification } from "antd";
import { CreateAccCom } from "../../Service/CreateAccCom";
import useNotification from "antd/es/notification/useNotification";
import { useNavigate } from "react-router";
import { CheckEmailExist, CheckPhoneExist } from "../../Service/CheckExist";
function Register() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const email = e.email;
    const phone = e.phone;
    const checkEmail = await CheckEmailExist(email);
    const checkPhone = await CheckPhoneExist(email);
    if (checkEmail.length > 0) {
      api.open({
        message: "Email đã tồn tại",
      });
    } else if (checkPhone.lenth > 0) {
      api.open({
        message: "PhoneNumber đã tồn tại",
      });
    } else {
      const response = await CreateAccCom(e);
      if (response) {
        navigate("/login");
      } else {
        api.error({
          message: "Đăng kí thất bại",
        });
      }
    }
  };
  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={8}>
          <Card title="Đăng kí">
            <Form onFinish={handleSubmit} layout="vertical">
              <Form.Item label="Tên công ty" name="companyName" required="true">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" required="true">
                <Input />
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone" required="true">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" required="true">
                <Input.Password/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng kí
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Register;
