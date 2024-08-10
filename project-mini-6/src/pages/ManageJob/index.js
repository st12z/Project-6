import { Button, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { getCookie } from "../../helper/cookie";
import { useEffect, useState } from "react";
import { get } from "../../ulities";
import { EyeOutlined } from "@ant-design/icons";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import CreateJob from "./CreateJob";
function ManageJob() {
  const id = getCookie("id");
  const [data, setData] = useState([]);
  const [reload, setOnReload] = useState(false);
  const handleReload = () => {
    setOnReload(!reload);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`jobs?idCompany=${id}`);
      setData(response);
    };
    fetchApi();
  }, [reload]);
  const handleCreateJob= ()=>{

  }
  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) => {
        return (
          <>
            {record.tags.map((item, index) => (
              <Tag color="blue" key={index}>
                {item}
              </Tag>
            ))}
          </>
        );
      },
    },
    {
      title: "Mức lương($)",
      dataIndex: "salary",
      key: "salary",
    },

    {
      title: "Thời gian",
      dataIndex: "timeEdit",
      key: "timeEdit",
      render: (_, record) => {
        return (
          <>
            <span>Ngày tạo: {record.createAt} </span>
            <span>Cập nhật: {record.updateAt}</span>
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <>
            {record.status ? (
              <>
                <Tag color="yellow">Đang bật</Tag>
              </>
            ) : (
              <>
                <Tag color="yellow">Đang tắt</Tag>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <>
            <Link to={"/job-detail/" + record.id}>
              <Button>
                <EyeOutlined />
              </Button>
            </Link>
            <EditJob record={record} onReload={handleReload} />
            <DeleteJob record={record} onReload={handleReload} />
          </>
        );
      },
    },
  ];
  return (
    <>
      <CreateJob onReload ={handleReload}/>
      <Table dataSource={data} columns={columns} rowKey={"id"} />
    </>
  );
}
export default ManageJob;
