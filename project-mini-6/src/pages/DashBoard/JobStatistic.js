import { Card } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { get } from "../../ulities";
function JobStatistic() {
  const [data, setData] = useState({});
  const id = getCookie("id");

  useEffect(() => {
    let countJob = 0,
      jobTrue = 0,
      jobFalse = 0;
    const fetchApi = async () => {
      const jobData = await get(`jobs?idCompany=${id}`);
      for (let i = 0; i < jobData.length; i++) {
        if (jobData[i].status) {
          jobTrue += 1;
        } else {
          jobFalse += 1;
        }
      }
      countJob = jobData.length;
      const data = {
        countJob: countJob,
        jobTrue: jobTrue,
        jobFalse: jobFalse,
      };
      console.log(data);
      setData(data);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card title="Job" style={{ fontStyle: "Bold" }}>
        <p>Số lượng job: <strong>{data.countJob}</strong></p>
        <p>Job đang bật: <strong>{data.jobTrue}</strong></p>
        <p>Job đang tắt: <strong>{data.jobFalse}</strong></p>
      </Card>
    </>
  );
}
export default JobStatistic;
