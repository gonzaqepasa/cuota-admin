import { Button } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  onClose: () => void;
  isLoad: boolean;
  name: string;
  activity: string | null;
}

export const ButtonForm: React.FC<Props> = ({
  onClose,
  isLoad,
  name,
  activity,
}) => {
  return (
    <div className={` w-full flex flex-row-reverse justify-center py-2 gap-2`}>
      <Button
        className={``}
        variant="solid"
        color="primary"
        type="submit"
        isLoading={isLoad}
        isDisabled={isLoad || name.length < 2 || !Boolean(activity)}
      >
        Agregar
      </Button>
      <Button
        className={``}
        isDisabled={isLoad}
        variant="light"
        color="danger"
        onPress={onClose}
      >
        Cancelar
      </Button>
    </div>
  );
};
