import useGetMentorsQuery from "@/queries/mentorQuery";
import MentorSearch from "./MentorSearch";
import MentorList from "./MentorList";
import { css } from "@emotion/css";
import Pagination from "@/ui/molecules/Pagination";
import usePagination from "@/hooks/usePagination";

const Mentors = () => {
  const {
    query,
    setQuery,
    mentors,
    pageInfo,
    isSuccess,
    refetch,
    setSearched,
    page,
    setPage,
  } = useGetMentorsQuery();

  const { isNext, isStart, goNext, goPrev, current, currentPages, setCurrent } =
    usePagination({ totalCount: pageInfo?.totalPages }, [isSuccess]);

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
        <Pagination
          isNext={isNext}
          isStart={isStart}
          goNext={goNext}
          goPrev={goPrev}
          current={current.current}
          currentPages={currentPages}
          setCurrent={setCurrent}
          onClickCurrentPage={(page: number) => {
            setPage(page);
          }}
        />
      </>
    )
  );
};

export default Mentors;
