import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import { get } from "../../../ulities";

import GoBack from "../../GoBack";
import { Tag } from "antd";
import { useParams } from "react-router";
import { getJobById } from "../../../Service/getJobById";
function ViewJob() {
  const [data, setData] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`jobs?id=${params.id}`);
      console.log(response[0]);
      setData(response[0]);
    };
    fetchApi();
  }, []);
  return (
    <>
        <GoBack/>
      <h2><strong>Tên job: {data.name}</strong></h2>
      <p>Trạng thái: <Tag color="yellow">{data.status ? "Đang bật" :"Đang tắt"}</Tag></p>
      <p>Tags:  
        {data.tags&& data.tags.map((item,index)=>(
            <Tag color="blue" key={index}>{item}</Tag>
        ))}
      </p>
      <p>Ngày tạo: <strong>{data.createAt}</strong></p>
      <p>Ngày cập nhật: <strong>{data.updateAt}</strong></p>
      <p>Thành phố:  
        {data.city && data.city.map((item,index)=>(
            <Tag color="yellow" key={index}>{item}</Tag>
        ))}
      </p>
      <p>Mô tả: <strong>{data.description}</strong></p>
    </>
  );
}
export default ViewJob;
