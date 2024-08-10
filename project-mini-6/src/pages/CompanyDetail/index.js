import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompanyById } from "../../Service/getCompanyById";
import GoBack from "../GoBack";
import { getJobById } from "../../Service/getJobById";
import { get } from "../../ulities";
import { Col, Row } from "antd";
import CardItem from "../../components/CardItem";

function CompanyDetail() {
  const params = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const dataCompany = await getCompanyById(params.id);
      const dataJob = await get(`jobs?idCompany=${dataCompany[0].id}`);
      const dataFinal = dataJob.map(item =>{
        return{
            infoCompany:dataCompany,
            ...item,
        }
      })
      console.log(dataFinal);
      setData(dataFinal[0]);
    };
    fetchApi();
  }, []);
  return (
    <>
      <GoBack />

      <h2>{ data.infoCompany && data.infoCompany[0].companyName}</h2>
      <p className="mb-10">
        <span>
          Địa chỉ:{" "}
          <strong>{data.infoCompany && data.infoCompany[0].address}</strong>
        </span>
      </p>
      <p className="mb-10">
        <span>
          Thời gian làm việc:{" "}
          <strong>{ data.infoCompany && data.infoCompany[0].workingTime}</strong>
        </span>
      </p>
      <p className="mb-10">
        <span>
          Link website:{" "}
          <strong>{data.infoCompany &&  data.infoCompany[0].website}</strong>
        </span>
      </p>
      <p className="mb-10">
        <span>
          Mô tả :{" "}
          <strong>{data.infoCompany && data.infoCompany[0].description}</strong>
        </span>
      </p>
      <p className="mb-10">
        <span>
          Mô tả chi tiết:{" "}
          <strong>{ data.infoCompany && data.infoCompany[0].detail}</strong>
        </span>
      </p>
      <Row gutter={[20, 20]}>
        {Array.isArray(data)  &&
          data.map((item) => (
            <Col span={6} key={item.id}>
              <CardItem item={item} />
            </Col>
          ))}
      </Row>
    </>
  );
}
export default CompanyDetail;
