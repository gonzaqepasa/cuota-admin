"use client";
import { useState, useEffect, ChangeEvent, useTransition } from "react";
import {
  Modal,
  Select,
  SelectItem,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { typesActivity, typesUser } from "../../../../../types/types-user";
import { url } from "../../../../../config/env_d";
import { changeActivity } from "../../../../../api-next/user/changeActivity";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import {
  getActivityClient,
  getAllActivitiesByName,
} from "../../../../../api-next/activity/getActivity";
interface Props {
  user: typesUser;
  activity: typesActivity;
  defaultVal: string;
}

export const EditActivity: React.FC<Props> = ({
  user,
  activity,
  defaultVal,
}) => {
  const [load, setLoad] = useState(true);
  const [selected, setSelected] = useState(activity);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  /////////////////// CAMBIAR MODALIDAD ///////////////////////
  const [activityRender, setActivityRender] = useState<typesActivity[]>([]);

  // console.log("Esto llega a EditActivity");
  // console.log({ defaultVal, activity, user });
  useEffect(() => {
    (async function () {
      try {
        // console.log("Entro a buscar las diferentes actividades");
        const data = await getAllActivitiesByName({
          nameActivity: activity.nameActivity,
        });

        // console.log("Estas son las actividades", data);
        setActivityRender(data);
        setLoad(false);
      } catch (err) {
        setLoad(false);

        console.log(err);
      }
    })();
  }, []);
  ///////////////////////////////////////////////////////////////
  // console.log("refresh si");
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedActivity = activityRender.find(
      (a) => a.modality === event.target.value
    );
    selectedActivity && setSelected(selectedActivity);
  };
  const handleSubmit = async (onClose: () => void) => {
    try {
      await changeActivity({ activity: selected, id_user: user._id, onClose });
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        variant="light"
        color="primary"
        className="min-w-0 w-10 h-10 p-0 text-lg"
      >
        <CiEdit />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => setSelected(activity)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Select
                  onChange={handleChange}
                  id=""
                  label={false}
                  placeholder="Seleccionar nueva modalidad"
                  aria-label="asdasd"
                >
                  {activityRender.map((a, i) => (
                    <SelectItem
                      isDisabled={a._id === activity._id}
                      value={a._id}
                      key={a.modality}
                    >
                      {a.modality}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={load}
                  isDisabled={load || defaultVal === selected.modality}
                  onPress={() => handleSubmit(onClose)}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
