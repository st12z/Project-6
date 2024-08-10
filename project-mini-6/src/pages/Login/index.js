import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  notification,
  Row,
} from "antd";
import { get } from "../../ulities";
import { useNavigate } from "react-router";
import { setCookie } from "../../helper/cookie";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../actionReducer";
function Login() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = async (e) => {
    console.log(e.email, e.password);
    const response = await get(
      `company?email=${e.email}&password=${e.password}`
    );
    if (response.length > 0) {
      setCookie("id", response[0].id, 1);
      setCookie("email", response[0].email, 1);
      setCookie("companyName", response[0].companyName, 1);
      setCookie("phone", response[0].phone, 1);
      setCookie("token", response[0].token, 1);
      api.success({
        message: "Đăng nhập thành công",
      });
      dispatch(actionLogin(true));
      navigate("/");
    } else {
      api.error({
        message: "Sai tài khoản hoặc mật khẩu",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={8}>
          <Card title="Đăng nhập">
            <Form layout="vertical" onFinish={handleFinish}>
              <Form.Item label="Email" name="email" required="true">
                <Input />
              </Form.Item>
              <Form.Item label="Password" name="password" required="true">
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Login;
