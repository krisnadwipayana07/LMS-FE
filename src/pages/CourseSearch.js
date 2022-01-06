import FilterFields from "../components/FilterFields";
import CourseCardList from "../components/CourseCardList/CourseCardList";
import Box from "@mui/material/Box";

const CourseSearch = () => {
  return (
    <Box sx={{ padding: 0 }}>
      <FilterFields />
      <CourseCardList />
    </Box>
  );
};

export default CourseSearch;
