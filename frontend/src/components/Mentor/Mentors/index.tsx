import useGetMentorsQuery from "@/queries/mentorQuery";
import MentorSearch from "./MentorSearch";
import MentorList from "./MentorList";
import { css } from "@emotion/css";
import Card from "@/ui/atoms/Card";
import Typography from "@/ui/atoms/Typography";

const Mentors = () => {
  const { query, setQuery, mentors, isSuccess, refetch } = useGetMentorsQuery();

  return (
    isSuccess && (
      <>
        <MentorSearch query={query} setQuery={setQuery} refetch={refetch} />
        <div className={css({ marginTop: "40px" })}>
          <MentorList mentors={mentors} />
        </div>
      </>
    )
  );
};

export default Mentors;
