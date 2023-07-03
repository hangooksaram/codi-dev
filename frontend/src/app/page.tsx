"use client";

import {
  selectZoom,
  setZoom,
  setHighlight,
} from "@/features/webAccessibility/webAccessibliitySlice";

import { store } from "@/store/store";
import { css } from "@emotion/css";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <main>
      <p>
        글쓰기 교육에는 전문가가 별로 없다. 논리적인 글쓰기의 경우에는 더욱
        그렇다. 그것은 논리적인 글쓰기 영역이 몇가지 분야에 걸쳐 있기 때문이다.
        논리학의 기본 개념에 대해 파악하고 있어야 하고, 글쓰기의 형식적 면과
        내용적 면에도 능통해야 한다. 글의 구조나 구성 문제를 다루는 ‘형식적
        면’에서는 국어 관련 과목을 전공한 이가 유리하지만, 논리적 글쓰기의
        내용에 대해 능통한 이를 찾기란 쉽지 않은 일이다. 이런 모든 점 때문에
        통합논술을 학교 현장에서 가르칠 전문 인력이 턱없이 모자라는 현상이
        빚어지고 있고, 사교육 시장의 전문가라는 이들도 꼼꼼히 따져보면 ‘날탕’인
        경우가 허다하다. 요컨대 적절한 이론적 체계와 현장 경험이 합쳐져야 논리적
        글쓰기의 전문가가 될 수 있을 것이란 말이다.
      </p>
      <p>
        은 대학 현장에서 글쓰기 특강을 하고 있는 현직 교수의 책이라는 점에서 그
        효용성을 인정할 만하다. 실제 글쓰기 수업을 진행하고 있는 저자는
        대학생들이 제출한 글을 다양한 예시문으로 사용하면서 책을 썼다. 글쓰기의
        바탕이 되는 사회과학적인 개념에 대한 접근법, 넘쳐나는 자료를 구분하고
        활용하는 방법 등 글쓰기의 전략적 측면은 물론이고 제목 다는 법, 주어를
        정확히 쓰는 법, 허망한 결론을 피하는 법, 흑백 논리의 오류에 빠지지 않는
        법 등 전술에 해당하는 부분까지 저자는 세세히 설명하고 있다. 책은 그의
        학문 스타일대로 실사구시하는 면을 한껏 보여주고 있는 셈이다.
      </p>
      <p>
        저자는 대학생들의 글쓰기 수준을 확인하면서 논술 교육의 중요성과 필요성을
        절감했다고 털어놓고 있다. 생각하는 훈련이 생략된 우리 교육의 부정적
        결과를 목격했기 때문일 것이다. 이 책은 그런 면에서 앞으로 대학생들이 될
        예비 대학생들과 자녀들의 논술 교육을 걱정하는 학부모들이 일독할 가치가
        있다.
      </p>
      <button onClick={() => dispatch(setZoom(1.5))}>1.5배 확대</button>
      <button onClick={() => dispatch(setZoom(1))}>축소</button>
      <button
        className={css`
          position: absolute;
          z-index: 2;
        `}
        onClick={() => dispatch(setHighlight())}
      >
        하이라이팅
      </button>
    </main>
  );
}
