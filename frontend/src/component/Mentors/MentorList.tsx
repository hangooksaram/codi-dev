import ProfileCard from "../Profile/ProfileCard";
import { Mentor } from "@/types/mentor";
import Grid from "@/ui/atoms/Layout/Grid";
import { device } from "@/ui/theme";
import { css } from "@emotion/css";

const MentorList = ({ mentors }: { mentors: Mentor[] }) => (
  <Grid
    gridTemplateColumns="repeat(auto-fill,  minmax(23%, auto))"
    gridAutoRows="477px"
    columnGap="20px"
    rowGap="20px"
    className={css({
      [device("smWeb")]: {
        gridTemplateColumns: "repeat(auto-fill,  minmax(33%, auto))",
      },
      [device("mobile")]: {
        gridTemplateColumns: "repeat(auto-fill,  minmax(47%, auto))",
      },
    })}
  >
    {mentors!.map(
      ({
        id,
        mentorId,
        name,
        job,
        disability,
        severity,
        star,
        isCertificate,
        mentees,
        imgUrl,
      }) => (
        <ProfileCard
          key={mentorId}
          name={name}
          job={job}
          disability={disability}
          severity={severity}
          edit={false}
          star={star}
          isCertificate={isCertificate}
          mentees={mentees}
          imgUrl={imgUrl}
        ></ProfileCard>
      )
    )}
  </Grid>
);

export default MentorList;
