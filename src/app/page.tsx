
import Courses from "../app/courses/page";
import Event from "../app/event/page";
import Blogs from "../app/blogs/page";

export default async function Home() {
  return (
  <div>
    <Courses />
    <Event /> 
    <Blogs /> 
  </div>
  );
}
