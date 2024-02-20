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
import { createActivity } from "../../../api-next/activity/createActivity";
import { useRouter } from "next/navigation";
import SelectActivityToCreate from "./OptionsToCreate/SelectActivity";
import { typesActivity } from "../../../types/types-user";
import { getAllActivities } from "../../../api-next/activity/getActivity";
interface Props {
  activitiesRes: typesActivity[];
}
const ModalCreateActivity: React.FC<Props> = ({ activitiesRes }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [nameActivity, setNameActivity] = useState("");
  const [forCreate, setForCreate] = useState<0 | 1>(1);
  const [modality, setModality] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("#020202");
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const exist = activitiesRes.find(
    (a) =>
      a.nameActivity.trim().toLowerCase() === nameActivity.trim().toLowerCase()
  );
  const filteredData: typesActivity[] = Object.values(
    activitiesRes.reduce((acc: any, obj: any) => {
      // Utiliza la actividad como clave del objeto
      acc[obj.nameActivity] = obj;
      return acc;
    }, {})
  );
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
                  <Tab
                    className="flex flex-col gap-2"
                    title="Nueva actividad"
                    key={1}
                  >
                    <div>
                      <p className="text-sm">{`Ingrese un nombre para la nueva actividad, ej: Gimnasio. `}</p>
                      <Input
                        variant="flat"
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
                    </div>
                    <div>
                      <p className="text-sm">{`Seleccione un color para reconocer la actividad.`}</p>
                      <Input
                        size="sm"
                        variant="flat"
                        color="primary"
                        // isInvalid={!color}
                        errorMessage={!color && "Seleccione el color"}
                        type="color"
                        aria-invalid="spelling"
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                  </Tab>
                  <Tab
                    key={0}
                    title="Agregar modalidad"
                    isDisabled={activitiesRes.length === 0}
                  >
                    <Suspense>
                      <p className="text-sm">
                        {`Elija una actividad ya creada para agregar una modalidad nueva.`}
                      </p>
                      <SelectActivityToCreate
                        forCreate={forCreate}
                        activities={filteredData}
                        setColor={setColor}
                        setName={setNameActivity}
                      />
                    </Suspense>
                  </Tab>
                </Tabs>
                <div>
                  <p className="text-sm">{`Ingrese una modalidad para la nueva actividad, ej: Libre, 3 Días, Unica, etc.`}</p>
                  <Input
                    size="sm"
                    variant="flat"
                    color="primary"
                    label={`Modalidad de la actividad`}
                    type="text"
                    onChange={(e) => setModality(e.target.value)}
                  />
                </div>
                <div>
                  <p className="text-sm">{`Ingrese el precio que va a costar mensualmente la actividad.`}</p>
                  <Input
                    size="sm"
                    variant="flat"
                    min={0}
                    max={100000}
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
                    (Boolean(exist) && !Boolean(forCreate))
                  }
                  isLoading={load}
                  onPress={() => handleSubmit(onClose)}
                >
                  Crear actividad
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateActivity;
