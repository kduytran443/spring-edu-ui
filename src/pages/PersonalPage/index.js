import { Avatar } from '@mui/material';

function PersonalPage() {
    return (
        <div>
            <h1 className="font-black text-4xl my-4 mb-8">Trang cá nhân</h1>
            <div className="flex flex-col items-center md:flex-row justify-center md:items-start">
                <Avatar
                    sx={{ width: 264, height: 264 }}
                    src={
                        'https://assets-global.website-files.com/62196607bf1b46c300301846/62196607bf1b4642e7301e28_5fb42ba3f6da8426682c53df_in%2520the%2520meeting%2520vs%2520at%2520the%2520meeting%2520grammar.jpeg'
                    }
                />
                <div className="flex-1 px-8 flex flex-col justify-between">
                    <span className="font-black text-2xl">Trần Khánh Duy</span>
                    <span className="text-2xl">Ngày sinh: 05/11/2001</span>
                    <span className="text-2xl">Giới tính: Nam</span>
                    <span className="text-2xl">Vai trò: Học viên</span>
                </div>
            </div>
        </div>
    );
}

export default PersonalPage;
