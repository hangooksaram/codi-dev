import useGetMentorsQuery from "@/queries/mentorQuery";
import MentorSearch from "./MentorSearch";
import MentorList from "./MentorList";

const Mentors = () => {
  const { query, setQuery, mentors, isSuccess, refetch } = useGetMentorsQuery();

  return (
    isSuccess && (
      <>
        <MentorSearch query={query} setQuery={setQuery} refetch={refetch} />
        <MentorList mentors={mentors} />
      </>
    )
  );
};

export default Mentors;
