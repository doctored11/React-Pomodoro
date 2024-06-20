import React, { FC } from "react";

interface SVGIconProps {
  xlinkHref: string;
  classes?: string;
}

const SVGIcon: FC<SVGIconProps> = ({ xlinkHref, classes }) => (
  <object type="image/svg+xml" data={xlinkHref} className={`svg ${classes}`} />
);

export default SVGIcon;
