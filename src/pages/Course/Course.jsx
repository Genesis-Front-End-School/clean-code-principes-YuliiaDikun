import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import wiseyAPI from "../../services/genesisAPI";
import Lesson from "../../components/Lesson/Lesson";
import Loader from "../../components/Loader/Loader";
import Skill from "../../components/Skill/Skill";
import { Container } from "../../components/SharedLayout/SharedLayout.styled";
import {
  StyledSection,
  StyledCourse,
  GoBackLink,
  ImgWrapper,
  DescrWrapper,
  StyledProductTitle,
  StyledP,
} from "./Course.styled";
import { toast } from "react-toastify";

const Course = () => {
  const [course, setCourse] = useState(null);
  const [openLesson, setOpenLesson] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  const { id } = useParams();
  wiseyAPI.courseID = id;

  useEffect(() => {
    const getResults = async () => {
      try {
        const res = await wiseyAPI.getCourseById();
        setCourse(res);
      } catch (error) {
        toast.error(error.message);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    getResults();    
  }, [id, navigate]);

  useEffect(() => { 
    if (!course) return;
    const firstLesson = course.lessons[0];
    if (firstLesson.status === "unlocked") {
      setOpenLesson(firstLesson.id);
    }
  }, [course])

  const toggleLessonVideo = (lessonId) => {
    setOpenLesson((prevId) => {
      if (prevId === lessonId) {
        return "";
      }
      if (lessonId === "locked") {
        toast.error("Current video is locked");
        return "";
      }
      return lessonId;
    });
  };

  if (!course) return <Loader />;

  return (
    <StyledSection>
      <Container>
        {isLoading && <Loader />}
        <GoBackLink to={backLinkHref}>
          <MdOutlineArrowBackIosNew size={20} /> Back to courses
        </GoBackLink>
        <StyledCourse>
          <ImgWrapper>
            <img
              src={`${course.previewImageLink}/cover.webp`}
              alt={course.title}
            />
          </ImgWrapper>
          <DescrWrapper>
            <StyledProductTitle>{course.title}</StyledProductTitle>
            <StyledP>{course.description}</StyledP>
            <Skill skills={ course.meta?.skills} />
          </DescrWrapper>
        </StyledCourse>
        <h3>Course Lessons: </h3>
        <ul>
          {course.lessons?.map((lesson, i) => {
            return (
              <Lesson
                key={lesson.id}
                lesson={lesson}
                i={i}
                openLesson={openLesson}
                toggleLessonVideo={toggleLessonVideo}
              />
            );
          })}
        </ul>
      </Container>
    </StyledSection>
  );
};

export default Course;
