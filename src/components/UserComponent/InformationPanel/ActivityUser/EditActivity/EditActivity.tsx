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
import { changeActivity } from "../../../../../api-next/changeActivity";
import { useRouter } from "next/navigation";

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
  const [activityRender, setActivityRender] = useState<typesActivity[]>([
    activity,
  ]);

  console.log({ defaultVal, selected });
  useEffect(() => {
    (async function () {
      try {
        console.log("Entro a buscar las diferentes actividades");
        const res = await fetch(
          `${url}/activity/get-activity?activity=${activity.nameActivity}`
        );
        const data = await res.json();
        setActivityRender(data);
        setLoad(false);
      } catch (err) {
        setLoad(false);

        console.log(err);
      }
    })();
  }, []);
  ///////////////////////////////////////////////////////////////
  console.log("refresh si");
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedActivity = activityRender.find(
      (a) => a.modality === event.target.value
    );
    selectedActivity && setSelected(selectedActivity);
    console.log({ selected, selectedActivity, defaultVal });
  };
  const handleSubmit = async (onClose: () => void) => {
    try {
      await changeActivity({ activity: selected, id_user: user.id, onClose });
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
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
                  defaultSelectedKeys={[defaultVal]}
                  placeholder={defaultVal}
                  label={false}
                  aria-label="asdasd"
                >
                  {activityRender.map((a, i) => (
                    <SelectItem
                      isDisabled={a.id === activity.id}
                      value={a.id}
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
