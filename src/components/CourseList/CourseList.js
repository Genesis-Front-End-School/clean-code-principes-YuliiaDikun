import CourseItem from "../CourseItem/CourseItem";
import { StyledList } from "./CourseList.styled";

const CourseList = ({ memoCourses }) => {
  return (
    <StyledList>
      {memoCourses.map((course) => {
        return <CourseItem key={course.id} course={course} />;
      })}
    </StyledList>
  );
};

export default CourseList;
