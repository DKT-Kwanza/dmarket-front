import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./Footer";

export default {
    title: "Footer",
    component: Footer,
    tags: ["autodocs"],
}

const Template = (args) => (
    <Router>
        <Footer {...args} />
    </Router>
);

export const DefaultFooter = Template.bind({});
DefaultFooter.args = {};