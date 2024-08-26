//채팅이력을 위한 타입 정의
//사용자는 그저 채팅 하나만 보내기만 하는데 프론트에서 전달되는 데이터는 여러개가 있다.
export interface IMessage {
  user_type: UserType;
  message: string;
  send_date: Date;
}

//사용자간 채팅이 아니라 사용자 1명 + 봇 1명간의 채팅하는 것이기 때문에 enum으로 사용하여 사용자 타입을 정의
export enum UserType {
  USER = "User",
  BOT = "Bot",
}

export interface IChatPrompt {
  role: string;
  message: string;
}

//대화이력챗봇 전용 메시지 타입 정의: 기본메시지타입 상속받아 기능확장함
//interface IMessage를 상속받아서 IMemberMessage를 정의
export interface IMemberMessage extends IMessage {
  nick_name: string;
}
