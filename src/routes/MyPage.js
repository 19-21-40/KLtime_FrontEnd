import MyPageForm from "../components/MyPageForm"
import UserInfoProvider from "../context/UserInfoContext";

function MyPage(){
    return (
        <div>
          <UserInfoProvider>
            <MyPageForm />
          </UserInfoProvider>
        </div>
    )
}

export default MyPage;