import Activity from "../src/mongoose/models/Activity";
import { typesActivity } from "../src/types/types-user";

export async function createActivityService({
  color,
  modality,
  nameActivity,
  price,
}: typesActivity) {
  try {
    // Obtener el negocio al que deseas agregar la actividad
    console.table({ nameActivity, price, modality, color });

    const activity = new Activity({
      nameActivity,
      modality,
      price,
      color,
    });
    await activity.save();

    // Agregar la actividad al array de actividades del negocio

    return activity;
  } catch (e) {
    console.log(e);
    throw new Error("Mensaje de error específico");
  }
}

export async function getActivitiesToDashboard() {
  try {
    const data = await Activity.find()
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Hubo un error al buscar las actividades");
  }
}

export async function editActivity({
  _id,
  price,
  modality,
  description,
  nameActivity,
  color,
}: typesActivity) {
  try {
    // Verificar si se proporcionó un ID válido
    if (!_id) {
      return { error: "Se requiere un ID de actividad válido" };
    }

    // Crear un objeto con las propiedades actualizadas
    const updatedFields: { [key: string]: any } = {};
    if (price) {
      updatedFields.price = price;
    }
    if (nameActivity) {
      updatedFields.nameActivity = nameActivity;
    }
    if (modality) {
      updatedFields.modality = modality;
    }
    if (description) {
      updatedFields.description = description;
    }
    if (color) {
      updatedFields.color = color;
    }

    // Actualizar la actividad con las propiedades proporcionadas
    const editedActivity = await Activity.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true }
    );

    // Verificar si la actividad fue encontrada y actualizada
    if (!editedActivity) {
      return { error: "No se encontró la actividad o no se pudo actualizar" };
    }
    return editedActivity;
  } catch (err) {
    console.log(err);
    throw new Error("Mensaje de error específico");
  }
}

export async function deleteActivityService({ _id }: any) {
  try {
    // Verificar si la actividad tiene usuarios relacionados
    const activityWithUsers = await Activity.findOne({
      _id,
      users: { $exists: true, $ne: [] }, // Verificar si el campo 'users' existe y no está vacío
    });

    if (activityWithUsers) {
      return {
        error: "No se puede eliminar la actividad con usuarios relacionados",
      };
    }

    // Si no hay usuarios relacionados, proceder con la eliminación
    const deletedActivity = await Activity.findOneAndDelete({ _id });

    if (!deletedActivity) {
      return { error: "No se encontró la actividad" };
    }

    return deletedActivity;
  } catch (err) {
    console.log(err);
    throw new Error("Mensaje de error");
  }
}
