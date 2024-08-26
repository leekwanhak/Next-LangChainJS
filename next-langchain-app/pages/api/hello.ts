// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//호출주소:http://localhost:3000/api/hello
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨

//NextApiRequest
import type { NextApiRequest, NextApiResponse } from "next";

//서버에서 주는 데이터의 형식 -> node express에서 apiResult와 같은 역할인가??????????
type ResponseData = {
  code: number;
  data: string | null;
  msg: string;
};

//node express에서는 get,post,put등을 각각 다른 함수로 처리하지만, next.js에서는 하나의 함수로 구현, 대신 코드가 더러움
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData> //response - 서->클
) {
  let apiResult: ResponseData = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    if (req.method == "GET") {
      //Step1:로직구현

      //Step2:API 호출결과 설정
      apiResult.code = 200;
      apiResult.data = "안녕하세요.백엔드데이터 GET 서비스입니다.";
      apiResult.msg = "Ok";
    }

    if (req.method == "POST") {
      //Step1:로직구현

      //Step2:API 호출결과 설정
      apiResult.code = 200;
      apiResult.data = "안녕하세요.백엔드데이터 POST 서비스입니다.";
      apiResult.msg = "Ok";
    }
  } catch (err) {
    //Step2:API 호출결과 설정
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error Failed";
  }

  res.json(apiResult);
}
