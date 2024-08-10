import { Card } from "antd";
import { getCookie } from "../../helper/cookie";
import { useEffect, useState } from "react";
import { get } from "../../ulities";

function CompanyAdmin() {
  const id = getCookie("id");
  const [data, setData] = useState([]);
  console.log(id);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`company?id=${id}`);
      console.log(response);
      setData(response);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card title="Thông tin công ty">
        <p>
          Tên công ty: <strong>{data.length>0 && data[0].companyName}</strong>
        </p>
        <p>
          Email: <strong>{data.length>0 && data[0].email}</strong>
        </p>
        <p>
          Số điện thoại: <strong>{data.length>0 && data[0].phone}</strong>
        </p>
        <p>
          Số nhân viên: <strong>{data.length>0 && data[0].quantityPeople}</strong>
        </p>
      </Card>
    </>
  );
}
export default CompanyAdmin;
