import React from 'react'

type Props = {}

const route = (props: Props) => {
  return (
    <div className='max-w-4xl md:max-w-5xl flex flex-col justify-center items-center gap-8 m-auto p-4'>
      <section>
        <h2 className='text-lg font-bold'>Korean Developer & Designer</h2>
        <p>
          KDD는 Korean Developer and Designer 그룹으로 캐나다 서부지역 IT분야 한인들의 비영리 모임입니다.
          KDD는 2017년 부터 한인 IT분야 종사자들의 교류와 지역사회 발전을 위해 노력하고 있습니다.
        </p>
      </section>
      <section>
        <h2 className='text-lg font-bold'>About Us</h2>
        <p>
          KDD는 밴쿠버지역의 IT에 종사하는 한인들이 모여 교류할 수 있는 모임으로 2017년 7월에 처음으로
          모임을 시작했습니다. 현재 KDD는 광역 밴쿠버 뿐만 아니라 빅토리아, 캘거리, 토론토 등 다양한
          지역의 회원들도 모임에 참여하여 총 회원이 1000명 이상이며, 매달 30여분의 신규 회원이 가입하고
          있습니다. 매월 정기 온라인 모임을 개최하여 한인들간의 친목과 교류를 도모하고 있습니다. 지난
          4년년간 KDD는 IT세미나, 워크샵, 커리어코칭, 멘토링 등 38회의 다양한 이벤트를 개최해왔고, 많은
          분들이 KDD를 통해 직장을 구하고, 캐나다 정착에 성공하였습니다. 또한 KDD는 한인 소상공인과의
          협력을 통한 주니어 개발자, 디자이너들의 성장을 도모하는 스텝업 프로그램을 시작하여 지역사회에
          도움이 되는 모임으로 성장하고 있습니다
        </p>
      </section>
      <section>
        <h2 className='text-lg font-bold'>Message From Members</h2>
        <p>
          “KDD 회원분의 리퍼럴 덕분에 풀타임 취업에 성공했습니다. 4개월간 취업을 못해 고생했는데 KDD를
          진작 알았다면 하는 아쉬움이 드네요.” “어디로 거주지를 정할지 고민이었는데 모임에서 들은 팁을
          바탕으로 살 곳을 정하게 됐어요.” “밴쿠버에서 또래 친구를 만나게 돼서 더 좋았어요” “졸업후 잡을
          찾지 못해서 고생했는데 KDD회원분이 사내 채용정보를 알려주셔서 취업하게 됐습니다. 네트워킹이 정말
          중요한것 같아요.”
        </p>
      </section>
      <section>
        <h2 className='text-lg font-bold'>Wanted</h2>
        <p>
          KDD의 모든 행사는 자원봉사 및 재능기부로 이루어지고 있습니다. 멘토링, 세미나등 모임에 도움을
          주고자 하는 분들은 언제든 vancouverkdd@gmail.com 로 연락주세요.
        </p>
      </section>
    </div>
  )
}

export default route