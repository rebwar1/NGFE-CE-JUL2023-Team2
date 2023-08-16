import { Layout } from "antd";
import "../../assets/scss/footer.scss";
const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter>
      <p className="pfooter">Skills City Bootcamps - Industry Projects</p>
    </AntFooter>
  );
}
