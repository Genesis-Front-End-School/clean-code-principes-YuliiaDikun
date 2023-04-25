import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import wiseyAPI from "../../services/genesisAPI";
import { sortedByDate } from "../../helpers";
import { Container } from "../../components/SharedLayout/SharedLayout.styled";
import Logo from "../../components/Logo/Logo";
import CourseList from "../../components/CourseList/CourseList";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import { StyledSection, MainTitle } from "./Home.styled";
import { toast } from "react-toastify";


const PAGE_SIZE = 10;
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const page = searchParams.get("page") ?? "1";

  useEffect(() => {
    const getResults = async () => {
      try {
        const {courses} = await wiseyAPI.getCourses();        
        const sortedCourses = sortedByDate(courses);
        setCourses(sortedCourses);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getResults();
  }, []);

  const updateQueryString = (page) => {
    const nextParams = page !== "" ? { page } : {};
    setSearchParams(nextParams);
  };

  const currentCourseData = useMemo(() => {
    const firstPageIndex = (page - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;
    return courses.slice(firstPageIndex, lastPageIndex);
  }, [page, courses]);

  return (
    <StyledSection>
      <Container>
        {isLoading && <Loader />}
        <MainTitle>
          <Logo /> - Learning has never been more convenient!
        </MainTitle>
        <CourseList memoCourses={currentCourseData}/>       
        <Pagination
          currentPage={Number(page)}
          totalCount={courses.length}
          pageSize={PAGE_SIZE}
          onPageChange={(page) => updateQueryString(page)}
        />
      </Container>
    </StyledSection>
  );
};

export default Home;
