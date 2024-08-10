import { Button, Card, Col, Form, Input, message, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { getCompanyById } from "../../Service/getCompanyById";
import TextArea from "antd/es/input/TextArea";
import { patch, post } from "../../ulities";
import { CheckEmailExist,CheckPhoneExist } from "../../Service/CheckExist";
function InfoCompany() {
  const [isEdit, setisEdit] = useState(false);
  const [data, setData] = useState({});
  const id = getCookie("id");
  const [form] = Form.useForm();
  const [api,contextHolder] = notification.useNotification();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompanyById(id);
      form.setFieldsValue(response[0]);
      setData(response[0]);
    };
    fetchApi();
  }, []);
  const handleEdit= ()=>{
    setisEdit(true);
  }
  const handleCancel= ()=>{
    setisEdit(false);
  }
  const handleSubmit=async (e)=>{
    const response = patch("company",id,e);
    const checkEmail = await CheckEmailExist(e.email);
    const checkPhone = await CheckPhoneExist(e.phone);
    if(response && checkEmail.length==0){
      api.success({
        message: "Cập nhật thành công",
      })
      setisEdit(false);
    }
    else{
      api.error({
        message: "Cập nhật thất bại",
        description: "Email và Số điện thoại đã tồn tại"
      })
    }
  }
  return (
    <>
      {contextHolder}
      {data && (
        <Card
          title="Thông tin công ty"
          extra={!isEdit ? <Button onClick={handleEdit}>Chỉnh sửa</Button> : <Button onClick={handleCancel} >Hủy</Button>}
          className="card-container"
        >
          <Form  layout="vertical"  form={form}    onFinish={handleSubmit} disabled={!isEdit}>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  label="Tên công ty"
                  required="true"
                  name="companyName"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" required="true" name="email">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số điện thoại" required="true" name="phone">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Địa chỉ" required="true" name="address">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số lượng nhân sự"
                  required="true"
                  name="quantityPeople"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Thời gian làm việc"
                  required="true"
                  name="workingTime"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Link Website"
                  required="true"
                  name="website"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Mô tả ngẵn"
                  required="true"
                  name="description"
                >
                  <TextArea />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả chi tiết" required="true" name="detail">
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" htmlType="submit">Cập nhật</Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
}
export default InfoCompany;
