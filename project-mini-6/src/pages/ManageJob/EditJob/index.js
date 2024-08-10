import { useEffect, useState } from "react";
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
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { get, patch } from "../../../ulities";
function EditJob(props) {
  const { record,onReload } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [tagData,settagData] = useState([]);
  const [cityData,setcityData] = useState([]);
  useEffect(() =>{
    const fetchApi = async()=>{
      const tagData = await get("tags");
      const cityData = await get("city");
      settagData(tagData);
      setcityData(cityData);
    };
    fetchApi();
  },[])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (e) => {
    e.id = record.id;
    console.log(e);
    const response = await patch(`jobs`, record.id, e);
    
    if (response) {
      api.success({
        message: "Cập nhật thành công",
      });
      setIsModalOpen(false);
      onReload();
    } else {
      api.error({
        message: "Cập nhật thất bại",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Button onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <Form onFinish={handleSubmit} layout="vertical" initialValues={record}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên job" name="name" required={true}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item label="Tags" name="tags">
                <Select mode="multiple" placeholder="Chọn tags" required={true}>
                  {tagData &&
                    tagData.map((tag) => (
                      <Select.Option key={tag.id} value={tag.value}>
                        {tag.value}
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
                  {cityData &&
                    cityData.map((city) => (
                      <Select.Option key={city.id} value={city.value}>
                        {city.value}
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
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default EditJob;
