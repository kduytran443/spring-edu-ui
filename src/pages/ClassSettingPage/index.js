import { FormControlLabel, FormGroup, Switch } from '@mui/material';

function ClassSettingPage() {
    return (
        <div className="p-2 md:p-0">
            <h1 className="font-bold text-xl my-2">Cài đặt</h1>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Ẩn lớp học khỏi trang chính" />
            </FormGroup>
            <div>Hình nền chủ đề</div>
        </div>
    );
}

export default ClassSettingPage;
