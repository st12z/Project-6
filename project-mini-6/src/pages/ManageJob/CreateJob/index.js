import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { get, patch, post } from "../../../ulities";
import { getCookie } from "../../../helper/cookie";
function CreateJob(props) {
  const { onReload } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tagData, settagData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [cityData, setcityData] = useState([]);
  const id = getCookie("id");
  useEffect(() => {
    const fetchApi = async () => {
      const tagData = await get("tags");
      const cityData = await get("city");
      settagData(tagData);
      setcityData(cityData);
    };
    fetchApi();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e={
        idCompany:id,
        ...e,
    }
    console.log(e);
    const response = post("jobs", e);
    if (response) {
      api.success({
        message: "Đã tạo thêm job mới thành công",
      });
      setIsModalOpen(false);
      onReload();
    } else {
      api.success({
        message: "Tạo mới thất bại",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Button className="mb-10" icon={<PlusOutlined />} onClick={showModal}>
        Tạo job mới
      </Button>

      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form onFinish={handleSubmit} layout="vertical">
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên job" name="name" required={true}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item label="Tags" name="tags">
                <Select mode="multiple">
                  {tagData.map((item, index) => (
                    <Select.Option value={item.value} key={index}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Mức lương" name="salary" required={true}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Thành phố" name="city" required={true}>
                <Select mode="multiple">
                  {cityData.map((item, index) => (
                    <Select.Option value={item.value} key={index}>
                      {item.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description" required={true}>
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Trạng thái" name="status">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default CreateJob;
