import { Button, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { get, patch } from "../../ulities";
import {Link} from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
function ManageCV() {
  const [data, setData] = useState();
  const idCompany = getCookie("id");
  const [reload,setReload]=useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const dataCV = await get(`cv?idCompany=${idCompany}`);
      const dataJob = await get(`jobs`);
      const dataFinal = [];
      dataCV.forEach((itemCV) => {
        const findJob = dataJob.find(
          (itemJob) =>
            itemJob.id == itemCV.idJob && itemJob.idCompany == itemCV.idCompany
        );
        if (findJob!=undefined && findJob.name!=undefined) {
          const obj={
            id: itemCV.id,
            nameJob: findJob.name,
            name: itemCV.name,
            phone: itemCV.phone,
            email: itemCV.email,
            createAt: itemCV.createAt,
            statusRead: itemCV.statusRead,
          };
          dataFinal.push(obj);
        }
      });
      setData(dataFinal);
    };
    fetchApi();
  }, [reload]);
  const handleReload = async(e) => {
    e.statusRead=true;
    const response = await patch("cv",e.id,e);
    if(response){
        setReload(!reload);
    }
  };
  const columns = [
    {
      title: "Tên job",
      dataIndex: "nameJob",
      key: "nameJob",
      render: (_, record) => {
        return (
          <>
            <Tag color="blue">{record &&record.nameJob}</Tag>
          </>
        );
      },
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      render: (_, record) => {
        return (
          <>
            {record &&record.statusRead ? (
              <Tag color="Green">Đã đọc</Tag>
            ) : (
              <Tag color="Red">Chưa đọc</Tag>
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
            <Link to={"/cv/" + (record ?record.id:"")} onClick={()=>handleReload(record)}>
              <Button >
                <EyeOutlined />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <>
      <h2>Danh sách CV</h2>
      <Table dataSource={data} columns={columns} rowKey={"id"}></Table>
    </>
  );
}
export default ManageCV;
