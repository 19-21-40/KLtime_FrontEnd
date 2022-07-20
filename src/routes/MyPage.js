import MyPageForm from "../components/MyPageForm"

function MyPage(){
    return (
        <div>
          <MyPageForm
            studentnumber="2021203078"
            pw="1234"
            department="소프트웨어학부"
            email="5667649@naver.com"
          />
        </div>
    )
}

export default MyPage;