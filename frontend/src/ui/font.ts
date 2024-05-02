import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    { path: '../../public/fonts/ko/Pretendard-Regular.otf', weight: '400' },
    { path: '../../public/fonts/ko/Pretendard-ExtraBold.otf', weight: '800' },
    { path: '../../public/fonts/ko/Pretendard-Bold.otf', weight: '700' },
    { path: '../../public/fonts/ko/Pretendard-Black.otf', weight: '900' },
    { path: '../../public/fonts/en/Lexend-Regular.ttf', weight: '400' },
    { path: '../../public/fonts/en/Lexend-ExtraBold.ttf', weight: '800' },
    { path: '../../public/fonts/en/Lexend-Bold.ttf', weight: '700' },
    { path: '../../public/fonts/en/Lexend-Black.ttf', weight: '900' },
  ],
});

export default myFont;
