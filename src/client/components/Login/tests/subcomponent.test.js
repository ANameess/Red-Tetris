import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Input from "../../common/Input";
import LoginSub from "../subcomponent";

const props = {
  connectPlayer: jest.fn()
};

describe("<LoginSub />", () => {
  test("should render without crashing", () => {
    const wrapper = shallow(<LoginSub {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("should update playerName and set error to false with a valid input", () => {
    const wrapper = shallow(<LoginSub {...props} />);
    const event = { target: { value: "ValidName" } };

    wrapper.find(Input).simulate("change", event);
    expect(wrapper.find(Input).props().value).toBe("ValidName");
    expect(wrapper.find(Input).props().error).not.toBeTruthy();
  });
  test("should update playerName and set error to true with a too long playerName", () => {
    const wrapper = shallow(<LoginSub {...props} />);
    const event = { target: { value: "PlayerNameTooLong" } };

    wrapper.find(Input).simulate("change", event);
    expect(wrapper.find(Input).props().value).toBe("PlayerNameTooLong");
    expect(wrapper.find(Input).props().error).toBeTruthy();
  });
  test("should update playerName and set error to true with an unvalid character", () => {
    const wrapper = shallow(<LoginSub {...props} />);
    const event = { target: { value: "Name$" } };

    wrapper.find(Input).simulate("change", event);
    expect(wrapper.find(Input).props().value).toBe("Name$");
    expect(wrapper.find(Input).props().error).toBeTruthy();
  });
});
