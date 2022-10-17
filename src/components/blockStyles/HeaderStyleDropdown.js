import React from "react";

const HeaderStyleDropdown = ({ headerOptions, onToggle }) => {
  return (
    <div>
      {headerOptions.map((heading) => {
        const { Icon, label, style } = heading;
        return (
          <span id={style} onClick={() => onToggle(style)}>
            {Icon ? <Icon /> : label}
          </span>
        );
      })}
    </div>
  );
};

export default HeaderStyleDropdown;
