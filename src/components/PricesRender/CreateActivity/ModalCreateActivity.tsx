"use client";
import React, { Suspense, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { createActivity } from "../../../api-next/createActivity";
import { useRouter } from "next/navigation";
import SelectActivityToCreate from "./OptionsToCreate/SelectActivity";
import { typesActivity } from "../../../types/types-user";
import { getAllActivities } from "../../../api-next/getActivity";

export default function ModalCreateActivity() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameActivity, setNameActivity] = useState("");
  const [modality, setModality] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("#020202");
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const [activities, setActivities] = useState<typesActivity[]>([]);
  const exist = activities.find(
    (a) =>
      a.nameActivity.trim().toLowerCase() === nameActivity.trim().toLowerCase()
  );
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllActivities();
        if (res) setActivities(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const handleSubmit = async (onClose: () => void) => {
    setLoad(true);
    try {
      await createActivity({ color, modality, nameActivity, price, id: 0 });
      setLoad(false);
      onClose();
      router.refresh();
    } catch (e) {
      setLoad(false);
      console.log(e);
    }
  };

  return (
    <>
      <Button color="primary" variant="shadow" onPress={onOpen}>
        <IoMdAdd />
        Nueva actividad
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="outline-2"
        style={{ outlineColor: color }}
        onClose={() => {
          setColor("");
          setNameActivity("");
          setPrice(0);
          setModality("");
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                CREAT ACTIVIDAD {nameActivity.toUpperCase()}
              </ModalHeader>
              <ModalBody className="flex flex-col items-stretch ">
                <Tabs
                  size="sm"
                  color="primary"
                  className="w-full flex justify-center "
                  onSelectionChange={() => {
                    setColor("");
                    setNameActivity("");
                  }}
                >
                  <Tab className="flex flex-col gap-2" title="Nueva actividad">
                    <Input
                      variant="bordered"
                      size="sm"
                      color="primary"
                      errorMessage={
                        exist && "Existe una actividad con este nombre"
                      }
                      isInvalid={Boolean(exist)}
                      label={`Nombre de actividad`}
                      type="text"
                      onChange={(e) => setNameActivity(e.target.value)}
                    />

                    <Input
                      size="sm"
                      variant="bordered"
                      color="primary"
                      // isInvalid={!color}
                      errorMessage={!color && "Seleccione el color"}
                      type="color"
                      aria-invalid="spelling"
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </Tab>
                  <Tab title="Agregar modalidad">
                    <Suspense>
                      <SelectActivityToCreate
                        activities={activities}
                        setColor={setColor}
                        setName={setNameActivity}
                      />
                    </Suspense>
                  </Tab>
                </Tabs>
                <div>
                  <Input
                    size="sm"
                    variant="bordered"
                    color="primary"
                    label={`Modalidad de la actividad`}
                    type="text"
                    onChange={(e) => setModality(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    size="sm"
                    variant="bordered"
                    color="primary"
                    label={`Precio de la actividad`}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div></div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  isDisabled={load}
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={
                    load ||
                    nameActivity.length < 2 ||
                    modality.length < 2 ||
                    color.length < 2 ||
                    Boolean(exist)
                  }
                  isLoading={load}
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
}
