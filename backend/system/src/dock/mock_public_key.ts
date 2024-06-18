// Dock Sdk에서 지정한 PublilcKey 타입을 따를 수가 없는 상황이라서
// 인터페이스 참고해서, 가짜 클래스를 만들어 우리가 원하는 값을 몰래 끼워넣고자 만든 클래스다.
export class MockPublicKey {
  constructor(value: string) {
    // 원래는 이 value에 제약이 훨씬 많다. 32 bytes여야 하고, hex string이어야 한다.
    // 그러나 이걸 그냥 피해가보자.
    this.value = value;
  }
  value: string;

  // toJSON()이 모듈 내 로직에서 실행된다. 그러므로 이 메소드를 클래스 내에 아구에 맞게 만들어준다.
  toJSON() {
    // dock sdk에서 이미 정해진 Type의 키만 허용한다. 즉, key type validation이 있다.
    // 그래서 그냥 Sr25519라고 표현
    return {
      Sr25519: this.value,
    };
  }
}
