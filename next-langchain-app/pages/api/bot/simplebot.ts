// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//호출주소:http://localhost:3000/api/hello
//라우팅 주소는 /api 폴더 아래 물리적 폴더명과 파일명으로 라우팅 주소가 설정됨

//NextApiRequest
import type { NextApiRequest, NextApiResponse } from "next";

import { IMessage, UserType } from "@/interfaces/message";

import { ChatOpenAI } from "@langchain/openai";

import { SystemMessage, HumanMessage } from "@langchain/core/messages";

import { ChatPromptTemplate } from "@langchain/core/prompts";

//서버에서 주는 데이터의 형식 -> node express에서 apiResult와 같은 역할인가??????????
type ResponseData = {
  code: number;
  data: string | null | IMessage; //IMessage[]이 아니라 단일 데이터 건만 처리???????
  msg: string;
};

//node express에서는 get,post,put등을 각각 다른 함수로 처리하지만, next.js에서는 하나의 함수로 구현, 대신 코드가 더러움
//챗봇과의 챗팅은 다 POST 방식으로
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData> //response - 서->클
) {
  let apiResult: ResponseData = {
    code: 400,
    data: null,
    msg: "",
  };
  try {
    if (req.method == "POST") {
      //Step1:로직구현

      const prompt = req.body.message;

      //Step2:LLM 모델 생성하기
      const llm = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      //Step3: OpenAI llm모델 기반 질의/응답처리하기

      //Case1:초심플하게 llm 연동하기
      //const result = await llm.invoke(prompt);

      //Case2: 메시지 객체를 이용해서 llm 연동하기- PromptTemplate1
      //   const messages = [
      //     new SystemMessage(
      //       "당신은 세계의 트랜드를 완벽하게 파악하고 전망을 내다볼 수 있는 존재입니다."
      //     ),
      //     new HumanMessage(prompt),
      //   ];

      //   const result = await llm.invoke(messages);
      //   console.log("LLM 응답결과 메시지타입 확인하기=AIMessage:", result);

      //Case3: ChatPromptTemplate
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", "당신은 세계적으로 유명한 패션 디자이너입니다."],
        ["user", "{input}"],
      ]);
      const chain = promptTemplate.pipe(llm);
      const result = await chain.invoke({ input: prompt });

      const resultMsg: IMessage = {
        user_type: UserType.BOT,
        message: result.content as string,
        send_date: new Date(),
      };

      //Step2:API 호출결과 설정
      apiResult.code = 200;
      apiResult.data = resultMsg;
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
