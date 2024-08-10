import { Tag } from "antd";
import { useEffect, useState } from "react"
import { get } from "../../ulities";
import { Link } from "react-router-dom";

function SkillList(){
    const [data,setData] = useState();
    useEffect(()=>{
        const fetchApi = async () =>{
            const dataTag=await get("tags");
            setData(dataTag);
        }
        fetchApi();
    },[]);
    return(
        <>
            {data && data.map((item,index) =>(
                <Link to={`search?keyword=${item.value||""}`} key={index}>
                    <Tag color="blue" >{item.value}</Tag>
                </Link>
            ))}
        </>
    )
}
export default SkillList;