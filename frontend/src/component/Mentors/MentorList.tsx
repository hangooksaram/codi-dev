import ProfileCard from "../Profile/ProfileCard";
import { Mentor } from "@/types/mentor";
import Grid from "@/ui/atoms/Layout/Grid";

const MentorList = ({ mentors }: { mentors: Mentor[] }) => (
  <Grid
    gridTemplateColumns="repeat(auto-fit, minmax(260px, auto))"
    gridAutoRows="477px"
    columnGap="20px"
    rowGap="20px"
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
