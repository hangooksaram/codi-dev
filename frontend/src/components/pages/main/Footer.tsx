import ImageComponent from "@/ui/atoms/ImageComponent";
import theme from "@/ui/theme";
import mainLandingBottom1 from "@images/pages/main/landing-bottom-1.png";
import mainLandingBottom2 from "@images/pages/main/landing-bottom-2.png";
import mainLandingBottom3 from "@images/pages/main/landing-bottom-3.png";
import mainLandingBottom4 from "@images/pages/main/landing-bottom-4.png";
import oneLineSaying from "@images/pages/main/oneLineSaying.png";
import { PageComponentLayout } from "../mentorsMain/PageComonentLayout";

const footerImages = [
  {
    src: mainLandingBottom1,
    alt: "장애에 맞는 직무 추천. 다양한 분야에 전문성을 가진 멘토들에게 관심분야로의 진로 설계나 직무 전환에 도움을 받을 수 있어요. 다양한 경험을 가진 코디의 멘토풀은 멘티들에게는 다양한 진로/직무 멘토링의 기회를, 멘토들에게는 직무경험과 지식을 공유할 수 있는 기회를 제공합니다.",
  },
  {
    src: mainLandingBottom2,
    alt: "맞춤형 멘토 매칭. 장애구분, 희망직무, 관심사 등을 기반으로 멘토를 검색해 1:1 멘토링 진행을 요청할 수 있습니다. 맞춤형 멘토링으로 개개인의 요구에 맞는 지도와 조언을 제공할 수 있어, 개인의 잠재력을 발견하고 성장과 발전을 지원하기에 최적화되어 있습니다.",
  },
  {
    src: mainLandingBottom3,
    alt: "장애청소년 진로멘토링. 장애청소년 진로멘토링 참여 시 진로관리역량과 긍정적 자아 인식이 향상되는 효과가 있어요!. 2019 장애청소년 진로멘토링 결과. 진로관리역량 111.3% 증가. 긍정적자아인식 113.4% 증가.",
  },
  {
    src: mainLandingBottom4,
    alt: "Mentee 누군가 나와 같은 곳을 바라보고, 같은 고민을 하며, 내 삶에 동행해준다는 것이 어찌나 든든한 일인지 몰라요. 다른 친구들도 같은 기회를 꼭 함께 누렸으면 합니다.Mentor 멘티가 성장하는 모습을 보며 멘토링이 멘티에게 정말 필요한 활동이라 생각됐고, 나 자신 또한 발전하고 성장하는 데 큰 영향을 준 정말 고마운 활동이에요.",
  },
];

const Footer = () => (
  <>
    <PageComponentLayout color={theme.colors.background}>
      <div>
        <ImageComponent
          width="100%"
          height="auto"
          src={footerImages[0].src}
          alt={footerImages[0].alt}
        />
        <ImageComponent
          width="100%"
          height="auto"
          src={footerImages[1].src}
          alt={footerImages[1].alt}
        />
      </div>
    </PageComponentLayout>
    <ImageComponent width="100%" height="auto" src={oneLineSaying} alt="" />
    <PageComponentLayout>
      <ImageComponent
        width="100%"
        height="auto"
        src={footerImages[2].src}
        alt={footerImages[2].alt}
      />
      <ImageComponent
        width="100%"
        height="auto"
        src={footerImages[3].src}
        alt={footerImages[3].alt}
      />
    </PageComponentLayout>
  </>
);
export default Footer;
