import { getMentoringsByMonth } from "@/api/mentoringApi";
import formattedDate from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const GET_MENTORINGS_FROM_TODAY_KEY = ["mentorings"];

const useMentoringsQuery = (dateQuery: string) => {
  const { data, isSuccess, refetch } = useQuery(
    GET_MENTORINGS_FROM_TODAY_KEY.concat(dateQuery),
    () => getMentoringsByMonth(dateQuery)
  );
  //   const mentorings = data?.data as any[];

  const mock = [
    {
      date: "2023/06/24",
      times: [
        "10:00",
        "12:00",
        "13:00",
        "10:00",
        "12:00",
        "13:00",
        "10:00",
        "12:00",
        "13:00",
        "10:00",
        "12:00",
        "13:00",
      ],
      completed: false,
      accepted: false,
    },
    {
      date: "2023/06/25",
      times: ["11:00", "10:00"],
      completed: false,
      accepted: false,
    },

    {
      date: "2023/06/26",
      times: ["15:00", "01:00"],
      completed: false,
      accepted: true,
    },
    {
      date: "2023/06/21",
      times: ["10:00", "12:30"],
      completed: false,
      accepted: false,
    },

    {
      date: "2023/06/11",
      times: ["10:00"],
    },
  ];

  const r_mock = [];

  for (let i = 0; i < 7; i++) {
    r_mock.push(mock[Math.floor(Math.random() * (mock.length - 1))]);
  }
  const mentorings = r_mock;
  return { mentorings, isSuccess, refetch };
};

export default useMentoringsQuery;
