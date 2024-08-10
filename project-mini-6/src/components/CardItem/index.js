import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

function CardItem(props) {
  const { item } = props;
  return (
    <>
      <Card title={<Link to={"/job/"+item.id} style={{color:"blue"}}>{item.name}</Link>} key={item.key} >
        <div className="mb-10">
          <span>Ngôn ngữ: </span>
          {item.tags.map((tagItem, index) => (
            <Tag color="blue" key={index}>
              {tagItem}
            </Tag>
          ))}
        </div>
        <div className="mb-10">
            <span >Thành phố: </span>
          {item.city.map((itemCity, index) => (
            <Tag color="yellow" key={index}>
              {itemCity}
            </Tag>
          ))}
        </div>
        <div className="mb-10">
            <span>Lương: </span>
            <span style={{fontWeight:700}}> {item.salary}$</span>
        </div>
        <div className="mb-10">
            <span>Tên: </span>
            <span style={{fontWeight:700}}> {item.infoCompany[0] &&item.infoCompany[0].companyName}</span>
        </div>
        <div className="mb-10">
            <span>Ngày tạo: </span>
            <span style={{fontWeight:700}}> {item.createAt}</span>
        </div>
      </Card>
    </>
  );
}
export default CardItem;
