import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const menuItem = [
    { type: "link", text: "내 프로필", icon: <AccountBoxIcon sx={{fontSize: "3rem"}} />, path: "/mypage/myprofile" },
    { type: "link", text: "독서 캘린더", icon: <EventIcon sx={{fontSize: "3rem"}} />, path: "/calendar" },
    { type: "link", text: "서비스 정보", icon: <InfoIcon sx={{fontSize: "3rem"}} />, path: "/mypage/service-info" },
    { type: "action", text: "로그 아웃", icon: <ExitToAppIcon sx={{fontSize: "3rem"}} />, action: "logout" },
];

export default menuItem;