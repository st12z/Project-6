import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "../../../ulities";
import { getJobById } from "../../../Service/getJobById";
import { Card } from "antd";
import GoBack from "../../GoBack";
import { Link } from "react-router-dom";

function CVDetail() {
  const params = useParams();
  const id = params.id;
  const [dataCV, setDataCV] = useState({});
  const [dataJob, setDataJob] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`cv?id=${id}`);
      const dataJob = await getJobById(response[0].idJob);
      setDataCV(response[0]);
      setDataJob(dataJob[0]);
    };
    fetchApi();
  }, []);
  return (
    <>
      <GoBack />
      <Card title={`Ứng viên: ${dataCV && dataCV.name}`}>
        <p>
          Ngày gửi: <strong>{dataCV.createAt}</strong>
        </p>
        <p>
          Số điện thoại: <strong>{dataCV.phone}</strong>
        </p>
        <p>
          Thành phố: <strong>{dataCV.city}</strong>
        </p>
        <p>
          Giới thiệu bản thân: <strong>{dataCV.description}</strong>
        </p>
        <p>
          Link project:{" "}
          <strong>
            <Link>{dataCV.linkProject}</Link>
          </strong>
        </p>
      </Card>
    </>
  );
}
export default CVDetail;
