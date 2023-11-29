import ImageComponent from "@/ui/atoms/ImageComponent";
import theme from "@/ui/theme";
import mainLandingBottom1 from "@images/pages/main/landing-bottom-1.png";
import mainLandingBottom2 from "@images/pages/main/landing-bottom-2.png";
import mainLandingBottom3 from "@images/pages/main/landing-bottom-3.png";
import mainLandingBottom4 from "@images/pages/main/landing-bottom-4.png";
import oneLineSaying from "@images/pages/main/oneLineSaying.png";
import { PageComponentLayout } from "../mentorsMain/PageComonentLayout";
import Label from "@/ui/atoms/Label";

const Footer = () => (
  <>
    <PageComponentLayout color={theme.colors.background}>
      <div>
        <div>
          장애에 맞는 직무 추천. 다양한 분야에 전문성을 가진 멘토들에게
          관심분야로의 진로 설계나 직무 전환에 도움을 받을 수 있어요. 다양한
          경험을 가진 코디의 멘토풀은 멘티들에게는 다양한 진로/직무 멘토링의
          기회를, 멘토들에게는 직무경험과 지식을 공유할 수 있는 기회를
          제공합니다.
        </div>
        <Label
          htmlFor="mainLandingBottom1"
          text="장애에 맞는 직무 추천. 다양한 분야에 전문성을 가진 멘토들에게 관심분야로의 진로 설계나 직무 전환에 도움을 받을 수 있어요. 다양한 경험을 가진 코디의 멘토풀은 멘티들에게는 다양한 진로/직무 멘토링의 기회를, 멘토들에게는 직무경험과 지식을 공유할 수 있는 기회를 제공합니다."
        />
        <ImageComponent
          width="100%"
          height="auto"
          src={mainLandingBottom1}
          alt="장애에 맞는 직무 추천. 다양한 분야에 전문성을 가진 멘토들에게 관심분야로의 진로 설계나 직무 전환에 도움을 받을 수 있어요. 다양한 경험을 가진 코디의 멘토풀은 멘티들에게는 다양한 진로/직무 멘토링의 기회를, 멘토들에게는 직무경험과 지식을 공유할 수 있는 기회를 제공합니다."
          {...{ id: "mainLandingBottom1" }}
        />
        <ImageComponent
          width="100%"
          height="auto"
          src={mainLandingBottom2}
          alt="main-landing-bottom"
        />
      </div>
    </PageComponentLayout>
    <ImageComponent
      width="100%"
      height="auto"
      src={oneLineSaying}
      alt="main-landing-bottom"
    />
    <PageComponentLayout>
      <ImageComponent
        width="100%"
        height="auto"
        src={mainLandingBottom3}
        alt="main-landing-bottom"
      />
      <ImageComponent
        width="100%"
        height="auto"
        src={mainLandingBottom4}
        alt="main-landing-bottom"
      />
    </PageComponentLayout>
  </>
);
export default Footer;
