import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get } from "../../ulities";
import { getAllCity } from "../../Service/getAllCity";
import { getAllTags } from "../../Service/getAllTags";
import { getAllJobs } from "../../Service/getAllJobs";
import {getAllCompany} from "../../Service/getAllCompany";
import { Card, Col, Row, Tag } from "antd";
import CardItem from "../../components/CardItem";
function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const cityName = searchParams.get("city") || "";
  const tagsName = searchParams.get("keyword") || "";
  useEffect(() => {
    const fetchApi = async () => {
      const cityData = await getAllCity();
      const tagData = await getAllTags();
      const jobData = await getAllJobs();
      const companyData = await getAllCompany();
      let findJob = jobData.filter((item) => {
        const tag = tagsName ? item.tags.includes(tagsName) : true;
        const city = cityName ? item.city.includes(cityName) : true;
        const status = item.status;
        return tag && city && status;
      });
      const findJobFinal=findJob.map(item =>{
         const companyByID = companyData.filter(itemCompany => item.idCompany==itemCompany.id);
         return{
            ...item,
            infoCompany:companyByID,
         }
      });
      setData(findJobFinal);
    };
    fetchApi();
  },[]);
  return (
    <>
      <strong>Kết quả tìm kiếm : </strong>
      <Tag >{cityName}</Tag>
      <Tag >{tagsName}</Tag>
      <Row gutter={[20, 20]}>
        {data.map((item) => (
            <Col span={6} key={item.id}>
                <CardItem item={item} />
            </Col>
        ))}
      </Row>
    </>
  );
}
export default Search;
