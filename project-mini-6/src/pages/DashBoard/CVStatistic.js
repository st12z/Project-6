import { Card } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "../../helper/cookie";
import { get } from "../../ulities";
function CVStatistic() {
  const [data, setData] = useState({});
  const id = getCookie("id");

  useEffect(() => {
    let countCV = 0,
      cvTrue = 0,
      cvFalse = 0;
    const fetchApi = async () => {
      const cvData = await get(`cv?idCompany=${id}`);
      for (let i = 0; i < cvData.length; i++) {
        if (cvData[i].statusRead) {
          cvTrue += 1;
        } else {
          cvFalse += 1;
        }
      }
      countCV = cvData.length;
      const data = {
        countCV: countCV,
        cvTrue: cvTrue,
        cvFalse: cvFalse,
      };
      console.log(data);
      setData(data);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card title="CV" style={{ fontStyle: "Bold" }}>
        <p>Số lượng CV: <strong>{data.countCV}</strong></p>
        <p>CV đã đọc: <strong>{data.cvTrue}</strong></p>
        <p>CV chưa đọc: <strong>{data.cvFalse}</strong></p>
      </Card>
    </>
  );
}
export default CVStatistic;
