// add some helpful assertions
import "jest-dom/extend-expect";
// this is basically: afterEach(cleanup)
import "react-testing-library/cleanup-after-each";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
