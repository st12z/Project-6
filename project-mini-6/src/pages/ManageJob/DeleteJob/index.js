import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { del } from "../../../ulities";
function DeleteJob(props) {
  const { record, onReload } = props;
  const handleDelete = async () => {
    const response = await del("jobs", record.id,record);
    if(response){
        onReload();
    }
    
  };
  return (
    <>
      <Button>
        <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={handleDelete}>
          <DeleteOutlined />
        </Popconfirm>
      </Button>
    </>
  );
}
export default DeleteJob;
