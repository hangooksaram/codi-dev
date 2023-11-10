export const copyTextToClipBoard = (
  content: string,
  completeMessage: string
) => {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      alert(`${completeMessage}가 복사되었습니다.`);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
};
