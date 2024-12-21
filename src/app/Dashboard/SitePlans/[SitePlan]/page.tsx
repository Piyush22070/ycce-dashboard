import { FC } from 'react';

interface SitePlanProps {
  params: {
    SitePlan: string;
  };
}
const SitePlan: FC<SitePlanProps> = ({ params }) => {
  return <div>{params.SitePlan}</div>;
};

export default SitePlan;
