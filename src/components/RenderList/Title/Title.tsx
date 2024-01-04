interface Props {
  activityName: string;
  activityModality?: string;
}

export const Title: React.FC<Props> = ({ activityName, activityModality }) => {
  return (
    <div className={`mt-3`}>
      <h2 className={`text-neutral-300 text-3xl`}>{activityName}</h2>
      <p>{activityModality}</p>
    </div>
  );
};
