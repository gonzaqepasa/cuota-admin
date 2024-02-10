import { typesUser } from "../../types/types-user";

import { Description } from "./InformationPanel/Description/Description";

import { NameUser } from "./InformationPanel/NameUser/NameUser";

import { PhoneUser } from "./InformationPanel/PhoneUser/PhoneUser";
import { ActivityUser } from "./InformationPanel/ActivityUser/ActivityUser";
import getUser from "../../api-next/getUser";

// import { mesActual } from "../../config/moths";

interface Props {
  id: string;
}

export const User = async ({ id }: { id: Promise<string> }) => {
  const userData = await getUser({ id: String(id) });

  if (userData)
    return (
      <div
        className={`flex flex-col items-center  w-screen  min-h-screen  ${
          !userData.active && `opacity-40 `
        }`}
      >
        <div className="flex items-end flex-wrap  justify-center pb-4  w-11/12">
          <div className={` backg-card-user  h-full rounded w-96  p-2 m-2`}>
            <NameUser user={userData} />
            <ActivityUser user={userData} />
            <PhoneUser user={userData} />
            <Description user={userData} />
          </div>
          <div className={`backg-card-user rounded  h-full w-96 p-2 m-2`}>
            {/* <ConfigUser userData={user}  /> */}
          </div>
        </div>

        {!userData.active ? (
          <div className="w-screen h-40  flex  justify-center">
            <button
              className={`text-white mb-5 hover:text-blue-300 `}
              // onClick={(e) =>
              //   visibilityUser(
              //     e,
              //     { id: Number(user.id), active: false },
              //     getUserAgain
              //   )
              // }
            >
              REACTIVAR USUARIO
            </button>
          </div>
        ) : (
          <></>
          // <RenderUser
          //   user={user}
          //   userData={userData}
          //   monthData={monthData}

          // />
        )}
      </div>
    );
  return <div>No existe este usuario</div>;
};

export default User;
