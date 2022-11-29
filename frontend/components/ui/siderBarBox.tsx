import React, { useState } from "react";
import useCollapse from "react-collapsed";
type CardDataType = {
  children: React.ReactNode;
  data: { _id: string; avg: number,sum:number }[];
};

export const SidebarBox = (props: CardDataType) => {
  const { children } = props;
  return (
    <div
      style={{ marginTop: "25px" }}
      className="bg-white rounded-lg border-mid-purple border shadow-sidebarbox mt-0 ">
      {children}
    </div>
  );
};
export const SidebarBox2 = (props: CardDataType) => {
  const { children } = props;
  return (
    <div
      style={{ marginTop: "25px" }}
      className="bg-white rounded-lg border-mid-purple border shadow-sidebarbox2 mt-0 ">
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
  const { children, data } = props;
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps({ onClick: handleOnClick })}>
        {isExpanded ? (
          <div
            style={{ marginTop: "25px" }}
            className="  mt-0 border border-dark-purple rounded-lg ">
            {children}
          </div>
        ) : (
          <>
            <div
              style={{ marginTop: "25px" }}
              className="  mt-0 border border-dark-purple rounded-lg ">
              {children}
            </div>
            <div
              style={{ marginTop: "15px" }}
              className="bg-white rounded-lg border-mid-purple border mt-0 flex flex-col">
              {data.map((el) => (
                <div key={el._id + el.avg}>
                  ({el._id}):({el.avg}"%"):({el.sum}ш){" "}
                </div>
              ))}

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
