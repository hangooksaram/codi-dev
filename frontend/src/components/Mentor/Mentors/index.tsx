import useGetMentorsQuery from "@/queries/mentorQuery";
import MentorSearch from "./MentorSearch";
import MentorList from "./MentorList";
import { css } from "@emotion/css";

const Mentors = () => {
  const { query, setQuery, mentors, isSuccess, refetch, setSearched } =
    useGetMentorsQuery();

  return (
    isSuccess && (
      <>
        <MentorSearch
          query={query}
          setQuery={setQuery}
          refetch={refetch}
          setSearched={setSearched}
        />
        <div className={css({ marginTop: "40px" })}>
          <MentorList mentors={mentors} />
        </div>
      </>
    )
  );
};

export default Mentors;
