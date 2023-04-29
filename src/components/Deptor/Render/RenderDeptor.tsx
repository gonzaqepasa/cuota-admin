import { CardDeptors } from "./CardDeptors/CardDeptor";
import styles from "./RenderDeptor.module.scss";

interface Props {
  dataMonths: any;
}

export const RenderDeptor: React.FC<Props> = ({ dataMonths }) => {
  const aux = [
    {
      title: "Gimnasio",
      data: dataMonths.filter(
        (m: any) => m.calendar.User.activity.nameActivity === "Gimnasio"
      ),
    },
    {
      title: "Taekwondo",
      data: dataMonths.filter(
        (m: any) => m.calendar.User.activity.nameActivity === "Taekwondo"
      ),
    },
    {
      title: "Power Box",
      data: dataMonths.filter(
        (m: any) => m.calendar.User.activity.nameActivity === "Power Box"
      ),
    },
    {
      title: "Zumba",
      data: dataMonths.filter(
        (m: any) => m.calendar.User.activity.nameActivity === "Zumba"
      ),
    },
    {
      title: "Kick Boxing",
      data: dataMonths.filter(
        (m: any) => m.calendar.User.activity.nameActivity === "Kick Boxing"
      ),
    },
    {
      title: "Jiu Jitzu",
      data: dataMonths.filter(
        (m: any) => m.calendar.User.activity.nameActivity === "Jiu Jitzu"
      ),
    },
    {
      title: "GAP Funcional",
      data: dataMonths.filter(
        (m: any) => m.calendar.User.activity.nameActivity === "GAP Funcional"
      ),
    },
  ];

  return (
    <>
      {aux.map((obj, index) => {
        if (obj.data.length > 0) {
          return <CardDeptors data={obj.data} title={obj.title} key={index} />;
        }
      })}
    </>
  );
};
