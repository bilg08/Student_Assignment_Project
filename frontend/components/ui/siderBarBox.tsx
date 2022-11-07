import React, { useState } from "react";
import useCollapse from "react-collapsed";
type CardDataType = {
  children?: JSX.Element | JSX.Element[];
};
export const SidebarBox = (props: CardDataType) => {
  const { children } = props;
  return (
    <div
      style={{ marginTop: "25px" }}
      className="bg-white rounded-lg border-mid-purple border shadow-sidebarbox mt-0 "
    >
      {children}
    </div>
  );
};
export const SidebarBox2 = (props: CardDataType) => {
  const { children } = props;
  return (
    <div
      style={{ marginTop: "25px" }}
      className="bg-white rounded-lg border-mid-purple border shadow-sidebarbox2 mt-0 "
    >
      {children}
    </div>
  );
};

export const ColasipbleSidebarBox = (props: CardDataType) => {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  function handleOnClick() {
    setExpanded(!isExpanded);
  }
  const { children } = props;
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps({ onClick: handleOnClick })}>
        {isExpanded ? (
          <div
            style={{ marginTop: "25px" }}
            className="bg-white rounded-lg border-mid-purple border shadow-sidebarbox mt-0 "
          >
            {children}
          </div>
        ) : (
          <>
            <div
              style={{ marginTop: "25px" }}
              className="bg-white rounded-lg border-mid-purple border shadow-sidebarbox mt-0 "
            >
              {children}
            </div>
            <div
              style={{ marginTop: "15px" }}
              className="bg-white rounded-lg border-mid-purple border shadow-sidebarbox mt-0 flex flex-col"
            >
              <div>(хичээлийн нэр):(ng too) </div>
              <div>(хичээлийн нэр):(ng too) </div>
              <div>(хичээлийн нэр):(ng too) </div>
              <div>(хичээлийн нэр):(ng too) </div>

              {/* userdatanaas numberiig avad maplad display hiine
							useeffect dotr hiine */}
            </div>
          </>
        )}
      </div>
      <div {...getCollapseProps()}></div>
    </div>
  );
};
