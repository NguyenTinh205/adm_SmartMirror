import React,{useEffect,useState} from "react";
import {
Table,
Button,
Input,
Select,
Space,
Card,
Modal,
Form,
message,
Tag
} from "antd";

import axios from "axios";

const {Search} = Input;

const StaffPage = ()=>{

const [staffs,setStaffs] = useState([]);
const [total,setTotal] = useState(0);
const [page,setPage] = useState(1);
const [search,setSearch] = useState("");
const [role,setRole] = useState("");

const [isModalOpen,setIsModalOpen] = useState(false);
const [editingStaff,setEditingStaff] = useState(null);

const [form] = Form.useForm();

const PAGE_SIZE = 6;

const fetchStaffs = async()=>{

try{

const res = await axios.get(
"http://localhost:3000/api/admin/staffs",
{
params:{
page,
search,
role
}
}
);

if(res.data.success){

setStaffs(res.data.items);
setTotal(res.data.total);

}

}catch(err){

message.error("Không thể tải danh sách nhân viên");

}

};

useEffect(()=>{
fetchStaffs();
},[page,search,role]);

/* =========================
MỞ MODAL SỬA
========================= */

const openEdit = (staff)=>{

setEditingStaff(staff);

form.setFieldsValue({
username: staff.username,
email: staff.email,
phone: staff.phone,
role: staff.role
});

setIsModalOpen(true);

};

/* =========================
CẬP NHẬT NHÂN VIÊN
========================= */

const updateStaff = async()=>{

try{

const values = await form.validateFields();

await axios.put(
`http://localhost:3000/api/admin/staffs/${editingStaff.id}`,
values
);

message.success("Cập nhật nhân viên thành công");

setIsModalOpen(false);

fetchStaffs();

}catch(err){

message.error("Cập nhật thất bại");

}

};

/* =========================
KHÓA NHÂN VIÊN
========================= */

const lockStaff = (id)=>{

Modal.confirm({

title:"Khóa tài khoản nhân viên?",
content:"Nhân viên sẽ không thể đăng nhập",

okText:"Đồng ý",
cancelText:"Hủy",

onOk: async()=>{

await axios.patch(
`http://localhost:3000/api/admin/staffs/${id}/lock`
);

message.success("Đã thay đổi trạng thái");

fetchStaffs();

}

});

};

/* =========================
RESET PASSWORD
========================= */

const resetPassword = (id)=>{

Modal.confirm({

title:"Reset mật khẩu?",
content:"Mật khẩu sẽ được đặt lại thành 123456",

okText:"Reset",
cancelText:"Hủy",

onOk: async()=>{

await axios.patch(
`http://localhost:3000/api/admin/staffs/${id}/reset-password`
);

message.success("Mật khẩu đã reset về 123456");

}

});

};

/* =========================
CỘT BẢNG
========================= */

const columns=[

{
title:"Tên đăng nhập",
dataIndex:"username"
},

{
title:"Email",
dataIndex:"email"
},

{
title:"Vai trò",
dataIndex:"role",
render:r=>(
<Tag color={r==="owner"?"magenta":"blue"}>
{r==="owner"?"Chủ cửa hàng":"Nhân viên"}
</Tag>
)
},

{
title:"Trạng thái",
dataIndex:"is_active",
render:v=>(
<Tag color={v?"green":"red"}>
{v?"Hoạt động":"Bị khóa"}
</Tag>
)
},

{
title:"Thao tác",
render:(_,r)=>(
<Space>

<Button
type="primary"
disabled={!r.is_active}
onClick={()=>openEdit(r)}
>
Sửa
</Button>

<Button
onClick={()=>lockStaff(r.id)}
>
Khóa
</Button>

<Button
danger
onClick={()=>resetPassword(r.id)}
>
Reset mật khẩu
</Button>

</Space>
)
}

];

return(

<Card title="Quản lý nhân viên">

{/* =========================
BỘ LỌC
========================= */}

<Space style={{marginBottom:20}}>

<Search
placeholder="Tìm nhân viên"
onSearch={setSearch}
allowClear
/>

<Select
placeholder="Vai trò"
style={{width:150}}
onChange={setRole}
allowClear
>

<Select.Option value="owner">
Chủ cửa hàng
</Select.Option>

<Select.Option value="staff">
Nhân viên
</Select.Option>

</Select>

</Space>

{/* =========================
BẢNG
========================= */}

<Table
rowKey="id"
columns={columns}
dataSource={staffs}
pagination={{
current:page,
total,
pageSize:PAGE_SIZE,
onChange:setPage
}}
/>

{/* =========================
MODAL SỬA
========================= */}

<Modal
title="Chỉnh sửa nhân viên"
open={isModalOpen}
onCancel={()=>setIsModalOpen(false)}
onOk={updateStaff}
okText="Lưu"
cancelText="Hủy"
>

<Form
form={form}
layout="vertical"
>

<Form.Item
label="Tên đăng nhập"
name="username"
rules={[{required:true,message:"Vui lòng nhập username"}]}
>
<Input/>
</Form.Item>

<Form.Item
label="Email"
name="email"
>
<Input/>
</Form.Item>

<Form.Item
label="Số điện thoại"
name="phone"
>
<Input/>
</Form.Item>

<Form.Item
label="Vai trò"
name="role"
rules={[{required:true,message:"Chọn vai trò"}]}
>
<Select>

<Select.Option value="owner">
Chủ cửa hàng
</Select.Option>

<Select.Option value="staff">
Nhân viên
</Select.Option>

</Select>
</Form.Item>

</Form>

</Modal>

</Card>

);

};

export default StaffPage;