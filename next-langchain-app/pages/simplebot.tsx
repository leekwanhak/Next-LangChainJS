import { useState } from "react";

import { IMessage, UserType } from "@/interfaces/message";

const Simplebot = () => {
  //사용자 입력 채팅 메시지 상태값 정의 및 초기화
  const [message, setMessage] = useState<string>("");

  //챗봇과의 채팅이력 상태값 목록 정의 초기화
  const [messageList, setMessageList] = useState<IMessage[]>([
    //가짜 데이터 넣어서 확인
  ]);

  //클라이언트 서버 API 호출 부분
  const messageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage: IMessage = {
      user_type: UserType.USER,
      message: message,
      send_date: new Date(),
    };

    //websocket과의 차이점 이해가 안가는데?????????????????
    setMessageList((prev) => [...prev, userMessage]);

    const response = await fetch("/api/bot/simplebot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (response.status === 200) {
      const result = await response.json(); //서버에서 받은 데이터를 json으로 변환
      setMessageList((prev) => [...prev, result.data]); //prev - 최근에 저장된 messageList
      setMessage(""); //입력창 초기화
    }
  };

  return (
    <div className="m-4">
      SimpleBot
      {/* 메시지 입력 전송 영역 */}
      <form className="flex mt-4" onSubmit={messageSubmit}>
        <input
          type="text" //name을 쓰지 않는데, name을 쓰면 form에서 submit할 때 같이 전송되기 때문에 사용하지 않음
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="block rounded-md w-[500px] border-0 py-1 pl-2 text-gray-900 shadow-sm"
        />
        <button>전송</button>
      </form>
      {/* 메시지 출력 표시 영역 */}
      <div className="mt-4">
        <ul>
          {messageList.map((msg, index) => (
            <li key={index}>
              {msg.user_type}:{msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Simplebot;
