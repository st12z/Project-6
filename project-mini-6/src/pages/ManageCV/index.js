import { Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { getCookie } from "../../helper/cookie";
import { get } from "../../ulities";


function ManageCV(){
    const [data,setData] = useState();
    const idCompany = getCookie("id");
    useEffect(()=>{
        const fetchApi = async ()=>{
            const dataCV= await get(`cv?idCompany=${idCompany}`);
            const dataJob = await get(`jobs`);
            const data=[];
            const dataFinal=dataCV.map((itemCV)=>{
                const findJob = dataJob.find(itemJob => itemJob.id==itemCV.idJob && itemJob.idCompany==itemCV.idCompany);
                return{
                    nameJob:findJob.name,
                    name:itemCV.name,
                    phone:itemCV.phone,
                    email:itemCV.email,
                    createAt:itemCV.createAt,
                    statusRead:itemCV.statusRead,
                
                }
            })
            console.log(dataFinal);
            setData(dataFinal);
        }
        fetchApi();
    },[]);
    const columns=[
        {
            title: "Tên job",
            dataIndex:"nameJob",
            key: "nameJob",
            render: (_,record)=>{
                return(
                    <>
                        <Tag color="blue">{record.nameJob}</Tag>
                    </>
                )
            }
        },
        {
            title: "Họ và tên",
            dataIndex:"name",
            key: "name",
        },
        {
            title: "Số điện thoại",
            dataIndex:"phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex:"email",
            key: "email",
        },
        {
            title: "Ngày gửi",
            dataIndex:"createAt",
            key: "createAt",
        },
        {
            title: "Trạng thái",
            dataIndex:"statusRead",
            key: "statusRead",
            render: (_,record)=>{
                return(
                    <>
                        {record.statusRead? <Tag color="Green">Đã đọc</Tag>:<Tag color="Red">Chưa đọc</Tag>}
                    </>
                )
            }
        },
        {
            title: "Hành động",
            dataIndex:"action",
            key: "action",
            render: (_,record)=>{
                return(
                    <>
                        
                    </>
                )
            }
        },

    ]
    return(
        <>
            <h2>Danh sách CV</h2>
            <Table dataSource={data} columns={columns} rowKey={"id"}></Table>
        </>
    )
}
export default ManageCV;